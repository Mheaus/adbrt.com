import useDate from '../use-date';

export default function Header() {
  const { now, today } = useDate();

  return (
    <div className="flex items-center justify-between text-3xl font-thin">
      <div className="inline-block" suppressHydrationWarning>
        {now}
      </div>
      <div className="inline-block" suppressHydrationWarning>
        {today}
      </div>
    </div>
  );
}
