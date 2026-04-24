interface RsvpProps {
  rsvpFormUrl: string;
}

export default function Rsvp({ rsvpFormUrl }: RsvpProps) {
  return (
    <section className="px-8 py-12 text-center bg-white/50">
      <p className="font-serif text-[14px] leading-7 text-text-light">
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
        className="mt-6 inline-block px-8 py-3 bg-primary text-white rounded-full text-[13px] font-sans hover:bg-primary-light transition-colors"
      >
        참석 여부 전달하기
      </a>
    </section>
  );
}
