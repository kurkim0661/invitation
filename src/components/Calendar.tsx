interface CalendarProps {
  weddingDate: string;
}

export default function Calendar({ weddingDate }: CalendarProps) {
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

  return (
    <section className="px-8 py-6">
      <div className="flex justify-center mb-4">
        <span className="font-serif text-5xl font-light text-primary">
          {monthDisplay}
        </span>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-[13px]">
        {weekdays.map((day) => (
          <div
            key={day}
            className={`font-sans text-[12px] pb-2 ${
              day === 'Sun' ? 'text-red-400' : 'text-text-light'
            }`}
          >
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          const isWeddingDay = day === weddingDay;
          const isSunday = idx % 7 === 0;
          return (
            <div
              key={idx}
              className={`py-1 font-sans text-[13px] ${
                isWeddingDay
                  ? 'bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto font-medium'
                  : isSunday
                  ? 'text-red-400'
                  : 'text-text'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </section>
  );
}
