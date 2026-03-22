export const linkClasses = 'no-underline text-inherit hover:underline';

export default function Link({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props} className={`${linkClasses} ${props.className || ''}`}>
      {children}
    </a>
  );
}
