interface GreetingProps {
  greeting: string;
  dateDisplay: string;
  venueName: string;
}

export default function Greeting({ greeting, dateDisplay, venueName }: GreetingProps) {
  return (
    <section className="px-8 py-10 text-center">
      <p className="font-serif text-[15px] leading-7 text-text-light whitespace-pre-line">
        {greeting}
      </p>
      <div className="mt-8 space-y-1">
        <p className="font-sans text-[15px] font-medium text-text">
          {dateDisplay}
        </p>
        <p className="font-sans text-[14px] text-text-light">
          {venueName}
        </p>
      </div>
    </section>
  );
}
