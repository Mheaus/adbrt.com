import * as React from 'react';

export const margin = {
  top: '1rem',
  right: '1rem',
  bottom: '1rem',
  left: '12rem',
} as const;

const NavLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      height: `calc(100% - ${margin.top} - ${margin.bottom})`,
      margin: `${margin.top} ${margin.right} ${margin.bottom} ${margin.left}`,
      width: `calc(100% - ${margin.right} - ${margin.left})`,
    }}
  >
    {children}
  </div>
);

export default NavLayout;
