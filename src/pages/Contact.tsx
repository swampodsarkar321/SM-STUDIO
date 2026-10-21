import { useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, CheckCircle2, Clock3, Mail, MessageCircle, Send } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import FaqList from '../components/FaqList'
import { EMAIL, FORM_ENDPOINT, WA, mailLink, waLink } from '../lib'
import { budgets, faqs, plans, services, timelines } from '../data'

type FormValues = {
  name: string
  contact: string
  country: string
  service: string
  budget: string
  timeline: string
  desc: string
}

type Status = 'idle' | 'ready' | 'sending' | 'sent' | 'error'

const emptyErrors: Record<string, string> = {}

export default function Contact() {
  const [params] = useSearchParams()
  const [values, setValues] = useState<FormValues>({
    name: '',
    contact: '',
    country: '',
    service:
      params.get('service') || (params.get('package') ? `Package: ${params.get('package')}` : ''),
    budget: '',
    timeline: '',
    desc: params.get('similar')
      ? `I would like something similar to ${params.get('similar')}.\n`
      : '',
  })
  const [errors, setErrors] = useState<Record<string, string>>(emptyErrors)
  const [status, setStatus] = useState<Status>('idle')
  const [sendError, setSendError] = useState('')

  const set = (key: keyof FormValues) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [key]: event.target.value }))
    if (status === 'ready' || status === 'sent' || status === 'error') setStatus('idle')
  }

  const message = `New inquiry for SM Studio
Name: ${values.name}
Contact: ${values.contact}
Country: ${values.country}
Service: ${values.service}
Budget: ${values.budget}
Timeline: ${values.timeline}
Details: ${values.desc}`

  const whatsappHref = waLink(message)
  const emailHref = mailLink(`Project inquiry: ${values.service}`, message)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next: Record<string, string> = {}
    if (values.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(values.contact) && values.contact.replace(/\D/g, '').length < 8) {
      next.contact = 'Enter a valid email address or WhatsApp number.'
    }
    if (!values.country.trim()) next.country = 'Enter your country.'
    if (!values.service) next.service = 'Choose a service.'
    if (values.desc.trim().length < 10) {
      next.desc = 'Describe your project in at least 10 characters.'
    }

    setErrors(next)
    if (Object.keys(next).length > 0) {
      setStatus('idle')
      return
    }

    if (!FORM_ENDPOINT) {
      setStatus('ready')
      return
    }

    setStatus('sending')
    setSendError('')
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, message }),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setStatus('sent')
    } catch {
      setStatus('error')
      setSendError('The message could not be sent right now. Please use WhatsApp or email below.')
    }
  }

  const field = (key: string, label: string, children: ReactNode) => (
    <div>
      <label htmlFor={key} className="mb-1.5 block text-sm font-medium text-slate-600">
        {label}
      </label>
      {children}
      {errors[key] && (
        <p id={`${key}-error`} role="alert" className="mt-1.5 text-xs text-rose-300">
          {errors[key]}
        </p>
      )}
    </div>
  )

  const inputProps = (key: keyof FormValues) => ({
    id: key,
    value: values[key],
    onChange: set(key),
    className: 'inp',
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  })

  return (
    <>
      <Seo
        title="Contact — Hire a Web Developer in Bangladesh"
        desc="Start your website or automation project with SM Studio. Send a short brief and get a reply within one working day with scope, price and next steps."
        path="/contact"
      />

      <PageHeader
        eyebrow="Contact"
        title="Tell us what you want to build."
        desc="A few sentences are enough. You will get a reply within one working day with questions and a clear next step."
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-display text-xl font-semibold">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {[
                [
                  'You send the brief',
                  'Use the form, WhatsApp or email. No account or payment needed.',
                ],
                [
                  'We reply with questions',
                  'Expect a response within 24 hours, usually much sooner.',
                ],
                [
                  'You get a written quote',
                  'Scope, price, timeline and what is excluded — all in writing.',
                ],
              ].map(([title, text], index) => (
                <li key={title} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ink">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 space-y-2">
              {whatsappHref && (
                <a
                  className="btn-s w-full"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              )}
              {EMAIL && (
                <a className="btn-s w-full" href={`mailto:${EMAIL}`}>
                  <Mail size={16} aria-hidden="true" />
                  {EMAIL}
                </a>
              )}
              {!WA && !EMAIL && import.meta.env.DEV && (
                <p className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-xs leading-relaxed text-amber-800">
                  Dev note: direct contact details are not configured yet. Add
                  `VITE_WHATSAPP_NUMBER` or `VITE_CONTACT_EMAIL` to enable them.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-start gap-0.5 rounded-xl border border-line bg-panel/40 p-4 text-xs leading-relaxed text-slate-600">
              <Clock3
                size={14}
                className="mr-2 mt-0.5 shrink-0 text-brand-600"
                aria-hidden="true"
              />
              Typical reply time: under 24 hours. Your details are only used to respond to this
              inquiry.
            </div>
          </div>

          <form onSubmit={submit} noValidate className="card space-y-4 lg:col-span-3">
            {field(
              'name',
              'Full name',
              <input {...inputProps('name')} autoComplete="name" placeholder="Your name" />,
            )}
            {field(
              'contact',
              'Email or WhatsApp number',
              <input
                {...inputProps('contact')}
                autoComplete="email"
                placeholder="you@example.com or +8801XXXXXXXXX"
              />,
            )}
            {field(
              'country',
              'Country',
              <input
                {...inputProps('country')}
                autoComplete="country-name"
                placeholder="Bangladesh"
              />,
            )}
            {field(
              'service',
              'Service required',
              <select {...inputProps('service')}>
                <option value="">Select a service…</option>
                {services.map((service) => (
                  <option key={service.id}>{service.title}</option>
                ))}
                {plans.map((plan) => (
                  <option key={plan.id}>{`Package: ${plan.id}`}</option>
                ))}
                {values.service &&
                  ![
                    ...services.map((service) => service.title),
                    ...plans.map((plan) => `Package: ${plan.id}`),
                  ].includes(values.service) && <option>{values.service}</option>}
              </select>,
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                'budget',
                'Budget range',
                <select {...inputProps('budget')}>
                  <option value="">Select a range…</option>
                  {budgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>,
              )}
              {field(
                'timeline',
                'Expected timeline',
                <select {...inputProps('timeline')}>
                  <option value="">Select a timeline…</option>
                  {timelines.map((timeline) => (
                    <option key={timeline}>{timeline}</option>
                  ))}
                </select>,
              )}
            </div>

            {field(
              'desc',
              'Project description',
              <textarea
                {...inputProps('desc')}
                rows={5}
                placeholder="What are you building, who is it for, and what should it achieve?"
              />,
            )}

            <button className="btn-p w-full" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Prepare my inquiry'}
              <Send size={15} aria-hidden="true" />
            </button>

            <p className="text-center text-xs text-slate-500">
              By sending this form you agree to be contacted about your inquiry. No newsletter, no
              spam.
            </p>

            {status === 'ready' && (
              <div
                role="status"
                className="rounded-xl border border-brand-400/40 bg-brand-500/10 p-4 text-sm"
              >
                <p className="font-medium text-ink">Your inquiry is ready, but not sent yet.</p>
                <p className="mt-1 text-slate-600">
                  This site has no form server configured. Choose a method below and send the
                  message from your app.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {whatsappHref && (
                    <a
                      className="btn-p !px-4 !py-2"
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open WhatsApp
                    </a>
                  )}
                  {emailHref && (
                    <a className="btn-s !px-4 !py-2" href={emailHref}>
                      Open email draft
                    </a>
                  )}
                </div>
                {!whatsappHref && !emailHref && (
                  <p className="mt-3 text-amber-700">
                    {import.meta.env.DEV
                      ? 'Contact details are not configured. Add VITE_WHATSAPP_NUMBER or VITE_CONTACT_EMAIL to enable sending.'
                      : 'Direct contact options are unavailable right now. Please try again later.'}
                  </p>
                )}
              </div>
            )}

            {status === 'sent' && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-xl border border-mint/30 bg-mint/10 p-4 text-sm text-mint"
              >
                <CheckCircle2 size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>Inquiry sent. You will get a reply within one working day.</p>
              </div>
            )}

            {status === 'error' && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" aria-hidden="true" />
                <p>{sendError}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2 mt-4">Before you send</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Short answers to the questions that come up most often.
            </p>
          </div>
          <div className="lg:col-span-3">
            <FaqList items={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  )
}
