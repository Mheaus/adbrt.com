interface TouchPadProps {
  buttons: { label: string; action: string }[];
  onPress: (action: string) => void;
  onRelease?: (action: string) => void;
}

/** Shows on-screen controls on touch screens only, because the games use the keyboard everywhere else. */
export default function TouchPad({ buttons, onPress, onRelease }: TouchPadProps) {
  return (
    <div className="hidden flex-wrap justify-center gap-2 pointer-coarse:flex">
      {buttons.map((b) => (
        <button
          key={b.action}
          type="button"
          aria-label={b.action}
          onPointerDown={(e) => {
            e.preventDefault();
            onPress(b.action);
          }}
          onPointerUp={() => onRelease?.(b.action)}
          onPointerCancel={() => onRelease?.(b.action)}
          onPointerLeave={() => onRelease?.(b.action)}
          className="chamfer flex size-12 touch-none items-center justify-center bg-cyan/10 font-display text-lg text-cyan ring-1 ring-cyan/50 ring-inset select-none active:bg-cyan active:text-void"
          style={{ ['--cut' as string]: '6px' }}
        >
          {b.label}
        </button>
      ))}
    </div>
  );
}
