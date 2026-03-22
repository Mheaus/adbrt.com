import type { DesignerNewsItem as DesignerNewsItemType } from '~/types/devo';
import formatRelativeDate from '../format-relative-date';

const baseUrl = 'https://www.designernews.co/';

export default function DesignerNewsItem({ id, hostname = null, url, created_at: createdAt, title, vote_count: voteCount, comment_count: commentCount }: DesignerNewsItemType) {
  const threadLink = `${baseUrl}stories/${id}`;

  return (
    <div className="border-b border-gray-200/65 py-2 text-left text-base">
      <div className="mb-1">
        {hostname && (
          <span className="float-right mt-0.5 pl-1 text-[10.667px] text-gray-500">
            <a href={`https://${hostname}`} className="no-underline text-inherit hover:underline">
              ({hostname})
            </a>
          </span>
        )}
        <div className="truncate">
          <a href={url && url.startsWith('http') ? url : threadLink} title={title} className="no-underline text-inherit hover:underline">
            {title}
          </a>
        </div>
      </div>
      <div className="text-[9.33px] text-gray-500">
        {voteCount} points | {formatRelativeDate(new Date(createdAt))} ago |
        <a href={threadLink} className="mx-0.5 no-underline text-inherit hover:underline">
          {commentCount > 0 ? `${commentCount} comments` : 'discuss'}
        </a>
      </div>
    </div>
  );
}
