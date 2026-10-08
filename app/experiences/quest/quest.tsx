import Crt from '../crt';

const GAME_URL = 'https://quest.sakuga.dev/';

/**
 * The Quest of Ariland, served by its own site. On a touch screen the game shows its own controls
 * below the picture, so the frame is taller than the 16:15 screen of the console.
 */
export default function Quest() {
  return (
    <div className="flex min-h-0 flex-col items-center gap-3">
      <Crt>
        <iframe
          src={GAME_URL}
          title="The Quest of Ariland"
          allow="autoplay; gamepad; fullscreen"
          className="block aspect-[16/15] w-[min(calc(100vw-5rem),calc(62vh*1.0667),720px)] border-0 bg-black pointer-coarse:aspect-[5/8] pointer-coarse:w-[min(calc(100vw-4rem),calc(70dvh*0.625))]"
        />
      </Crt>
      <a href={GAME_URL} target="_blank" rel="noreferrer" className="font-mono text-[10px] tracking-[0.25em] text-dim uppercase underline-offset-4 hover:underline">
        Plein écran ↗
      </a>
    </div>
  );
}
