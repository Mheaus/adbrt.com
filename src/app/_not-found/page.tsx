'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { RiVolumeMuteFill, RiVolumeUpLine } from 'react-icons/ri';

const NotFoundPage = () => {
  const [isMuted, setIsMuted] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const router = useRouter();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;

      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <>
      <button className="flex items-center justify-center w-full h-full bg-black" onClick={() => toggleMute()} type="button">
        <video
          height="100%"
          className="object-cover w-full h-full"
          src="/assets/videos/game_over.mp4"
          ref={videoRef}
          autoPlay
          muted
          onEnded={() => {
            router.push(`/`);
          }}
        >
          <track kind="captions" />
        </video>
      </button>

      <button className="absolute text-3xl text-white bottom-4 right-4" onClick={() => toggleMute()} type="button">
        {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpLine />}
      </button>
    </>
  );
};

export default NotFoundPage;
