import { FC, TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  id: string
}

const Textarea: FC<TextareaProps> = ({ id, label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">
        {label}
      </label>
      <textarea
        id={id}
        {...props}
        className="border-border bg-card text-neutral focus:border-accent focus:ring-accent/15 rounded-xl focus:ring-4 w-full resize-none border px-4 py-3 transition-colors duration-300 outline-none"
      />
    </div>
  )
}

export default Textarea
