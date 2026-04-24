import type { Family } from '../data/types';

interface FamilyInfoProps {
  families: Family[];
  onContactClick: () => void;
}

function GuideDivider() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/guide-divider.png`}
      alt=""
      aria-hidden="true"
      style={{ width: '217px', height: '32px' }}
      className="mx-auto"
    />
  );
}

export default function FamilyInfo({ families, onContactClick }: FamilyInfoProps) {
  return (
    <section className="px-8 py-14 text-center" style={{ backgroundColor: '#E9E5DE' }}>
      {/* Top guide divider: 217 x 32 */}
      <div className="mb-8">
        <GuideDivider />
      </div>

      {/* Family information - font: 210 SoomyungjoOTF (inherited from body) */}
      <div className="space-y-4 mb-8">
        {families.map((family) => (
          <div key={family.side} className="text-[16px] text-navy leading-relaxed">
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

      {/* Bottom guide divider: 217 x 32, flipped */}
      <div className="mb-10" style={{ transform: 'scaleY(-1)' }}>
        <GuideDivider />
      </div>

      {/* Contact button */}
      <button
        onClick={onContactClick}
        className="text-[15px] text-text-light tracking-wider rounded-[10px] border border-white transition-colors"
        style={{ width: '200px', padding: '14px 0', backgroundColor: 'transparent', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' }}
      >
        연락하기
      </button>
    </section>
  );
}
