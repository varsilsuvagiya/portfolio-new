import { ButtonHTMLAttributes, FC } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

const Button: FC<ButtonProps> = ({ text, ...props }) => {
  return (
    <button
      {...props}
      className="bg-secondary-content h-12 cursor-pointer rounded-full px-7 text-white text-sm font-medium transition-opacity duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
      {text}
    </button>
  )
}

export default Button
