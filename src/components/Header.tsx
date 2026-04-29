interface HeaderProps {
  groomName: string;
  brideName: string;
  greeting: string;
}

export default function Header({ groomName, brideName, greeting }: HeaderProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/main.jpg`}
          alt={`${groomName} & ${brideName} 웨딩 사진`}
          className="w-full h-auto"
          fetchPriority="high"
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="pt-8 text-center bg-white" style={{ paddingBottom: '30px' }}>
        <p
          className="text-[20px] tracking-widest text-text mx-auto"
        >
          {groomName}, {brideName}
        </p>
      </div>
      <div className="px-8 pb-10 text-center bg-white">
        <p
          className="text-[14px] leading-[2.2] text-text tracking-wider whitespace-pre-line mx-auto"
          style={{ maxWidth: '320px' }}
        >
          {greeting}
        </p>
      </div>
    </section>
  );
}
