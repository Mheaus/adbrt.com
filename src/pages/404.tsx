import * as React from 'react';
import { navigate } from 'gatsby';

import { RiVolumeMuteFill, RiVolumeUpLine } from 'react-icons/ri';
import { Layout, SEO } from '../components';

import video from '../assets/videos/game_over.mp4';

const NotFoundPage = () => {
  const [isMuted, setIsMuted] = React.useState(true);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;

      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <Layout>
      <SEO title="404 - Not found" />
      <button
        className="flex items-center justify-center w-full h-full bg-black"
        onClick={() => toggleMute()}
        type="button"
      >
        <video
          height="100%"
          src={video}
          ref={videoRef}
          autoPlay
          muted
          onEnded={() => {
            navigate(`/`);
          }}
        >
          <track kind="captions" />
        </video>
      </button>

      <button className="absolute text-3xl text-white bottom-4 right-4" onClick={() => toggleMute()} type="button">
        {isMuted ? <RiVolumeMuteFill /> : <RiVolumeUpLine />}
      </button>
    </Layout>
  );
};

export default NotFoundPage;
