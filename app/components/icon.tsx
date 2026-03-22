import icons from './icons.json';

interface IconProps {
  icon: string;
  className?: string;
}

export default function Icon({ icon, className }: IconProps) {
  const data = icons[icon as keyof typeof icons];

  if (!data) return null;

  return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${data.width} ${data.height}`} className={className} width="1em" height="1em" dangerouslySetInnerHTML={{ __html: data.body }} />;
}
