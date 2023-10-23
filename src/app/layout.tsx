import './globals.css';
import * as React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { colors } from '../theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const style = Object.entries(colors).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`--color-${key}`]: value,
  }),
  {},
);

interface RootLayoutProps {
  children: React.ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className} style={style}>
        {children}
      </body>
    </html>
  );
}
