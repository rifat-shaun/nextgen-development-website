import { useState, type FormEvent, type ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { FiAlertCircle, FiCheckCircle, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Select, { type OptionGroup } from '../components/Select'
import { ADDRESS, allServices, EMAIL, PERSONAL_EMAIL, PHONE, projectManagement, vision } from '../data'

const contactCards: { icon: IconType; label: string; value: string; href: string }[] = [
  { icon: FiPhone, label: 'Phone', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: FiMail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: FiMail, label: 'Personal email', value: PERSONAL_EMAIL, href: `mailto:${PERSONAL_EMAIL}` },
  {
    icon: FiMapPin,
    label: 'Office',
    value: ADDRESS,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`,
  },
]

const serviceGroups: OptionGroup[] = [
  { label: 'Real estate services', options: allServices },
  { label: 'Project management', options: projectManagement },
  { label: 'Not sure yet', options: ['Other / General enquiry'] },
]

const inputClass =
  'block w-full rounded-lg border border-[#ced4da] bg-white px-3.5 py-2.5 text-[0.95rem] text-body transition-[border-color,box-shadow] duration-150 placeholder:text-[#9aa0a6] focus:border-brand focus:shadow-[0_0_0_0.25rem_rgba(0,76,145,0.15)] focus:outline-none'

type FormState = { name: string; email: string; phone: string; service: string; message: string }

const emptyForm: FormState = { name: '', email: '', phone: '', service: '', message: '' }

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined

type Status = 'idle' | 'sending' | 'success' | 'error'

type FieldProps = {
  label: string
  htmlFor: string
  optional?: boolean
  className?: string
  children: ReactNode
}

function Field({ label, htmlFor, optional = false, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-body">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-[#9aa0a6]">(optional)</span>
        ) : (
          <span aria-hidden="true" className="ml-0.5 text-accent">
            *
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

function Contact() {
  const [searchParams] = useSearchParams()
  // Links from service pages pass ?service=<title> to pre-select it
  const requested = searchParams.get('service') ?? ''
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    service: serviceGroups.some((g) => g.options.includes(requested)) ? requested : '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const update = (key: keyof FormState) => (value: string) => setForm({ ...form, [key]: value })

  // Send the enquiry to Web3Forms, which emails it to the site owner
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: real visitors never see this checkbox, so a checked box means a bot
    const botcheck = new FormData(e.currentTarget).get('botcheck') === 'on'
    if (botcheck) return

    if (!WEB3FORMS_KEY) {
      console.error('Missing VITE_WEB3FORMS_KEY: add it to your .env file')
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New contact form submission from website',
          from_name: 'Website Contact Form',
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message,
          botcheck,
        }),
      })
      const result = await response.json().catch(() => null)

      if (response.ok && result?.success) {
        setStatus('success')
        setForm(emptyForm)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader title="Contact Us" image={vision.banner} trail={['Contact Us']} />

      <section className="bg-[#f8f9fa] py-[60px] md:py-20">
        <div className="container-bs">
          <div className="-mx-3 flex flex-wrap">
            {/* Contact details */}
            <div className="reveal mb-8 w-full px-3 lg:mb-0 lg:w-5/12 lg:pr-8">
              <h2 className="!text-[2rem]">Get in touch</h2>
              <p className="mb-6 text-base leading-[1.6] text-[#666]">
                Call, email or send us a message. We offer free, no-obligation consultations.
              </p>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-1">
                {contactCards.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    className="group flex items-center gap-4 rounded-2xl bg-white p-5 md:gap-3 md:p-4 lg:gap-4 lg:p-5 shadow-[0_2px_15px_rgba(0,0,0,0.07)] transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_10px_25px_rgba(0,76,145,0.12)]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-lg text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-[#6c757d]">{label}</span>
                      <span className="block font-semibold text-body [overflow-wrap:anywhere] md:text-[0.95rem] lg:text-base">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Enquiry form */}
            <div className="reveal flex w-full px-3 lg:w-7/12">
              <div className="flex w-full flex-col rounded-2xl bg-white p-6 shadow-[0_2px_15px_rgba(0,0,0,0.07)] md:p-8">
                <div role="status" aria-live="polite">
                  {status === 'success' && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-brand/20 bg-brand/5 p-4 text-sm text-brand">
                      <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />
                      <span>Thank you! Your message has been sent.</span>
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-brand/20 bg-brand/5 p-4 text-sm text-brand">
                      <FiAlertCircle className="mt-0.5 shrink-0 text-lg" />
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid flex-1 gap-5 md:grid-cols-2 md:grid-rows-[auto_auto_1fr_auto]"
                >
                  <input
                    type="checkbox"
                    name="botcheck"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                  <Field label="Full name" htmlFor="name">
                    <input
                      id="name"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => update('name')(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Email" htmlFor="email">
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => update('email')(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Phone" htmlFor="phone">
                    <input
                      id="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => update('phone')(e.target.value)}
                      className={inputClass}
                    />
                  </Field>

                  <Field label="Service" htmlFor="service" optional>
                    <Select
                      id="service"
                      value={form.service}
                      onChange={update('service')}
                      groups={serviceGroups}
                      placeholder="Select a service"
                      className={inputClass}
                    />
                  </Field>

                  <div className="flex flex-col md:col-span-2">
                    <Field label="Message" htmlFor="message" optional className="flex flex-1 flex-col">
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => update('message')(e.target.value)}
                        className={`${inputClass} min-h-[140px] flex-1 resize-y`}
                      />
                    </Field>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="rounded-full bg-brand px-7 py-3 font-medium text-white shadow-[0_6px_18px_rgba(0,76,145,0.25)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
