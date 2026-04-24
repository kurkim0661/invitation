import type { Transportation as TransportationType, Parking } from '../data/types';
import { useClipboard } from '../hooks/useClipboard';

interface TransportationProps {
  transportation: TransportationType[];
  parking: Parking[];
}

const typeLabels: Record<string, string> = {
  subway: '지하철',
  bus: '버스',
  shuttle: '셔틀버스',
};

const subwayLineColors: Record<string, string> = {
  '1호선': '#0052A4',
  '2호선': '#009D3E',
  '3호선': '#EF7C1C',
  '4호선': '#00A5DE',
  '5호선': '#996CAC',
  '6호선': '#CD7C2F',
  '7호선': '#747F00',
  '8호선': '#E6186C',
  '9호선': '#BDB092',
};

function getLineNumber(name: string): string | null {
  const match = name.match(/(\d호선)/);
  return match ? match[1] : null;
}

function getStationInfo(name: string, detail: string): string {
  const cleaned = name.replace(/\d호선\s*/, '');
  return `${cleaned} ${detail}`;
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="inline-block text-navy-light">
      <rect x="5" y="5" width="8" height="8" rx="1.5" />
      <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#009D3E" strokeWidth="1.5" className="inline-block">
      <path d="M3 8.5L6.5 12L13 4" />
    </svg>
  );
}

function SubwaySection({ lines }: { lines: TransportationType['lines'] }) {
  return (
    <div className="space-y-3">
      {lines.map((line, idx) => {
        const lineNum = getLineNumber(line.name);
        const color = lineNum ? subwayLineColors[lineNum] : '#666';
        const info = getStationInfo(line.name, line.detail);
        return (
          <div key={idx} className="flex items-center gap-3 justify-center">
            {lineNum && (
              <span
                className="text-[13px] text-white px-2 py-0.5 rounded-sm font-medium whitespace-nowrap"
                style={{ backgroundColor: color }}
              >
                {lineNum}
              </span>
            )}
            <span className="text-[14px] text-text">
              {info}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ShuttleSection({ lines }: { lines: TransportationType['lines'] }) {
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => (
        <p key={idx} className="text-[14px] text-text text-center">
          {line.detail}
        </p>
      ))}
    </div>
  );
}

function BusSection({ lines }: { lines: TransportationType['lines'] }) {
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => (
        <p key={idx} className="text-[14px] text-text text-center">
          {line.name} - {line.detail}
        </p>
      ))}
    </div>
  );
}

function ParkingItem({ p }: { p: Parking }) {
  const { copy, copied } = useClipboard();
  return (
    <div className="text-center">
      <p className="text-[14px] text-text">
        <span className="font-bold">{p.name} ({p.capacity}대):</span>{' '}
        {p.address}
        <button
          onClick={() => copy(p.address)}
          className="inline-block align-middle ml-1"
          aria-label={`${p.address} 복사`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </p>
      {copied && (
        <span className="text-[11px] text-navy-light">복사됨</span>
      )}
    </div>
  );
}

function ParkingSection({ parking }: { parking: Parking[] }) {
  return (
    <div className="space-y-4">
      {parking.map((p, idx) => (
        <ParkingItem key={idx} p={p} />
      ))}
    </div>
  );
}

export default function Transportation({ transportation, parking }: TransportationProps) {
  return (
    <section className="px-8 py-10 pb-16 bg-white">
      <div className="space-y-10">
        {transportation.map((t) => (
          <div key={t.type}>
            <h3 className="text-[16px] font-bold text-text mb-4 text-center">
              {typeLabels[t.type]}
            </h3>
            {t.type === 'subway' && (
              <>
                <SubwaySection lines={t.lines} />
                {/* Subway/bus direction map - after 지하철 */}
                <div className="mt-6">
                  <img
                    src={`${import.meta.env.BASE_URL}images/subway-map.png`}
                    alt="지하철/버스 안내 지도"
                    className="w-full"
                  />
                </div>
              </>
            )}
            {t.type === 'shuttle' && <ShuttleSection lines={t.lines} />}
            {t.type === 'bus' && <BusSection lines={t.lines} />}
          </div>
        ))}

        <div>
          <h3 className="text-[16px] font-bold text-text mb-4 text-center">
            주차
          </h3>
          <ParkingSection parking={parking} />
          {/* Parking direction map - after 주차 별관 */}
          <div className="mt-6">
            <img
              src={`${import.meta.env.BASE_URL}images/transport-map.png`}
              alt="주차 안내 지도"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
