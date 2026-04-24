interface HeaderProps {
  groomName: string;
  brideName: string;
}

export default function Header({ groomName, brideName }: HeaderProps) {
  return (
    <section className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <img
          src={`${import.meta.env.BASE_URL}images/main.jpg`}
          alt={`${groomName} & ${brideName} 웨딩 사진`}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
        <img
          src={`${import.meta.env.BASE_URL}images/wedding-day.png`}
          alt="Wedding Day"
          className="absolute left-1/2 -translate-x-1/2 opacity-70"
          style={{ width: '322px', height: '140px', top: '3px' }}
        />
      </div>
      {/* Names: 91 x 22 on 393px, font: 210 SoomyungjoOTF (inherited from body) */}
      <div className="pt-8 text-center" style={{ paddingBottom: '30px' }}>
        <p
          className="text-[18px] tracking-widest text-text mx-auto"
          style={{ width: '91px', height: '22px', lineHeight: '22px' }}
        >
          {groomName}, {brideName}
        </p>
      </div>
    </section>
  );
}
