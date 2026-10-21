import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { waLink } from '../lib'
import WhatsAppCta from './WhatsAppCta'

type CtaBandProps = {
  title?: string
  desc?: string
  note?: string
}

export default function CtaBand({
  title = 'Have a project in mind?',
  desc = 'Tell us what you are building. You will get a clear reply with questions, scope and next steps.',
  note = 'Free initial consultation · No obligation',
}: CtaBandProps) {
  return (
    <section className="container-x pb-20 md:pb-28">
      <div className="relative overflow-hidden rounded-3xl border border-brand-400/25 bg-gradient-to-br from-brand-600/25 via-panel to-panel p-8 md:p-14">
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <p className="eyebrow">Next step</p>
            <h2 className="h2 mt-4">{title}</h2>
            <p className="mt-3 leading-relaxed text-slate-600">{desc}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">{note}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-p">
              Start a project
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            {waLink('Hello SM Studio, I would like to discuss a project.') ? (
              <WhatsAppCta label="WhatsApp us" />
            ) : (
              <Link to="/portfolio" className="btn-s">
                View portfolio
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
