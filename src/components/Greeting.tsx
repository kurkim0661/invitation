interface GreetingProps {
  greeting: string;
  dateDisplay: string;
  venueName: string;
}

export default function Greeting({ greeting, dateDisplay, venueName }: GreetingProps) {
  return (
    <section className="px-8 pb-10 text-center">
      {/* Greeting text: 293 x 84 on 393px, font: 210 SoomyungjoOTF (inherited from body) */}
      <p
        className="text-[14px] leading-[2.2] text-text tracking-wider whitespace-pre-line mx-auto"
        style={{ maxWidth: '293px' }}
      >
        {greeting}
      </p>
      {/* Date + venue: 292.29 x 49 on 393px */}
      <div className="mt-8 space-y-1 mx-auto" style={{ maxWidth: '292.29px' }}>
        <p className="text-[15px] font-medium text-text">
          {dateDisplay}
        </p>
        <p className="text-[14px] text-text-light">
          {venueName}
        </p>
      </div>
    </section>
  );
}
