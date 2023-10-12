import clsx from 'clsx';

const linkClasses = 'no-underline text-inherit hover:underline hover:underline-current';

const Link = ({ href, children, ...props }: React.HTMLProps<HTMLAnchorElement>) => (
  <a href={href} target="_blank" rel="noopener noreferrer" {...props} className={clsx('no-underline text-inherit hover:underline hover:underline-current', props.className)}>
    {children}
  </a>
);

export { linkClasses };
export default Link;
