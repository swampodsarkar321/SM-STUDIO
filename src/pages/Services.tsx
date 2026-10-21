import { Link } from 'react-router-dom'
import { ArrowRight, Check, Gauge, Handshake, MonitorSmartphone, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import { faqs, process, services } from '../data'

const included = [
  {
    icon: MonitorSmartphone,
    title: 'Responsive by default',
    text: 'Layouts are checked on phones, tablets and desktops before delivery — not after launch.',
  },
  {
    icon: Gauge,
    title: 'Performance minded',
    text: 'Lean builds, optimised images and sensible code splitting keep pages quick to load.',
  },
  {
    icon: ShieldCheck,
    title: 'Accessible basics',
    text: 'Keyboard support, focus states, readable contrast and semantic markup are part of the build.',
  },
  {
    icon: Handshake,
    title: 'Clean handover',
    text: 'You get the source code, setup notes and a walkthrough so you are never locked in.',
  },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Web Development & Automation Services in Bangladesh"
        desc="Website development, custom web applications, business automation, chatbots and UI/UX redesign services from SM Studio, based in Bangladesh."
        path="/services"
      />

      <PageHeader
        eyebrow="Services"
        title="Design, build and automate the parts that matter."
        desc="Every service is scoped around a real outcome. Capabilities are confirmed before work begins, so you know what is realistic and what it costs."
      >
        <Link to="/contact" className="btn-p">
          Discuss your project
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </PageHeader>

      <section className="section">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <article className="card card-hover flex h-full flex-col">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/20 bg-brand-500/10 text-brand-600">
                    <service.icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-semibold">{service.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.text}</p>
                  </div>
                </div>

                <ul className="mt-5 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check size={14} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="btn-ghost mt-6"
                >
                  Request a quote
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section border-y border-line bg-panel/30">
        <div className="container-x">
          <SectionHeading
            eyebrow="Standards"
            title="Included in every build"
            desc="These are not paid add-ons. They are part of how a project leaves the studio."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map((item, index) => (
              <Reveal key={item.title} delay={index * 60}>
                <div className="card card-hover h-full">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <item.icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Process"
            title="From first message to launch"
            desc="A simple four-step process that keeps the scope and the budget visible."
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <li key={item.step}>
                <Reveal delay={index * 60}>
                  <div className="card card-hover h-full">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-500/15 text-xs font-bold text-brand-600">
                        {item.step}
                      </span>
                      <span className="h-px flex-1 bg-line" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Good to know"
              title="Before you hire"
              desc="Common questions about scope, pricing and delivery."
            />
          </div>
          <div className="lg:col-span-3">
            <FaqList items={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which service fits?"
        desc="Describe the problem in a few sentences. You will get a recommendation, not a sales pitch."
      />
    </>
  )
}
