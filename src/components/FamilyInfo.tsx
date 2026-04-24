import type { Family } from '../data/types';

interface FamilyInfoProps {
  families: Family[];
  onContactClick: () => void;
}

export default function FamilyInfo({ families, onContactClick }: FamilyInfoProps) {
  return (
    <section className="px-8 py-10 text-center">
      <div className="space-y-3">
        {families.map((family) => (
          <div key={family.side} className="font-sans text-[14px] text-text-light">
            <span className="tracking-wider">
              {family.fatherName}
              <span className="text-[13px]">ㆍ</span>
              {family.motherName}
            </span>
            <span className="text-text-light text-[13px]">{family.relation}</span>
            {' '}
            <span className="text-text font-medium">{family.childName}</span>
          </div>
        ))}
      </div>
      <button
        onClick={onContactClick}
        className="mt-6 px-8 py-3 border border-border rounded-full text-[13px] font-sans text-text-light hover:bg-primary/5 transition-colors"
      >
        연락하기
      </button>
    </section>
  );
}
