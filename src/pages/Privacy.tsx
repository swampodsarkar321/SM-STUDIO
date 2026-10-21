import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { EMAIL } from '../lib'

const sections = [
  {
    title: 'What we collect',
    body: 'When you send the inquiry form, we receive the details you enter: your name, email or WhatsApp number, country, service, budget range, timeline and project description.',
  },
  {
    title: 'How it is used',
    body: 'Your details are used only to reply to your inquiry, discuss scope and prepare a quote. We do not sell your data or add you to a marketing list.',
  },
  {
    title: 'How it is sent',
    body: 'Depending on how this site is configured, your inquiry may be submitted to a form provider, opened as an email draft in your own mail app, or sent through WhatsApp. In each case the message is handled by that service as well.',
  },
  {
    title: 'Storage and retention',
    body: 'Inquiries are kept only as long as needed to respond and manage a potential project. You can ask for your inquiry to be deleted at any time.',
  },
  {
    title: 'Cookies and analytics',
    body: 'This site does not set advertising or tracking cookies by default. If privacy-friendly analytics are added later, this page will be updated to describe them.',
  },
  {
    title: 'Third-party services',
    body: 'The site is hosted on Vercel and loads fonts from Google Fonts. Those providers may process technical information such as your IP address to deliver the site and fonts.',
  },
  {
    title: 'Your choices',
    body: 'You can ask what information we hold about you, request a correction, or ask for it to be deleted. Use the contact page or email us and we will respond within a reasonable time.',
  },
]

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy"
        desc="How SM Studio handles the information you submit through the contact form, email or WhatsApp."
        path="/privacy"
      />

      <PageHeader
        eyebrow="Privacy"
        title="How your information is handled."
        desc="A short, plain-language policy covering the contact form and the limited data this site processes."
      />

      <section className="section">
        <div className="container-x max-w-3xl">
          <p className="text-sm text-slate-500">Last updated: October 2026</p>

          <div className="mt-8 space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display text-xl font-semibold">{section.title}</h2>
                <p className="mt-2 leading-relaxed text-slate-600">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="card mt-10">
            <h2 className="font-display text-lg font-semibold">Questions about privacy?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {EMAIL
                ? 'Email us and we will get back to you.'
                : 'Send a message through the contact page and we will get back to you.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-p !px-5 !py-2.5 text-sm">
                Contact us
              </Link>
              {EMAIL && (
                <a href={`mailto:${EMAIL}`} className="btn-s !px-5 !py-2.5 text-sm">
                  {EMAIL}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
