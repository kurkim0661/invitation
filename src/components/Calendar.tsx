interface CalendarProps {
  weddingDateDisplay: string;
  venueName: string;
}

export default function Calendar({ weddingDateDisplay, venueName }: CalendarProps) {
  return (
    <section className="py-10" style={{ backgroundColor: '#F0EDED' }}>
      <div className="text-center mx-auto" style={{ marginBottom: '20px' }}>
        {/* 3: 2026년 7월 11일 토요일 오후 5시 -> 18pt */}
        <p className="text-[18px] leading-snug text-text">
          {weddingDateDisplay}
        </p>
        {/* 4: 노블발렌티 삼성 -> 16pt */}
        <p className="text-[16px] text-text-light mt-1">
          {venueName}
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src={`${import.meta.env.BASE_URL}images/calendar.png`}
          alt="2026년 7월 달력"
          className="object-contain w-full"
        />
      </div>
    </section>
  );
}
