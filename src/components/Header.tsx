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
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent" />
      </div>
      {/* Names: 91 x 22 on 393px, font: 210 SoomyungjoOTF (inherited from body) */}
      <div className="pt-8 text-center bg-white" style={{ paddingBottom: '30px' }}>
        <p
          className="text-[20px] tracking-widest text-text mx-auto"
        >
          {groomName}, {brideName}
        </p>
      </div>
    </section>
  );
}
