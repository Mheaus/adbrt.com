const dotClasses = 'animate-fadescale rounded-full h-4 w-4';

interface LoaderProps {
  color: string;
}

export default function Loader({ color = '#333' }: LoaderProps) {
  return (
    <div className="relative left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1">
      <div className={dotClasses} style={{ backgroundColor: color, animationDelay: '-320ms' }} />
      <div className={dotClasses} style={{ backgroundColor: color, animationDelay: '-160ms' }} />
      <div className={dotClasses} style={{ backgroundColor: color }} />
    </div>
  );
}
