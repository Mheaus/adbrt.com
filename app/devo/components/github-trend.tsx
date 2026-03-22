import type { GithubRepo } from '~/types/devo';
import Icon from '~/components/icon';

export default function GithubTrend({ language, repo, stars, forks, todayStars }: GithubRepo) {
  return (
    <div className="border-b border-gray-200/65 py-4 text-left text-base">
      <div className="mb-1">
        <h3 className="m-0 break-words text-xl font-semibold">
          <a href={repo.link} className="text-[#0366d6] no-underline hover:underline">
            <span className="font-normal"> {repo.owner} /</span> {repo.name}
          </a>
        </h3>
      </div>
      <div className="mb-2 inline-block break-words py-1 text-sm text-[#586069]">{repo.description}</div>
      <div className="flex text-sm text-[#586069]">
        {language && (
          <span className="mr-4">
            <span className="mr-1 inline-block h-3 w-3 rounded-full align-[-10%]" style={{ backgroundColor: language.color }} />
            <span>{language.is}</span>
          </span>
        )}
        {stars && (
          <a href={stars.link} className="mr-4 flex items-center gap-1 text-inherit no-underline hover:underline">
            <Icon icon="ri:star-fill" />
            <span>{Number(stars.count).toLocaleString()}</span>
          </a>
        )}
        {forks && (
          <a href={forks.link} className="mr-4 flex items-center gap-1 text-inherit no-underline hover:underline">
            <Icon icon="ri:git-branch-line" />
            <span>{Number(forks.count).toLocaleString()}</span>
          </a>
        )}
        <div className="flex items-center gap-1">
          <Icon icon="ri:star-fill" />
          <span>{Number(todayStars).toLocaleString()} stars today</span>
        </div>
      </div>
    </div>
  );
}
