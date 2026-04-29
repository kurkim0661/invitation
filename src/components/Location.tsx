import type { Venue } from '../data/types';
import { useClipboard } from '../hooks/useClipboard';

interface LocationProps {
  venue: Venue;
  kakaoMapUrl: string;
}

export default function Location({ venue, kakaoMapUrl }: LocationProps) {
  const { copy, copied } = useClipboard();

  // Kakao static map with marker
  // MX/MY: WCONGNAMUL coordinates for 노블발렌티 삼성
  // CX/CY + MARKERS: add a red marker at the venue location
  const staticMapUrl =
    'https://staticmap.kakao.com/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=514328&MY=1115519&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo&MARKERS=type,default2_red,514328,1115519';
  const mapLinkUrl =
    'https://map.kakao.com/?urlX=514328.99999999744&urlY=1115520&urlLevel=3&itemId=17157328&q=%EB%85%B8%EB%B8%94%EB%B0%9C%EB%A0%8C%ED%8B%B0%20%EC%82%BC%EC%84%B1%EC%A0%90&srcid=17157328&map_type=TYPE_MAP';

  return (
    <section className="px-8 py-12 bg-white">
      {/* 14: LOCATION -> 17pt */}
      <h2 className="text-center font-script text-text-light mb-8 italic" style={{ fontSize: '17px', letterSpacing: '0.07em' }}>
        LOCATION
      </h2>
      {/* 15: 노블발렌티 삼성 -> 16pt */}
      <p className="text-center text-[16px] font-medium text-text mb-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        {venue.name}
      </p>
      <div className="flex items-center justify-center mb-6">
        <div
          className="flex items-center gap-1.5 px-5 py-3 rounded-[8px]"
          style={{ backgroundColor: '#F0F0F0' }}
        >
          <p className="text-[14px]" style={{ color: '#3353A3', fontFamily: 'Pretendard, sans-serif' }}>
            {venue.address}
          </p>
          <button
            onClick={() => copy(venue.address)}
            className="flex items-center transition-colors"
            style={{ color: '#3353A3' }}
          >
            <img src={`${import.meta.env.BASE_URL}images/copy-icon.svg`} alt="복사" width="16" height="16" />
          </button>
        </div>
      </div>

      {copied && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-black/70 text-white text-[13px] px-4 py-2 rounded-full" style={{ fontFamily: 'Pretendard, sans-serif' }}>
          주소가 복사되었습니다
        </div>
      )}

      {/* Kakao Static Map with marker overlay */}
      <a href={mapLinkUrl} target="_blank" rel="noopener noreferrer" className="block relative">
        <img
          src={staticMapUrl}
          alt="노블발렌티 삼성 지도"
          className="w-full rounded-lg"
          style={{ border: '1px solid #eee' }}
        />
        {/* Marker pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <svg width="28" height="40" viewBox="0 0 28 40" fill="none">
            <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z" fill="#E74C3C"/>
            <circle cx="14" cy="14" r="6" fill="white"/>
          </svg>
        </div>
      </a>

      {/* Directions link */}
      <div className="text-center mt-6">
        <a
          href={kakaoMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[16px] text-text-light tracking-wider rounded-[10px] border border-white transition-colors"
          style={{ width: '200px', padding: '14px 0', backgroundColor: 'transparent', boxShadow: '0 3px 10px rgba(0,0,0,0.12)', fontFamily: 'Pretendard, sans-serif' }}
        >
          카카오맵 길찾기
        </a>
      </div>
    </section>
  );
}
