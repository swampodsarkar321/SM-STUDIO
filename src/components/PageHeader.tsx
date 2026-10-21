import type { ReactNode } from 'react'

type PageHeaderProps = {
  eyebrow: string
  title: string
  desc: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, desc, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container-x relative py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{desc}</p>
        {children && <div className="mt-7">{children}</div>}
      </div>
    </header>
  )
}
