import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryImage } from '../data/types';

interface GalleryProps {
  images: GalleryImage[];
}

function GalleryModal({ images, startIndex, onClose }: {
  images: GalleryImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [transition, setTransition] = useState<'none' | 'slide-left' | 'slide-right'>('none');
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isMultiTouch = useRef(false);
  const isSwiping = useRef(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const goTo = useCallback((index: number, dir: 'slide-left' | 'slide-right') => {
    if (index < 0 || index >= images.length) return;
    setTransition(dir);
    setTimeout(() => {
      setCurrentIndex(index);
      setTransition('none');
    }, 200);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 1) {
      isMultiTouch.current = true;
      return;
    }
    isMultiTouch.current = false;
    isSwiping.current = false;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 1) {
      isMultiTouch.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isMultiTouch.current) {
      isMultiTouch.current = false;
      return;
    }
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    // Only swipe if horizontal movement is dominant and > 50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0 && currentIndex < images.length - 1) {
        goTo(currentIndex + 1, 'slide-left');
      } else if (diffX < 0 && currentIndex > 0) {
        goTo(currentIndex - 1, 'slide-right');
      }
    }
  };

  const animStyle = transition === 'slide-left'
    ? { opacity: 0, transform: 'translateX(-30px)', transition: 'all 0.2s ease' }
    : transition === 'slide-right'
    ? { opacity: 0, transform: 'translateX(30px)', transition: 'all 0.2s ease' }
    : { opacity: 1, transform: 'translateX(0)', transition: 'all 0.2s ease' };

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-white text-[14px]">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          className="text-white text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      {/* Single image */}
      <div
        className="flex-1 flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClose}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="max-w-full max-h-full object-contain"
          style={animStyle}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
}

const INITIAL_COUNT = 6;

function usePreloadImages(images: GalleryImage[]) {
  useEffect(() => {
    images.forEach((img) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.src;
      document.head.appendChild(link);
    });
  }, [images]);
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);

  const sortedImages = [...images].sort((a, b) => a.order - b.order);
  const visibleImages = expanded ? sortedImages : sortedImages.slice(0, INITIAL_COUNT);

  // 그리드에 썸네일을 보여주면서 원본을 백그라운드로 프리로드
  usePreloadImages(sortedImages);

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
              loading="lazy"
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
