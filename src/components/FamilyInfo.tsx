import type { Family } from '../data/types';

interface FamilyInfoProps {
  families: Family[];
  onContactClick: () => void;
}

function OrnamentalDivider({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 50"
      className="w-[65%] mx-auto"
      style={flipped ? { transform: 'scaleY(-1)' } : undefined}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        {/* Left flowing curve */}
        <path d="M40,25 Q60,8 100,18 Q120,22 140,15 Q160,8 180,18 Q190,22 195,25" />
        <path d="M40,25 Q60,42 100,32 Q120,28 140,35 Q160,42 180,32 Q190,28 195,25" />
        {/* Right flowing curve (mirrored) */}
        <path d="M360,25 Q340,8 300,18 Q280,22 260,15 Q240,8 220,18 Q210,22 205,25" />
        <path d="M360,25 Q340,42 300,32 Q280,28 260,35 Q240,42 220,32 Q210,28 205,25" />
        {/* Center diamond/heart ornament */}
        <path d="M195,25 Q200,15 205,25 Q200,35 195,25" fill="currentColor" />
        <path d="M192,25 Q200,10 208,25 Q200,40 192,25" />
        {/* Small decorative dots at center top and bottom */}
        <circle cx="200" cy="12" r="1.5" fill="currentColor" />
        <circle cx="200" cy="38" r="1.5" fill="currentColor" />
        {/* End curls - left */}
        <path d="M40,25 Q30,20 35,15 Q42,10 48,18" />
        <path d="M40,25 Q30,30 35,35 Q42,40 48,32" />
        {/* End curls - right */}
        <path d="M360,25 Q370,20 365,15 Q358,10 352,18" />
        <path d="M360,25 Q370,30 365,35 Q358,40 352,32" />
        {/* Small end dots */}
        <circle cx="33" cy="13" r="1.2" fill="currentColor" />
        <circle cx="33" cy="37" r="1.2" fill="currentColor" />
        <circle cx="367" cy="13" r="1.2" fill="currentColor" />
        <circle cx="367" cy="37" r="1.2" fill="currentColor" />
      </g>
    </svg>
  );
}

export default function FamilyInfo({ families, onContactClick }: FamilyInfoProps) {
  return (
    <section className="px-8 py-14 text-center bg-[#F5F0E8]">
      {/* Top ornamental divider */}
      <div className="text-navy mb-8">
        <OrnamentalDivider />
      </div>

      {/* Family information */}
      <div className="space-y-4 mb-8">
        {families.map((family) => (
          <div key={family.side} className="font-serif text-[16px] text-navy leading-relaxed">
            <span className="tracking-wider font-normal">
              {family.fatherName}
            </span>
            <span className="mx-1 font-normal">·</span>
            <span className="tracking-wider font-normal">
              {family.motherName}
            </span>
            <span className="text-[14px] text-navy-light font-normal">
              {' '}{family.relation}{' '}
            </span>
            <span className="font-bold text-[17px]">
              {family.childName}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom ornamental divider */}
      <div className="text-navy mb-10">
        <OrnamentalDivider flipped />
      </div>

      {/* Contact button - rounded rectangle */}
      <button
        onClick={onContactClick}
        className="px-12 py-3 border border-navy/30 rounded-[10px] text-[14px] font-sans text-navy hover:bg-navy/5 transition-colors"
      >
        연락하기
      </button>
    </section>
  );
}
