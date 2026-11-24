import { FC, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string
}

const Input: FC<InputProps> = ({ type = 'text', id, label, className = '', ...props }) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-tertiary-content font-mono text-[11px] tracking-[0.2em] uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...props}
        className="border-border bg-card text-neutral focus:border-accent focus:ring-accent/15 rounded-xl focus:ring-4 h-12 w-full border px-4 transition-colors duration-300 outline-none"
      />
    </div>
  )
}

export default Input
