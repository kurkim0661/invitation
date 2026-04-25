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
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);
  const touchStartX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleResize = () => setContainerWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      setCurrentIndex(index);
    }
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    touchStartX.current = e.touches[0].clientX;
    setOffsetX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    // Prevent overscroll at edges
    if ((currentIndex === 0 && diff > 0) || (currentIndex === images.length - 1 && diff < 0)) {
      setOffsetX(diff * 0.3);
    } else {
      setOffsetX(diff);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 80;
    if (offsetX < -threshold && currentIndex < images.length - 1) {
      goTo(currentIndex + 1);
    } else if (offsetX > threshold && currentIndex > 0) {
      goTo(currentIndex - 1);
    }
    setOffsetX(0);
  };


  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
    >
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

      {/* Image strip */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onClose}
      >
        <div
          className="flex h-full"
          style={{
            transform: `translateX(${-currentIndex * containerWidth + offsetX}px)`,
            transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            width: `${images.length * containerWidth}px`,
          }}
        >
          {images.map((image, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center"
              style={{ width: `${containerWidth}px`, flexShrink: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows (desktop) */}
      {currentIndex > 0 && (
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 text-4xl z-10"
          onClick={(e) => { e.stopPropagation(); goTo(currentIndex - 1); }}
        >
          &#8249;
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 text-4xl z-10"
          onClick={(e) => { e.stopPropagation(); goTo(currentIndex + 1); }}
        >
          &#8250;
        </button>
      )}
    </div>,
    document.body
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <section className="px-8 py-12" style={{ backgroundColor: '#EEF1F7' }}>
      <h2
        className="text-center font-script text-text-light mb-8 italic"
        style={{ fontSize: '17px', letterSpacing: '0.07em', margin: '0 auto 32px auto' }}
      >
        GALLERY
      </h2>
      <div className="grid grid-cols-3 gap-1">
        {sortedImages.map((image, idx) => (
          <div
            key={idx}
            className="aspect-[3/4] overflow-hidden cursor-pointer"
            onClick={() => setSelectedIndex(idx)}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

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
