import ClientPage from './Devo';

export const metadata = {
  title: 'Devo',
  description: 'Devo is a dashboard for developers to keep up with the latest news from the developer community.',
  slug: 'devo',
  tags: ['devo', 'dashboard', 'developer', 'news', 'community'],
  published: true,
};

const Page = async () => {
  return <ClientPage />;
};

export default Page;
