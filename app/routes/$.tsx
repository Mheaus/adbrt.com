import * as React from 'react';
import { useNavigate, useLocation, type LoaderFunctionArgs } from 'react-router';

export function loader({ request }: LoaderFunctionArgs) {
  console.log(`404 - Route not found: ${new URL(request.url).pathname}`);
  return null;
}

export default function NotFound() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMuted, setIsMuted] = React.useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  React.useEffect(() => {
    console.log(`404 - Route not found: ${pathname}`);
  }, [pathname]);

  return (
    <>
      <button className="flex items-center justify-center w-full h-full bg-black" onClick={toggleMute} type="button">
        <video height="100%" className="object-cover w-full h-full" src="/assets/videos/game_over.mp4" ref={videoRef} autoPlay muted onEnded={() => navigate('/')}>
          <track kind="captions" />
        </video>
      </button>
      <button className="absolute text-3xl text-white bottom-4 right-4" onClick={toggleMute} type="button">
        {isMuted ? '🔇' : '🔊'}
      </button>
    </>
  );
}
