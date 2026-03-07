import {
  JavaScriptIcon,
  NextjsIcon,
  NodejsIcon,
  ReactIcon,
  TailwindCSS,
  TypescriptIcon,
} from '@/utils/icons'
import { SiFigma, SiLaravel, SiMongodb, SiPython } from 'react-icons/si'
import SectionHeading from '../SectionHeading/SectionHeading'
import ServiceCard from './ServiceCard'
import { Dictionary, Service } from '@/lib/types'

type ServiceSectionProps = {
  dict: Dictionary['services']
  data: Service[]
}

const iconMap: Record<string, React.ElementType> = {
  JavaScriptIcon,
  ReactIcon,
  NodejsIcon,
  NextjsIcon,
  SiPython,
  SiLaravel,
  SiMongodb,
  SiFigma,
  TypescriptIcon,
  TailwindCSS,
}

const ServiceSection = ({ dict, data }: ServiceSectionProps) => {
  return (
    <section id="services" className="my-14">
      <SectionHeading
        title={`// ${dict.title}`}
        subtitle={dict.subtitle}
      />

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 md:mt-[3.75rem] md:grid-cols-3">
        {data.map((service, index) => (
          <ServiceCard
            key={index}
            icon={iconMap[service.icon] || JavaScriptIcon}
            title={service.title}
            shortDescription={service.shortDescription}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default ServiceSection
