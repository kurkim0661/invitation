import { useEffect, useRef } from 'react';
import type { Venue } from '../data/types';
import { useClipboard } from '../hooks/useClipboard';

interface LocationProps {
  venue: Venue;
}

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: { center: unknown; level: number }) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: { map: unknown; position: unknown }) => unknown;
      };
    };
  }
}

export default function Location({ venue }: LocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { copy, copied } = useClipboard();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_MAP_API_KEY;
    if (!apiKey || !mapRef.current) return;

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;
        const position = new window.kakao.maps.LatLng(venue.lat, venue.lng);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: position,
          level: 3,
        });
        new window.kakao.maps.Marker({ map, position });
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [venue.lat, venue.lng]);

  return (
    <section className="px-8 py-12">
      <h2 className="text-center font-serif text-[14px] tracking-[0.3em] text-text-light mb-8">
        LOCATION
      </h2>
      <p className="text-center font-sans text-[16px] font-medium text-text mb-2">
        {venue.name}
      </p>
      <div className="flex items-center justify-center gap-2 mb-6">
        <p className="font-sans text-[13px] text-text-light">
          {venue.address}
        </p>
        <button
          onClick={() => copy(venue.address)}
          className="px-2 py-1 text-[11px] border border-border rounded text-text-light hover:bg-primary/5 transition-colors"
        >
          {copied ? '복사됨' : 'Copy'}
        </button>
      </div>
      <div
        ref={mapRef}
        className="w-full h-[250px] rounded-lg bg-gray-100"
      />
    </section>
  );
}
