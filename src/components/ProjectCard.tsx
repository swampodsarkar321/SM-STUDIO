import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data'

export default function ProjectCard({ p }: { p: Project }) {
  const external = p.demo?.startsWith('http')
  const initials = p.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="card card-hover group flex flex-col overflow-hidden p-0">
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${p.accent}`}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(12,18,34,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(12,18,34,.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <span className="absolute left-5 top-5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-ink/70 shadow-sm backdrop-blur">
          {p.kind}
        </span>
        <span
          className="absolute bottom-4 left-5 font-display text-5xl font-bold tracking-tight text-ink/15"
          aria-hidden="true"
        >
          {initials}
        </span>
        <span className="absolute bottom-5 right-5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] text-ink/70 shadow-sm backdrop-blur">
          Sample data
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{p.cat}</p>
            <h3 className="mt-1 font-display text-xl font-bold">{p.name}</h3>
          </div>
          {p.demo && (
            <span className="rounded-full bg-brand-500/15 p-2 text-brand-600">
              <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          )}
        </div>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.text}</p>

        <p className="mt-4 text-xs text-slate-500">{p.tech.join(' · ')}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {p.demo &&
            (external ? (
              <a
                className="btn-p !px-4 !py-2 text-xs"
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live demo
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            ) : (
              <Link className="btn-p !px-4 !py-2 text-xs" to={p.demo}>
                Live demo
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
          <Link
            className="btn-s !px-4 !py-2 text-xs"
            to={`/contact?service=${encodeURIComponent(
              p.cat === 'Web Apps' ? 'Web Applications' : 'Website Development',
            )}&similar=${encodeURIComponent(p.name)}`}
          >
            Request similar
          </Link>
        </div>
      </div>
    </article>
  )
}
