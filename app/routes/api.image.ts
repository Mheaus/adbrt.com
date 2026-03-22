import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import type { Route } from './+types/api.image';

const CACHE = new Map<string, { buffer: Buffer; contentType: string }>();

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const src = url.searchParams.get('src');
  const w = parseInt(url.searchParams.get('w') || '0', 10);
  const q = parseInt(url.searchParams.get('q') || '75', 10);
  const blur = url.searchParams.get('blur') === 'true';

  if (!src) {
    return new Response('Missing src parameter', { status: 400 });
  }

  const cacheKey = `${src}:${w}:${q}:${blur}`;
  const cached = CACHE.get(cacheKey);
  if (cached) {
    return new Response(cached.buffer, {
      headers: {
        'Content-Type': cached.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  const filePath = path.join(process.cwd(), 'public', src);

  if (!fs.existsSync(filePath)) {
    return new Response(`Image not found: ${src}`, { status: 404 });
  }

  let pipeline = sharp(filePath);

  if (w > 0) {
    pipeline = pipeline.resize(w);
  }

  if (blur) {
    pipeline = pipeline.blur(20);
  }

  const buffer = await pipeline.webp({ quality: q }).toBuffer();

  CACHE.set(cacheKey, { buffer, contentType: 'image/webp' });

  return new Response(buffer, {
    headers: {
      'Content-Type': 'image/webp',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
