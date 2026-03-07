import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import ScrollReveal from '../UI/ScrollReveal'

interface ServiceCardTypes {
  icon: React.ElementType | string | StaticImport
  title: string
  shortDescription: string
  index: number
}

const ServiceCard: React.FC<ServiceCardTypes> = ({
  title,
  shortDescription,
  icon: Icon,
  index,
}) => {
  const isComponent = typeof Icon === 'function'

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="bg-secondary border-border flex h-full flex-col items-center rounded-[14px] border p-5">
        {isComponent ? (
          <div className="my-1 flex size-14 items-center justify-center">
            <Icon className="text-accent size-10" />
          </div>
        ) : (
          <Image src={Icon} alt={title} className="my-1 size-14" />
        )}
        <h5 className="text-accent mt-2 mb-5 text-center text-base font-semibold">{title}</h5>
        <div className="bg-primary w-full flex-grow rounded-2xl p-4">
          <p className="text-primary-content text-center text-sm font-normal">{shortDescription}</p>
        </div>
      </div>
    </ScrollReveal>
  )
}

export default ServiceCard
