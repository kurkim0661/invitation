import { useState } from 'react';
import type { GalleryImage } from '../data/types';

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <section className="px-8 py-12 bg-white">
      {/* GALLERY: Nelphim Italic, 72 x 20 */}
      <h2
        className="text-center font-script text-text-light mb-8 italic"
        style={{ width: '72px', height: '20px', lineHeight: '20px', fontSize: '18px', margin: '0 auto 32px auto' }}
      >
        GALLERY
      </h2>
      <div className="grid grid-cols-3 gap-1">
        {sortedImages.map((image, idx) => (
          <div
            key={idx}
            className="aspect-square overflow-hidden cursor-pointer"
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
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl z-10"
            onClick={() => setSelectedIndex(null)}
          >
            &times;
          </button>

          {selectedIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
            >
              &#8249;
            </button>
          )}

          <img
            src={sortedImages[selectedIndex].src}
            alt={sortedImages[selectedIndex].alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {selectedIndex < sortedImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl z-10 p-2"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
            >
              &#8250;
            </button>
          )}

          <div className="absolute bottom-4 text-white text-sm">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
