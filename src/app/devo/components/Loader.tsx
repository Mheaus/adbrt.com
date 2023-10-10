import * as React from 'react';

const roundedItemClasses = 'animate-fadescale delay rounded-full h-4 w-4';

interface LoaderProps {
  color: string;
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { color = '#333' } = props;

  return (
    <div className="relative flex items-center justify-center gap-1 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
      <div className={roundedItemClasses} style={{ backgroundColor: color, animationDelay: '-320ms' }} />
      <div className={roundedItemClasses} style={{ backgroundColor: color, animationDelay: '-160ms' }} />
      <div className={roundedItemClasses} style={{ backgroundColor: color }} />
    </div>
  );
};

export default Loader;
