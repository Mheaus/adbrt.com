import ClientPage from './Devo';
import settings from './settings';

export const metadata = {
  title: 'Devo',
  description: 'Devo is a dashboard for developers to keep up with the latest news from the developer community.',
  slug: 'devo',
  date: '2021-10-01T00:00:00.000Z',
  cover: 'https://devo.ams3.digitaloceanspaces.com/cover.png',
  canonicalUrl: 'https://devo.aminnairi.tech',
  tags: ['devo', 'dashboard', 'developer', 'news', 'community'],
  published: true,
};

const Page = async () => {
  // const entries = await Promise.all(
  //   Object.entries(settings.platforms).map(async ([name, values]) => {
  //     try {
  //       const response = await fetch(values.dataUrl);

  //       if (!response.ok) {
  //         throw new Error(`Unable to fetch data from ${values.dataUrl}: ${response.status} ${response.statusText}`);
  //       }

  //       const data = await response.json();

  //       return [name, { ...values, data }];
  //     } catch (err) {
  //       console.error(err);

  //       return [name, { ...values, data: null }];
  //     }
  //   }),
  // );

  // const result = Object.fromEntries(entries);

  // console.log(result);

  return <ClientPage />;
};

export default Page;
