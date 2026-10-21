import { Link } from 'react-router-dom'
import { ArrowRight, Check, Info, Sparkles, X } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import FaqList from '../components/FaqList'
import CtaBand from '../components/CtaBand'
import { faqs, plans } from '../data'

const addons = [
  {
    title: 'Extra pages',
    text: 'Additional pages or sections quoted per page, with the same responsive treatment.',
  },
  {
    title: 'Content support',
    text: 'Help structuring your copy and sourcing suitable placeholder imagery.',
  },
  {
    title: 'Maintenance',
    text: 'Optional monthly updates, backups and small content changes after launch.',
  },
  {
    title: 'Analytics setup',
    text: 'Privacy-friendly analytics and a simple dashboard so you can see what is working.',
  },
]

export default function Pricing() {
  return (
    <>
      <Seo
        title="Website Price in Bangladesh — Starting Costs & Plans"
        desc="Website development prices in Bangladesh: starting costs for landing pages, business websites, e-commerce stores and custom web apps from SM Studio."
        path="/pricing"
      />

      <PageHeader
        eyebrow="Pricing"
        title="Clear starting prices, scoped in writing."
        desc="The numbers below are starting points, not hidden final bills. After a short conversation you get a fixed quote based on the actual scope."
      >
        <div className="flex flex-wrap gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/5 px-3 py-1.5">
            <Check size={14} className="text-mint" aria-hidden="true" />
            No hidden fees
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/5 px-3 py-1.5">
            <Check size={14} className="text-mint" aria-hidden="true" />
            Fixed quote before work
          </span>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-x grid gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.id} delay={index * 70}>
              <article
                className={`relative flex h-full flex-col rounded-2xl border p-7 ${
                  plan.featured
                    ? 'border-brand-400/50 bg-gradient-to-b from-brand-600/20 to-panel shadow-glow'
                    : 'border-line bg-panel/60'
                }`}
              >
                {plan.featured && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink">
                    <Sparkles size={11} aria-hidden="true" />
                    Most popular
                  </span>
                )}

                <h2 className="pr-24 font-display text-lg font-semibold">{plan.id}</h2>
                <p className="mt-1 text-sm text-slate-600">{plan.tagline}</p>

                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-slate-500">
                  Starting from
                </p>
                <p className="mt-1 font-display text-4xl font-bold text-ink">{plan.price}</p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6 text-sm">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-slate-600">
                      <Check size={15} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-7">
                  <Link
                    to={`/contact?package=${encodeURIComponent(plan.id)}`}
                    className={`w-full ${plan.featured ? 'btn-p' : 'btn-s'}`}
                  >
                    Get a custom quote
                    <ArrowRight size={15} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="container-x mt-6">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-panel/40 p-5 text-sm text-slate-600">
            <Info size={16} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
            <p>
              Domain, hosting, paid APIs, payment gateway charges and major scope changes are
              excluded unless agreed in writing. Each package includes a fixed number of revision
              rounds — revisions are limited, not unlimited.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-y border-line bg-panel/30">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Add-ons"
              title="Optional extras, quoted separately"
              desc="Only pay for what the project actually needs. Each add-on is confirmed before it is started."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {addons.map((item) => (
                <div key={item.title} className="card">
                  <h3 className="font-display text-sm font-semibold">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card h-fit">
            <h2 className="font-display text-lg font-semibold">How payment works</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {[
                [
                  'Deposit to start',
                  'A portion of the agreed price starts the project and reserves the schedule.',
                ],
                [
                  'Milestones for larger builds',
                  'Bigger projects are split into clear stages, each paid on completion.',
                ],
                [
                  'Final payment on delivery',
                  'The remainder is due when the finished work is handed over.',
                ],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">{title}</p>
                    <p className="mt-1 text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line pt-5">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Not included</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {[
                  'Domain and hosting fees',
                  'Third-party subscriptions',
                  'Unlimited revisions',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <X size={14} className="shrink-0 text-rose-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="FAQ"
              title="Pricing questions"
              desc="If your question is not here, send it through the contact page."
            />
          </div>
          <div className="lg:col-span-3">
            <FaqList items={faqs.slice(1, 5)} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Get a fixed quote for your project"
        desc="Share the goal and features you need. You will receive a written scope, price and timeline."
      />
    </>
  )
}
