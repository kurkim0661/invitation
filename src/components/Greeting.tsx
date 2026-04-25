interface GreetingProps {
  greeting: string;
}

export default function Greeting({ greeting }: GreetingProps) {
  return (
    <section className="px-8 pb-10 text-center bg-white">
      {/* 2: 언제나...감사하겠습니다 -> 14pt */}
      <p
        className="text-[14px] leading-[2.2] text-text tracking-wider whitespace-pre-line mx-auto"
        style={{ maxWidth: '293px' }}
      >
        {greeting}
      </p>
    </section>
  );
}
