interface RsvpProps {
  rsvpFormUrl: string;
}

export default function Rsvp({ rsvpFormUrl }: RsvpProps) {
  return (
    <section
      className="px-8 py-12 text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/rsvp-bg.png)` }}
    >
      {/* 10: 참석 의사 전달 -> 13pt */}
      <h3 className="text-[18px] font-bold text-text mb-4">
        참석 의사 전달
      </h3>
      {/* 11: 축하의...감사하겠습니다 -> 14pt */}
      <p className="text-[14px] leading-[2] text-text-light">
        축하의 마음으로 참석해주실
        <br />
        모든 분을 정중히 모시고자 하오니,
        <br />
        참석 여부를 알려주시면 감사하겠습니다.
      </p>
      {/* 12: 참석 여부 전달하기 -> 16pt */}
      <a
        href={rsvpFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-[16px] text-text-light tracking-wider rounded-[10px] border border-white transition-colors"
        style={{ width: '200px', padding: '14px 0', backgroundColor: 'transparent', boxShadow: '0 3px 10px rgba(0,0,0,0.12)' }}
      >
        참석 여부 전달하기
      </a>
    </section>
  );
}
