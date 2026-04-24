interface RsvpProps {
  rsvpFormUrl: string;
}

export default function Rsvp({ rsvpFormUrl }: RsvpProps) {
  return (
    <section
      className="px-8 py-12 text-center bg-cover bg-center"
      style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/rsvp-bg.png)` }}
    >
      <h3 className="text-[15px] font-bold text-text-light mb-4 tracking-wider">
        참석 의사 전달
      </h3>
      <p className="text-[13px] leading-[2] text-text-light">
        축하의 마음으로 참석해주실
        <br />
        모든 분을 정중히 모시고자 하오니,
        <br />
        참석 여부를 알려주시면 감사하겠습니다.
      </p>
      <a
        href={rsvpFormUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-[14px] tracking-wider rounded-[8px] border transition-colors"
        style={{ padding: '12px 32px', backgroundColor: 'transparent', borderColor: 'white', color: '#666', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
      >
        참석 여부 전달하기
      </a>
    </section>
  );
}
