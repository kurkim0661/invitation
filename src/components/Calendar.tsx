interface CalendarProps {
  weddingDate: string;
  weddingDateDisplay: string;
  venueName: string;
}

export default function Calendar({ weddingDate, weddingDateDisplay, venueName }: CalendarProps) {
  const date = new Date(weddingDate);
  const year = date.getFullYear();
  const month = date.getMonth();
  const weddingDay = date.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthDisplay = month + 1;

  const rows: (number | null)[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }
  // Pad the last row if needed
  if (rows.length > 0) {
    const lastRow = rows[rows.length - 1];
    while (lastRow.length < 7) {
      lastRow.push(null);
    }
  }

  return (
    <section className="px-8 py-10">
      {/* Date heading */}
      <h2 className="text-center font-serif text-[22px] tracking-wide text-text mb-2">
        {weddingDateDisplay}
      </h2>
      {/* Venue */}
      <p className="text-center font-sans text-[15px] text-text-light mb-8">
        {venueName}
      </p>

      {/* Large month number */}
      <div className="flex justify-center mb-6">
        <span className="font-serif text-[72px] font-extralight leading-none text-text">
          {monthDisplay}
        </span>
      </div>

      {/* Calendar grid table */}
      <table className="w-full border-collapse">
        {/* Day headers */}
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th
                key={day}
                className={`font-sans text-[12px] font-normal pb-3 text-center ${
                  day === 'Sun' || day === 'Sat' ? 'text-[#D4849A]' : 'text-text-light'
                }`}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((day, colIdx) => {
                const isWeddingDay = day === weddingDay;
                const isSunday = colIdx === 0;
                const isSaturday = colIdx === 6;

                return (
                  <td
                    key={colIdx}
                    className="border border-border relative"
                    style={{ height: '65px' }}
                  >
                    {day && (
                      <span
                        className={`absolute top-2 left-2 font-sans text-[14px] font-semibold ${
                          isSunday || isSaturday ? 'text-[#D4849A]' : 'text-text'
                        }`}
                      >
                        {day}
                      </span>
                    )}
                    {isWeddingDay && (
                      <div className="absolute -bottom-2 -right-2 z-10 pointer-events-none">
                        <img
                          src={`${import.meta.env.BASE_URL}images/flower.png`}
                          alt=""
                          className="absolute -top-16 -left-4 w-[70px] h-auto"
                        />
                        <img
                          src={`${import.meta.env.BASE_URL}images/wax-seal.png`}
                          alt=""
                          className="relative w-[52px] h-auto"
                        />
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
