import Image from 'next/image'

// Full-length screenshot that pans top → bottom while hovered (for sites that block live embedding).
// Pure CSS: `top` 0→100% plus translateY 0→-100% moves exactly (image height − frame height).
export default function ScrollShot({
  src,
  width,
  height,
  alt,
  sizes,
}: {
  src: string
  width: number
  height: number
  alt: string
  sizes: string
}) {
  return (
    <div className="group/scroll absolute inset-0 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="absolute top-0 left-0 h-auto w-full transition-[top,translate] duration-[1200ms] ease-in-out group-hover/scroll:top-full group-hover/scroll:-translate-y-full group-hover/scroll:duration-[9000ms]"
      />
      <span
        aria-hidden="true"
        className="bg-neutral/85 text-primary pointer-events-none absolute right-4 bottom-4 rounded-full px-3 py-1.5 font-mono text-[11px] opacity-0 backdrop-blur transition-opacity duration-300 group-hover/scroll:opacity-100">
        Scrolling full page ↕
      </span>
    </div>
  )
}
