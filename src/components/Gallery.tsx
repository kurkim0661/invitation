import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryImage } from '../data/types';

interface GalleryProps {
  images: GalleryImage[];
}

function pinchDist(t1: React.Touch, t2: React.Touch) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function pinchMid(t1: React.Touch, t2: React.Touch) {
  return { x: (t1.clientX + t2.clientX) / 2, y: (t1.clientY + t2.clientY) / 2 };
}

function GalleryModal({ images, startIndex, onClose }: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [imgLoaded, setImgLoaded] = useState(true);
  // 실시간 드래그 오프셋 (px)
  const [dragX, setDragX] = useState(0);
  // 피킹할 이미지 인덱스 (-1 = prev, 1 = next, 0 = none)
  const [peekDir, setPeekDir] = useState(0);
  // 완료 애니메이션
  const [completing, setCompleting] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliding = useRef(false);

  // zoom & pan
  const scale = useRef(1);
  const pos = useRef({ x: 0, y: 0 });

  const g = useRef({
    type: 'none' as 'none' | 'drag' | 'pan' | 'pinch',
    x0: 0, y0: 0,
    pos0: { x: 0, y: 0 },
    scale0: 1, dist0: 0, mid0: { x: 0, y: 0 },
    lastTap: 0, tapX: 0, tapY: 0,
    locked: false,
    lastMoveX: 0, lastMoveT: 0, // 속도 추적
  });

  function setTf(transition = '') {
    const img = imgRef.current;
    if (!img) return;
    img.style.transition = transition;
    img.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) scale(${scale.current})`;
  }

  function resetZoom(animate = true) {
    scale.current = 1;
    pos.current = { x: 0, y: 0 };
    setTf(animate ? 'transform 0.2s ease' : '');
  }

  function ccenter() {
    const r = containerRef.current?.getBoundingClientRect();
    return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : { x: 0, y: 0 };
  }

  function containerWidth() {
    return containerRef.current?.offsetWidth || 400;
  }

  // 슬라이드 완료
  function finishSlide(targetIndex: number) {
    sliding.current = true;
    setCompleting(true);

    // 드래그 방향으로 100% + 갭만큼 이동 애니메이션
    const w = containerWidth() + 20;
    setDragX(targetIndex > currentIndex ? -w : w);

    setTimeout(() => {
      const img = new Image();
      img.src = images[targetIndex].src;
      setImgLoaded(img.complete);
      setCurrentIndex(targetIndex);
      setDragX(0);
      setPeekDir(0);
      setCompleting(false);
      sliding.current = false;
    }, 340);
  }

  // 스냅백
  function snapBack() {
    setCompleting(true);
    setDragX(0);
    setTimeout(() => {
      setPeekDir(0);
      setCompleting(false);
    }, 340);
  }

  useEffect(() => {
    const y = window.scrollY;
    Object.assign(document.body.style, { position: 'fixed', top: `-${y}px`, left: '0', right: '0' });
    return () => {
      Object.assign(document.body.style, { position: '', top: '', left: '', right: '' });
      window.scrollTo(0, y);
    };
  }, []);

  // 키보드
  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= images.length || sliding.current) return;
    sliding.current = true;
    scale.current = 1;
    pos.current = { x: 0, y: 0 };
    if (imgRef.current) { imgRef.current.style.transition = ''; imgRef.current.style.transform = ''; }

    const dir = index > currentIndex ? 1 : -1;
    setPeekDir(dir);
    setDragX(0);

    requestAnimationFrame(() => {
      finishSlide(index);
    });
  }, [currentIndex, images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) goTo(currentIndex + 1);
      else if (e.key === 'ArrowLeft' && currentIndex > 0) goTo(currentIndex - 1);
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIndex, goTo, images.length, onClose]);

  // --- 핀치 ---
  function initPinch(e: React.TouchEvent) {
    const gs = g.current;
    gs.type = 'pinch';
    gs.dist0 = pinchDist(e.touches[0], e.touches[1]);
    gs.scale0 = scale.current;
    gs.pos0 = { ...pos.current };
    gs.mid0 = pinchMid(e.touches[0], e.touches[1]);
  }

  // --- 터치 이벤트 ---
  const onStart = (e: React.TouchEvent) => {
    if (sliding.current) return;
    if (e.touches.length >= 2) { initPinch(e); return; }
    const gs = g.current;
    gs.x0 = e.touches[0].clientX;
    gs.y0 = e.touches[0].clientY;
    gs.pos0 = { ...pos.current };
    gs.locked = false;
    gs.type = scale.current > 1 ? 'pan' : 'drag';
  };

  const onMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (sliding.current) return;
    const gs = g.current;

    // 핀치
    if (e.touches.length >= 2) {
      if (gs.type !== 'pinch') { initPinch(e); return; }
      const d = pinchDist(e.touches[0], e.touches[1]);
      const m = pinchMid(e.touches[0], e.touches[1]);
      const ns = Math.min(4, Math.max(1, gs.scale0 * (d / gs.dist0)));
      const c = ccenter();
      pos.current = {
        x: m.x - c.x - ((gs.mid0.x - c.x - gs.pos0.x) / gs.scale0) * ns,
        y: m.y - c.y - ((gs.mid0.y - c.y - gs.pos0.y) / gs.scale0) * ns,
      };
      scale.current = ns;
      setTf();
      return;
    }

    // 팬 (확대 상태)
    if (gs.type === 'pan') {
      pos.current = {
        x: gs.pos0.x + (e.touches[0].clientX - gs.x0),
        y: gs.pos0.y + (e.touches[0].clientY - gs.y0),
      };
      setTf();
      return;
    }

    // 드래그 (1x) — 실시간 추적
    if (gs.type === 'drag') {
      const dx = e.touches[0].clientX - gs.x0;
      const dy = e.touches[0].clientY - gs.y0;

      // 방향 잠금: 수직이면 무시
      if (!gs.locked) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          gs.locked = true;
          if (Math.abs(dy) > Math.abs(dx)) { gs.type = 'none'; return; }
        } else return;
      }

      // 경계: 첫/마지막 사진에서 저항감
      let clampedDx = dx;
      if ((dx > 0 && currentIndex === 0) || (dx < 0 && currentIndex === images.length - 1)) {
        clampedDx = dx * 0.3;
      }

      // 속도 추적
      gs.lastMoveX = e.touches[0].clientX;
      gs.lastMoveT = Date.now();

      // 피킹 방향 결정
      const dir = clampedDx < 0 ? 1 : clampedDx > 0 ? -1 : 0;
      if (dir !== 0 && peekDir !== dir) setPeekDir(dir);

      setDragX(clampedDx);
    }
  };

  const onEnd = (e: React.TouchEvent) => {
    if (sliding.current) return;
    const gs = g.current;

    if (gs.type === 'pinch') {
      if (scale.current <= 1.05) { resetZoom(); gs.type = 'none'; return; }
      if (e.touches.length >= 1) {
        gs.type = 'pan';
        gs.x0 = e.touches[0].clientX;
        gs.y0 = e.touches[0].clientY;
        gs.pos0 = { ...pos.current };
      } else { gs.type = 'none'; }
      return;
    }

    if (gs.type === 'pan') {
      if (e.touches.length === 0) gs.type = 'none';
      return;
    }

    if (gs.type === 'drag' && e.touches.length === 0) {
      const dx = dragX;
      const dt = Date.now() - gs.lastMoveT;
      const velocity = dt > 0 ? Math.abs(e.changedTouches[0].clientX - gs.lastMoveX) / dt : 0;
      // 빠르게 플릭하면 작은 거리도 OK, 느리면 15% 이상
      const isFlick = velocity > 0.15 && Math.abs(dx) > 8;
      const isDrag = Math.abs(dx) > containerWidth() * 0.12;

      // 넘김 판정
      if (isFlick || isDrag) {
        if (dx < 0 && currentIndex < images.length - 1) {
          finishSlide(currentIndex + 1);
          gs.type = 'none';
          return;
        }
        if (dx > 0 && currentIndex > 0) {
          finishSlide(currentIndex - 1);
          gs.type = 'none';
          return;
        }
      }
      // 스냅백
      snapBack();
      gs.type = 'none';

      // 더블탭 / 탭 체크
      const tx = e.changedTouches[0].clientX;
      const ty = e.changedTouches[0].clientY;
      const ddx = gs.x0 - tx;
      const ddy = gs.y0 - ty;
      if (Math.abs(ddx) < 10 && Math.abs(ddy) < 10) {
        const now = Date.now();
        if (now - gs.lastTap < 300) {
          gs.lastTap = 0;
          if (scale.current > 1) {
            resetZoom();
          } else {
            const c = ccenter();
            const fx = gs.tapX - c.x;
            const fy = gs.tapY - c.y;
            const ns = 2.5;
            pos.current = { x: fx * (1 - ns), y: fy * (1 - ns) };
            scale.current = ns;
            setTf('transform 0.25s ease');
          }
          return;
        }
        gs.lastTap = now;
        gs.tapX = tx;
        gs.tapY = ty;
      }
      return;
    }

    gs.type = 'none';
  };

  // --- 마우스 (데스크탑) ---
  const mouse = useRef({ down: false, x0: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale.current > 1 || sliding.current) return;
    mouse.current = { down: true, x0: e.clientX };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!mouse.current.down) return;
    e.preventDefault();
    const dx = e.clientX - mouse.current.x0;

    let clampedDx = dx;
    if ((dx > 0 && currentIndex === 0) || (dx < 0 && currentIndex === images.length - 1)) {
      clampedDx = dx * 0.3;
    }

    const dir = clampedDx < 0 ? 1 : clampedDx > 0 ? -1 : 0;
    if (dir !== 0 && peekDir !== dir) setPeekDir(dir);
    setDragX(clampedDx);
  };
  const onMouseUp = () => {
    if (!mouse.current.down) return;
    mouse.current.down = false;
    const dx = dragX;

    if (Math.abs(dx) > containerWidth() * 0.15) {
      if (dx < 0 && currentIndex < images.length - 1) { finishSlide(currentIndex + 1); return; }
      if (dx > 0 && currentIndex > 0) { finishSlide(currentIndex - 1); return; }
    }
    snapBack();
  };

  // peek할 이미지 인덱스
  const peekIndex = peekDir === 1 ? currentIndex + 1 : peekDir === -1 ? currentIndex - 1 : -1;
  const hasPeek = peekIndex >= 0 && peekIndex < images.length;
  const w = containerWidth();
  const IMG_GAP = 20;
  const transition = completing ? 'transform 0.32s cubic-bezier(0.32, 0.72, 0, 1)' : 'none';

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black flex flex-col" style={{ touchAction: 'none' }}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-white text-[14px]">{currentIndex + 1} / {images.length}</span>
        <button onClick={onClose} className="text-white text-2xl leading-none">&times;</button>
      </div>
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden select-none relative"
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={() => { if (mouse.current.down) { mouse.current.down = false; snapBack(); } }}
        onClick={() => { if (scale.current <= 1 && !sliding.current && dragX === 0) onClose(); }}
      >
        {/* 현재 이미지 */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `translateX(${dragX}px)`, transition }}
        >
          {!imgLoaded && !peekDir && (
            <div className="absolute">
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
          <img
            ref={imgRef}
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="max-w-full max-h-full object-contain"
            style={{ opacity: imgLoaded || peekDir ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />
        </div>
        {/* 피킹 이미지 (드래그 방향으로 대기) */}
        {hasPeek && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: `translateX(${dragX + (peekDir === 1 ? w + IMG_GAP : -(w + IMG_GAP))}px)`,
              transition,
            }}
          >
            <img
              src={images[peekIndex].src}
              alt={images[peekIndex].alt}
              className="max-w-full max-h-full object-contain"
              draggable={false}
            />
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

const INITIAL_COUNT = 6;

// 페이지 로드 완료 후 썸네일 전체 → 원본 3개씩 순차 프리로드
function useBackgroundPreload(images: GalleryImage[]) {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;

    function loadBatch(srcs: string[], i: number, batchSize: number) {
      if (i >= srcs.length) return;
      const batch = srcs.slice(i, i + batchSize);
      let done = 0;
      batch.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          done++;
          if (done >= batch.length) loadBatch(srcs, i + batchSize, batchSize);
        };
        img.src = src;
      });
    }

    function start() {
      const thumbSrcs = images.slice(INITIAL_COUNT).map((img) => img.thumb);
      let thumbDone = 0;
      if (thumbSrcs.length === 0) {
        loadBatch(images.map((img) => img.src), 0, 3);
        return;
      }
      thumbSrcs.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          thumbDone++;
          if (thumbDone >= thumbSrcs.length) {
            loadBatch(images.map((img) => img.src), 0, 3);
          }
        };
        img.src = src;
      });
    }

    if (document.readyState === 'complete') {
      setTimeout(start, 500);
    } else {
      window.addEventListener('load', () => setTimeout(start, 500), { once: true });
    }
  }, [images]);
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const sortedImages = [...images].sort((a, b) => a.order - b.order);
  const visibleImages = expanded ? sortedImages : sortedImages.slice(0, INITIAL_COUNT);

  useBackgroundPreload(sortedImages);

  return (
    <section className="px-8 py-12" style={{ backgroundColor: '#EEF1F7' }}>
      <h2
        className="text-center font-script text-text-light mb-8 italic"
        style={{ fontSize: '17px', letterSpacing: '0.07em', margin: '0 auto 32px auto' }}
      >
        GALLERY
      </h2>
      <div className="grid grid-cols-3 gap-1">
        {visibleImages.map((image, idx) => (
          <div
            key={idx}
            className="aspect-[3/4] overflow-hidden cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={image.thumb}
              alt={image.alt}
              loading={idx < INITIAL_COUNT ? 'eager' : 'lazy'}
              decoding={idx < INITIAL_COUNT ? 'sync' : 'async'}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      {!expanded && sortedImages.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setExpanded(true)}
            className="text-[12px] text-gray-400 tracking-wider hover:text-gray-600 transition-colors"
          >
            더보기
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" className="ml-1 inline-block">
              <path d="M1 1L6 5.5L11 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {selectedIndex !== null && (
        <GalleryModal
          images={sortedImages}
          startIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
