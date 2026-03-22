import { useContext } from 'react';
import type { DevToItem } from '~/types/devo';
import Icon from '~/components/icon';
import context from '../context';
import formatRelativeDate from '../format-relative-date';

const baseUrl = 'https://dev.to/';

export default function DevTo({ comments_count: commentsCount, positive_reactions_count: positiveReactionsCount, published_at: publishedAt, tag_list: tagList, title, url, user }: DevToItem) {
  const { isNightMode } = useContext(context);

  const relativeDate = formatRelativeDate(new Date(publishedAt));
  const publishDateShort = new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  return (
    <div className={`border-b py-2 text-left text-[15px] ${isNightMode ? 'border-gray-700 text-inherit' : 'border-gray-200/65 text-[#292929]'}`}>
      <h2 className="m-0 truncate text-xl font-light leading-7">
        <a href={url} title={title} className="no-underline text-inherit hover:underline">
          {title}
        </a>
      </h2>

      {tagList && (
        <div className="mt-0.5 text-xs">
          {tagList.map((tag) => (
            <a className="mr-2 text-xs text-gray-500 no-underline hover:underline" key={tag} href={`${baseUrl}/t/${tag}`}>
              #{tag}
            </a>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
        <div>
          <a className="no-underline text-inherit hover:underline" href={`${baseUrl}${user.username}`}>
            {user.name}
          </a>
          {' ・ '}
          {publishDateShort} ({relativeDate} ago)
        </div>

        <div className="flex gap-1">
          <div className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs text-gray-400 ${isNightMode ? 'border-gray-500' : 'border-gray-200'}`}>
            <Icon icon="ri:heart-fill" className="text-red-400" />
            <span>{positiveReactionsCount}</span>
          </div>

          <a
            href={`${url}#comments`}
            className={`flex items-center gap-1 rounded border px-1.5 py-0.5 text-xs text-gray-400 no-underline hover:bg-gray-100 ${isNightMode ? 'border-gray-500 hover:bg-gray-700' : 'border-gray-200'}`}
          >
            <Icon icon="ri:chat-3-fill" className="text-blue-400" />
            <span>{commentsCount}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
