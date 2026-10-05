import { Link, NavLink, type LinkProps, type NavLinkProps } from 'react-router';

const ORDER = ['/', '/sakuga', '/svafa', '/devo'];

/**
 * Sets the slide direction for the next view transition: a page further down the nav enters from the right.
 * Call it before the navigation starts, because the browser captures the old page at that moment.
 */
export function setTransitionDirection(to: string) {
  const from = ORDER.indexOf(window.location.pathname);
  const next = ORDER.indexOf(to);
  document.documentElement.dataset.navDirection = next >= 0 && from >= 0 && next < from ? 'back' : 'forward';
}

export function TransitionLink({ to, onClick, ...props }: LinkProps & { to: string }) {
  return (
    <Link
      to={to}
      viewTransition
      onClick={(e) => {
        setTransitionDirection(to);
        onClick?.(e);
      }}
      {...props}
    />
  );
}

export function TransitionNavLink({ to, onClick, ...props }: NavLinkProps & { to: string }) {
  return (
    <NavLink
      to={to}
      viewTransition
      onClick={(e) => {
        setTransitionDirection(to);
        onClick?.(e);
      }}
      {...props}
    />
  );
}
