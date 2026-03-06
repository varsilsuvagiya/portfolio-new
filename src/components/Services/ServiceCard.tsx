import Image from 'next/image'
import ScrollReveal from '../UI/ScrollReveal'

interface ServiceCardTypes {
  icon: string
  title: string
  shortDescription: string
  index: number
}

const ServiceCard: React.FC<ServiceCardTypes> = ({ title, shortDescription, icon, index }) => {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-secondary border-border flex flex-col items-center rounded-[14px] border p-5 h-full">
        <Image src={icon} alt={title} className="my-1 size-14" />
        <h5 className="text-accent mt-2 mb-5 text-center text-base font-semibold">{title}</h5>
        <div className="bg-primary rounded-2xl p-4 flex-grow w-full">
          <p className="text-primary-content text-center text-sm font-normal">{shortDescription}</p>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default ServiceCard
