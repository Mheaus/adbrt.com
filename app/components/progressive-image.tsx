import { useState } from 'react';

interface ProgressiveImageProps {
  src: string;
  width: number;
  height?: number;
  alt: string;
  className?: string;
}

function imageUrl(src: string, w: number, opts?: { blur?: boolean; quality?: number; height?: number }) {
  const params = new URLSearchParams({
    src,
    w: String(w),
    ...(opts?.height ? { h: String(opts.height) } : {}),
  });
  if (opts?.blur) params.set('blur', 'true');
  if (opts?.quality) params.set('q', String(opts.quality));
  return `/api/image?${params}`;
}

export default function ProgressiveImage({ src, width, height, alt, className }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);

  const blurSrc = imageUrl(src, 32, { blur: true, quality: 30, height });
  const fullSrc = imageUrl(src, width, { quality: 80, height });

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {/* Tiny blurred placeholder */}
      <img
        src={blurSrc}
        alt=""
        aria-hidden="true"
        height={height}
        width={width}
        className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm"
        style={{ transition: 'opacity 0.4s', opacity: loaded ? 0 : 1 }}
      />

      {/* Full resolution */}
      <img
        src={fullSrc}
        alt={alt}
        height={height}
        width={width}
        className="relative h-full w-full object-cover"
        style={{ transition: 'opacity 0.4s', opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
