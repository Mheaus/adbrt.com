import * as React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'stars',
  description: 'Stars',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default Layout;
