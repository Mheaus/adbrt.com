import { useState, useCallback } from 'react';

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

  const imgRef = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const blurSrc = imageUrl(src, 256, { blur: true, quality: 30, height });
  const fullSrc = imageUrl(src, width, { quality: 80, height });

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {!loaded && <img src={blurSrc} alt="" aria-hidden="true" height={height} width={width} className="absolute inset-0 h-full w-full object-cover scale-110 blur-sm" />}
      <img
        ref={imgRef}
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
