interface HeaderProps {
  groomName: string;
  brideName: string;
}

export default function Header({ groomName, brideName }: HeaderProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <img
          src="/images/main.jpg"
          alt={`${groomName} & ${brideName} 웨딩 사진`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        <h1 className="absolute top-8 left-0 right-0 text-center text-white font-script text-4xl tracking-wide">
          Wedding Day
        </h1>
      </div>
      <div className="py-8 text-center">
        <p className="font-serif text-2xl tracking-widest text-text">
          {groomName}, {brideName}
        </p>
      </div>
    </section>
  );
}
