import * as React from 'react';

import useDate from '../useDate';

const Header = () => {
  const { now, today } = useDate();

  return (
    <div className="flex items-center justify-between text-3xl font-thin">
      <div className="inline-block time" suppressHydrationWarning>
        {now}
      </div>
      <div className="inline-block date pull-right" suppressHydrationWarning>
        {today}
      </div>
    </div>
  );
};

export default Header;
