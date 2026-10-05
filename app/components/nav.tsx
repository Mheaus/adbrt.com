import { NavLink as RouterNavLink } from 'react-router';

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/sakuga', label: 'Sakuga' },
  { to: '/svafa', label: 'Svafa' },
  { to: '/devo', label: 'Devo' },
];

export default function Nav() {
  return (
    <nav className="absolute top-3 left-3 flex flex-col items-start gap-1 sm:top-5 sm:left-5">
      {links.map(({ to, label }, i) => (
        <RouterNavLink
          key={to}
          to={to}
          end
          className="group relative z-10 flex w-fit items-baseline gap-2 px-1.5 py-0.5 text-ice no-underline transition-colors duration-200 hover:text-void aria-[current=page]:text-cyan aria-[current=page]:hover:text-void"
        >
          <span className="absolute inset-y-0 left-0 -z-10 w-0 bg-cyan transition-all duration-200 group-hover:w-full" />
          <span className="font-mono text-[10px] text-dim group-hover:text-void/60">{String(i + 1).padStart(2, '0')}</span>
          <span className="font-display text-sm font-semibold tracking-widest uppercase sm:text-base">{label}</span>
        </RouterNavLink>
      ))}
    </nav>
  );
}
