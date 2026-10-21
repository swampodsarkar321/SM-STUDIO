import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock3,
  Code2,
  Gauge,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import Seo from '../components/Seo'
import Reveal from '../components/Reveal'
import ProjectCard from '../components/ProjectCard'
import SectionHeading from '../components/SectionHeading'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import { faqs, process, projects, services, stats, tech } from '../data'

const trust = [
  'Written scope before work starts',
  'Direct communication with the developer',
  'Tested on real phone and desktop sizes',
]

export default function Home() {
  return (
    <>
      <Seo
        title="Website Development & Automation Agency in Bangladesh"
        desc="SM Studio is a web development and automation agency in Bangladesh. We build fast business websites, web apps, chatbots and online stores."
        path="/"
      />

      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="container-x relative grid items-center gap-12 py-16 md:grid-cols-2 md:py-24 lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">
                <Sparkles size={13} aria-hidden="true" />
                Independent digital studio
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
                Websites and apps that <span className="text-gradient">earn their keep.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
                SM Studio designs and builds fast, focused digital products — from landing pages and
                business sites to custom web apps, bots and automation.
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-p">
                  Start a project
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
                <Link to="/portfolio" className="btn-s">
                  Explore our work
                </Link>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <ul className="mt-8 space-y-2.5">
                {trust.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <Check size={16} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={150} className="hidden md:block">
            <div className="relative" aria-hidden="true">
              <div className="absolute -inset-4 rounded-[2rem] bg-brand-500/10 blur-2xl" />
              <div className="card relative overflow-hidden !p-0">
                <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-mint/70" />
                  <span className="ml-3 text-xs text-slate-500">studio-dashboard / overview</span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-ink">Project overview</p>
                      <p className="text-xs text-slate-500">Sample data</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-medium text-mint">
                      <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                      Live
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                    {[
                      { label: 'Performance', value: '98', Icon: Gauge },
                      { label: 'Leads', value: '+24', Icon: MessageSquare },
                      { label: 'Uptime', value: '99.9%', Icon: ShieldCheck },
                    ].map(({ label, value, Icon }) => (
                      <div key={label} className="rounded-xl border border-line bg-slate-50 p-3">
                        <Icon size={14} className="text-brand-600" />
                        <p className="mt-2 font-display text-lg font-bold text-ink">{value}</p>
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-line bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span>Visitors this week</span>
                      <span className="text-mint">+18.2%</span>
                    </div>
                    <div className="mt-4 flex h-24 items-end gap-2">
                      {[38, 62, 48, 80, 58, 92, 74].map((height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-brand-600/40 to-accent/80"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-line bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                    <Code2 size={14} className="text-brand-600" />
                    Build passed · deployed in 42s
                  </div>
                </div>
              </div>

              <div className="absolute -top-5 left-8 animate-float rounded-xl border border-line bg-panel/90 px-3.5 py-2.5 text-xs shadow-card backdrop-blur">
                <span className="inline-flex items-center gap-1.5 text-mint">
                  <CheckCircle2 size={13} /> New WhatsApp lead
                </span>
              </div>
              <div
                className="absolute -bottom-5 right-8 animate-float rounded-xl border border-line bg-panel/90 px-3.5 py-2.5 text-xs shadow-card backdrop-blur"
                style={{ animationDelay: '1.2s' }}
              >
                <span className="inline-flex items-center gap-1.5 text-brand-600">
                  <Clock3 size={13} /> Delivered on time
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="container-x relative pb-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-xs text-slate-500">
            <span className="uppercase tracking-[0.18em]">Built with</span>
            {tech.map((item) => (
              <span key={item} className="font-medium text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Services"
              title="What we build"
              desc="Small, focused services with a clear scope. If something is outside what we can deliver well, we say so early."
            />
            <Link to="/services" className="btn-ghost shrink-0">
              All services
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={index * 60}>
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="card card-hover group flex h-full flex-col"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-brand-400/20 bg-brand-500/10 text-brand-600">
                    <service.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.text}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600">
                    Request a quote
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-panel/30">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Demos you can actually click"
              desc="These are demonstration builds, not client work. Open them, try the interactions and see the quality before you hire."
            />
            <Link to="/portfolio" className="btn-ghost shrink-0">
              View portfolio
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectCard p={project} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="How we work"
            title="A clear process, no surprises"
            desc="You always know what is being built, what it costs and what happens next."
            align="center"
          />

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <Reveal key={item.step} delay={index * 70}>
                <div className="card card-hover h-full">
                  <span className="font-display text-3xl font-bold text-brand-600/25">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-panel/60 p-8 md:p-12">
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Why SM Studio</p>
              <h2 className="h2 mt-4">A small studio with a direct line to the builder</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                You are not passed between an account manager and an offshore team. The person who
                scopes your project is the person who builds it — so decisions stay fast and the
                details do not get lost.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Fixed scope and pricing',
                  'Honest timelines',
                  'Clean, handover-ready code',
                  'Support after launch',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <CheckCircle2 size={16} className="shrink-0 text-mint" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-line bg-slate-50 p-5 text-center"
                >
                  <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions, answered"
              desc="Still unsure about something? Send a message and get a straight answer."
            />
            <Link to="/contact" className="btn-s mt-6">
              Ask a question
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-3">
            <FaqList items={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
