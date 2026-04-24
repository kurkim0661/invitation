interface CalendarProps {
  weddingDateDisplay: string;
  venueName: string;
}

export default function Calendar({ weddingDateDisplay, venueName }: CalendarProps) {
  return (
    <section className="py-10" style={{ backgroundColor: '#F0EDED' }}>
      {/* Date heading + venue: 292.29 x 49, font: 210 SoomyungjoOTF (inherited) */}
      <div className="text-center mb-8 mx-auto" style={{ width: '292.29px' }}>
        <p className="text-[15px] leading-snug text-text">
          {weddingDateDisplay}
        </p>
        <p className="text-[13px] text-text-light mt-1">
          {venueName}
        </p>
      </div>

      {/* Static calendar image: 350.13 x 422.71 */}
      <div className="flex justify-center">
        <img
          src={`${import.meta.env.BASE_URL}images/calendar.png`}
          alt="2026년 7월 달력"
          style={{ width: '350.13px', height: '422.71px' }}
          className="object-contain"
        />
      </div>
    </section>
  );
}
