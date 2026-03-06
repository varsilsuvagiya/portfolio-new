'use client'

import action from '@/actions/contact-form'
import { useActionState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

type ContactFormProps = {
  dict?: Record<string, string>
}

const ContactForm = ({ dict }: ContactFormProps) => {
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">{status.message}</p>
    )
  }

  return (
    <form action={formAction}>
      <Input label={dict?.namePlaceholder || "Full name"} id="name" name="name" placeholder={dict?.namePlaceholder || "Your name here"} required />
      <Input
        label={dict?.emailPlaceholder || "Email address"}
        id="email"
        type="email"
        name="email"
        placeholder={dict?.emailPlaceholder || "Your email address here"}
        required
      />
      <Input label={dict?.subjectPlaceholder || "Subject"} id="subject" name="subject" placeholder={dict?.subjectPlaceholder || "Your subject here"} />
      <Textarea
        label={dict?.messagePlaceholder || "Message"}
        id="message"
        name="message"
        placeholder={dict?.messagePlaceholder || "Your message here"}
        rows={7}
        required
      />
      {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}
      <Button text={isPending ? 'Submitting...' : (dict?.submit || 'Submit')} disabled={isPending} />
    </form>
  )
}

export default ContactForm
