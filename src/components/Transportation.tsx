import type { Transportation as TransportationType, Parking } from '../data/types';

interface TransportationProps {
  transportation: TransportationType[];
  parking: Parking[];
}

const typeLabels: Record<string, string> = {
  subway: '지하철',
  bus: '버스',
  shuttle: '셔틀버스',
};

const typeIcons: Record<string, string> = {
  subway: '🚇',
  bus: '🚌',
  shuttle: '🚐',
};

export default function Transportation({ transportation, parking }: TransportationProps) {
  return (
    <section className="px-8 py-10 pb-16">
      <div className="space-y-8">
        {transportation.map((t) => (
          <div key={t.type}>
            <h3 className="font-sans text-[14px] font-medium text-text mb-3 flex items-center gap-2">
              <span>{typeIcons[t.type]}</span>
              {typeLabels[t.type]}
            </h3>
            <div className="space-y-2">
              {t.lines.map((line, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pl-7"
                >
                  <div className="flex-1">
                    <p className="font-sans text-[13px] text-text">
                      {line.name}
                    </p>
                    <p className="font-sans text-[12px] text-text-light">
                      {line.detail}
                    </p>
                  </div>
                  {line.walkMinutes && (
                    <span className="text-[12px] text-primary font-medium whitespace-nowrap">
                      도보 {line.walkMinutes}분
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div>
          <h3 className="font-sans text-[14px] font-medium text-text mb-3 flex items-center gap-2">
            <span>🅿️</span>
            주차
          </h3>
          <div className="space-y-3">
            {parking.map((p, idx) => (
              <div key={idx} className="pl-7">
                <p className="font-sans text-[13px] text-text">
                  {p.name} ({p.capacity}대): {p.address}
                </p>
                <p className="font-sans text-[12px] text-text-light">
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
