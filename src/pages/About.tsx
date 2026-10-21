import { Link } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Compass, MessageSquare, ShieldCheck } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { tech } from '../data'

const values = [
  {
    icon: Compass,
    title: 'Practical first',
    text: 'We build what solves the problem, not what looks impressive in a portfolio. Every feature earns its place.',
  },
  {
    icon: MessageSquare,
    title: 'Clear communication',
    text: 'Plain language, honest timelines and regular updates. You never have to chase for a status update.',
  },
  {
    icon: BadgeCheck,
    title: 'Tested delivery',
    text: 'Work is checked on real screens and real flows before handover — including the boring edge cases.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest scope',
    text: 'If something is outside what we can deliver well, we say so early instead of learning on your budget.',
  },
]

export default function About() {
  return (
    <>
      <Seo
        title="About — Independent Web Development Studio in Bangladesh"
        desc="SM Studio is an independent web development studio by Swampod, building websites, business tools, apps and bots for clients in Bangladesh and worldwide."
        path="/about"
      />

      <PageHeader
        eyebrow="About"
        title="A small studio built around clear work."
        desc="SM Studio is an independent digital development studio by Swampod. We build websites, business tools, applications, bots and interactive experiences."
      />

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="prose-studio space-y-4 leading-relaxed text-slate-600 lg:col-span-3">
            <p className="text-lg text-slate-600">
              The studio exists for a simple reason: many small businesses need good digital work
              without agency overhead, unclear pricing or a chain of people between them and the
              person doing the job.
            </p>
            <p>
              So SM Studio stays intentionally small. The person who scopes the project is the
              person who designs and builds it. That keeps decisions fast, details accurate and the
              final product close to what was promised.
            </p>
            <p>
              The focus is on practical outcomes: a site that brings inquiries, a dashboard that
              saves time, a bot that removes repetitive work. If a project does not need a feature,
              it does not get built just to make the invoice bigger.
            </p>
            <p>
              Work is remote and available worldwide, with communication in English or Bengali. Most
              projects start with a short message and a conversation about what success actually
              looks like.
            </p>

            <div className="!mt-8 flex flex-wrap gap-3">
              <Link to="/portfolio" className="btn-s">
                See the demos
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link to="/contact" className="btn-p">
                Start a project
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="card">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Studio card</p>
              <dl className="mt-5 space-y-4 text-sm">
                {[
                  ['Founder', 'Swampod'],
                  ['Based in', 'Bangladesh'],
                  ['Working', 'Worldwide, remote'],
                  ['Reply target', 'Within 24 hours'],
                  ['Availability', 'Open for new projects'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <dt className="text-slate-500">{label}</dt>
                    <dd className="text-right font-medium text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 rounded-xl border border-brand-400/20 bg-brand-500/10 p-4 text-xs leading-relaxed text-brand-100">
                Best fit: small businesses, founders and creators who want a focused build with a
                direct line to the developer.
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-y border-line bg-panel/30">
        <div className="container-x">
          <SectionHeading
            eyebrow="Principles"
            title="How the studio works"
            desc="Four rules that shape every project, from a one-page site to a custom tool."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60}>
                <div className="card card-hover h-full">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <value.icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Toolkit"
            title="Tools chosen for longevity"
            desc="We use a small, stable stack. That means easier handover, cheaper maintenance and no dependency on a proprietary builder."
          />
          <div className="flex flex-wrap gap-2.5">
            {tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-ink/5 px-4 py-2 text-sm text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what you are working on"
        desc="A short description is enough to start. You will get a straight answer about fit, scope and next steps."
      />
    </>
  )
}
