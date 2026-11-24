import MaskText from '../UI/MaskText'

interface SectionHeadingProps {
  index: string
  label: string
  title: string
  subtitle?: string
  className?: string
}

// Product-page heading: small accent eyebrow, large display title, calm supporting line.
const SectionHeading = ({ index, label, title, subtitle, className = '' }: SectionHeadingProps) => {
  return (
    <header className={`max-w-4xl ${className}`}>
      <p className="text-accent flex items-center gap-3 text-sm font-medium">
        <span className="font-mono text-xs">{index}</span>
        <span aria-hidden="true" className="bg-accent/40 h-px w-6" />
        {label}
      </p>
      <h2 className="text-neutral mt-5 text-[clamp(2.4rem,5.4vw,4.75rem)] leading-[1.02] font-semibold tracking-[-0.045em] text-balance">
        <MaskText text={title} />
      </h2>
      {subtitle && <p className="text-tertiary-content mt-6 max-w-2xl text-xl leading-relaxed text-pretty">{subtitle}</p>}
    </header>
  )
}

export default SectionHeading
