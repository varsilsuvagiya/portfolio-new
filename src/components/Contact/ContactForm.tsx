'use client'

import action from '@/actions/contact-form'
import type { Dictionary } from '@/dictionaries'
import { useActionState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = ({ dict }: { dict: Dictionary['contact'] }) => {
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p role="status" className="text-accent text-2xl font-medium">
        {status.message}
      </p>
    )
  }

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <Input label={dict.namePlaceholder} id="name" name="name" autoComplete="name" required />
      <Input label={dict.emailPlaceholder} id="email" type="email" name="email" autoComplete="email" required />
      <Input label={dict.subjectPlaceholder} id="subject" name="subject" required className="sm:col-span-2" />
      <Textarea label={dict.messagePlaceholder} id="message" name="message" rows={6} required className="sm:col-span-2" />
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button text={isPending ? dict.submitting : dict.submit} disabled={isPending} />
        <p role="status" aria-live="polite" className="text-base font-medium text-red-500">
          {status && !status.success ? status.message : ''}
        </p>
      </div>
    </form>
  )
}

export default ContactForm
