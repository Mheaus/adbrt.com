import { Metadata } from 'next';
import NotFoundPage from './_not-found/page';

export const metadata: Metadata = {
  title: '404',
  description: 'Page not found',
};

const Layout = () => {
  return <NotFoundPage />;
};

export default Layout;
