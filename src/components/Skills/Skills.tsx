'use client'
import dynamic from 'next/dynamic'
import { skillList } from '@/appData'

const MarqueeWrapper = dynamic(() => import('../Marquee/MarqueeWrapper'), { ssr: false })

type SkillsProps = {
  dict?: Record<string, string>
}

const Skills = ({ dict }: SkillsProps) => {
  return (
    <MarqueeWrapper className="from-primary to-primary via-marquee bg-linear-to-r">
      {dict?.title && <h2 className="sr-only">{dict.title}</h2>}
      <div className="flex gap-8 lg:gap-24">
        {skillList.map(({ name, icon: Icon, color }, index) => (
          <span
            key={index}
            className="font-inter text-primary-content flex items-center text-xs lg:text-base">
            <Icon className="mx-2 size-11 lg:size-14" style={{ color: color || 'currentColor' }} />
            {name}
          </span>
        ))}
      </div>
    </MarqueeWrapper>
  )
}

export default Skills
