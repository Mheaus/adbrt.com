'use client';

import * as React from 'react';
import Link from './Link';
import { HackerNewsItem } from '@/types/devo';

// const { externalLink } = settings.platforms.hackernews;
const externalLink = 'https://news.ycombinator.com';

const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'long' });

const HackerNewsItem = (props: HackerNewsItem) => {
  const { id, title, score = null, by, time, kids, url } = props;

  const relativeHours = Math.floor((Date.now() - time * 1000) / 1000 / 60 / 60);

  const age = relativeHours < 1 ? 'less than an hour ago' : rtf1.format(-relativeHours, 'hour');

  const { host, pathname } = url ? new URL(url) : { host: '', pathname: '' };
  const path = pathname.split('/')?.[1] || '';
  const site = `${host.replace('www.', '')}${path ? '/' + path : ''}`;

  return (
    <div className="flex flex-col gap-1 py-2 border-b border-gray-300 ">
      <div className="flex items-center max-w-full gap-1 truncate">
        <Link href={url} title={title}>
          {title}
        </Link>

        {url && (
          <span className="text-xs text-gray-500">
            <Link href={`${externalLink}/from?site=${site}`}>({site})</Link>
          </span>
        )}
      </div>
      <div className="text-[0.675rem] text-gray-500">
        {score} points by <Link href={`${externalLink}/user?id=${by}`}> {by}</Link> | {age} |<Link href={`${externalLink}/item?id=${id}`}> {kids?.length} Comments</Link>
      </div>
    </div>
  );
};

export default HackerNewsItem;
