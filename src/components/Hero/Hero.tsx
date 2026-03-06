'use client'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import useRotatingAnimation from '@/hooks/useRotatingAnimation'
import Image from 'next/image'
import { HeroImage } from '../../utils/images'
import { motion, Variants } from 'framer-motion'
import Ellipse from './Ellipse'

type HeroProps = {
  dict: Record<string, string>
}

const Hero = ({ dict }: HeroProps) => {
  const ellipseRef = useRotatingAnimation()
  const role = useRoleSwitcher({
    roles: ['FULL STACK DEVELOPER', 'WEB DESIGNER', 'MERN STACK DEVELOPER'],
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } },
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/projects/Varsil_Suvagiya_2026.pdf'
    link.download = 'Varsil_Suvagiya_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-4 px-4 pt-12 pb-10 md:grid-cols-2 lg:p-4">
        <motion.div
          className="flex min-h-48 flex-col justify-between lg:min-h-56 lg:max-w-[33.75rem]"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          <motion.h1 variants={itemVariants}>
            <span className="text-neutral mb-2 block text-3xl font-bold">
              {dict.greeting} Varsil Suvagiya
            </span>
            <span className="text-accent block text-[1.75rem] font-bold">{role}</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="text-neutral mt-3">
            {dict.description}
          </motion.h2>

          <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-6">
            <a
              href="https://wa.me/919664976355"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect with me on WhatsApp"
              className="bg-accent min-w-32 cursor-pointer rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E] transition-transform duration-300 hover:scale-105">
              Hire Me
            </a>
            <a
              href="https://www.linkedin.com/in/varsil-suvagiya/"
              aria-label="View LinkedIn Profile"
              className="text-neutral bg-secondary cursor-pointer rounded-lg px-[14px] py-[10px] text-sm transition-transform duration-300 hover:scale-105">
              LinkedIn Profile
            </a>
            <button
              onClick={handleDownload}
              aria-label="Download Resume"
              className="text-neutral bg-secondary flex cursor-pointer items-center gap-2 rounded-lg px-[14px] py-[10px] text-sm transition-transform duration-300 hover:scale-105">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download CV
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring', bounce: 0.4 }}
          className="flex min-h-[18.75rem] items-center justify-center lg:min-h-[35rem]">
          <div className="text-accent relative size-56 sm:size-60 md:size-[20rem] lg:size-[25.75rem]">
            <Image
              src={HeroImage}
              fill={true}
              priority={true}
              sizes="(min-width: 1024px) 25.75rem, (min-width: 768px) 20rem, (min-width: 640px) 15rem, 14rem"
              alt="Varsil Suvagiya - Full Stack Developer"
              className="object-contain p-7"
            />
            <Ellipse
              ref={ellipseRef}
              className="absolute top-0 left-0 size-56 transition-transform duration-500 ease-out sm:size-60 md:size-[20rem] lg:size-[25.75rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
