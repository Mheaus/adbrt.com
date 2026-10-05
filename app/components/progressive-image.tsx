interface ProgressiveImageProps {
  src: string;
  width: number;
  height?: number;
  alt: string;
  className?: string;
  priority?: boolean;
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

/** The blurred placeholder sits under the full image, so the full image covers it on load without JavaScript. */
export default function ProgressiveImage({ src, width, height, alt, className, priority }: ProgressiveImageProps) {
  const blurSrc = imageUrl(src, 256, { blur: true, quality: 30, height });
  const fullSrc = imageUrl(src, width, { quality: 80, height });

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <img src={blurSrc} alt="" aria-hidden="true" height={height} width={width} className="absolute inset-0 h-full w-full scale-110 object-cover blur-sm" />
      <img src={fullSrc} alt={alt} height={height} width={width} fetchPriority={priority ? 'high' : undefined} className="relative h-full w-full object-cover" />
    </div>
  );
}
