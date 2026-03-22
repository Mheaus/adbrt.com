import { Link } from 'react-router';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="relative z-10 block w-fit px-1 text-lg font-normal text-white transition-all duration-250 hover:text-gray-800 group">
    <div className="absolute top-0 left-0 -z-10 block h-full w-0 transition-all duration-250 group-hover:w-[calc(100%+1rem)] group-hover:bg-white" />
    {children}
  </Link>
);

export default function Nav() {
  return (
    <nav className="absolute top-4 left-4 flex flex-col items-start gap-2">
      <NavLink to="/">Accueil</NavLink>
      <NavLink to="/sakuga">Sakuga</NavLink>
      <NavLink to="/devo">Devo</NavLink>
    </nav>
  );
}
