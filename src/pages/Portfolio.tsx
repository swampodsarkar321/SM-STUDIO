import { useState } from 'react'
import { Info } from 'lucide-react'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/Reveal'
import CtaBand from '../components/CtaBand'
import { filters, projects } from '../data'

export default function Portfolio() {
  const [filter, setFilter] = useState('All Projects')
  const list = projects.filter((project) => filter === 'All Projects' || project.cat === filter)

  return (
    <>
      <Seo
        title="Web Design & Web App Portfolio — Live Demos"
        desc="Try live web design and web app demos: e-commerce storefront, restaurant website, business dashboard and a chatbot — built by SM Studio, Bangladesh."
        path="/portfolio"
      />

      <PageHeader
        eyebrow="Portfolio"
        title="Working demos, not mockup screenshots."
        desc="Every project below is a real, clickable build using sample data. Open a demo, test the flow and judge the quality for yourself."
      >
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/5 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            {projects.length} live demos
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/5 px-3 py-1.5">
            <Info size={14} aria-hidden="true" />
            Sample data only
          </span>
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-x">
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter projects by category"
          >
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={filter === item}
                onClick={() => setFilter(item)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  filter === item
                    ? 'border-brand-400/60 bg-brand-500/20 text-ink'
                    : 'border-line text-slate-600 hover:border-white/20 hover:text-ink'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map((project, index) => (
              <Reveal key={project.id} delay={index * 70}>
                <ProjectCard p={project} />
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <div className="card mt-8 text-center">
              <p className="font-display text-lg font-semibold">No demos in this category yet.</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Bots, Android apps and games are built on request. If you have one in mind, tell us
                the scope and we will confirm what is realistic.
              </p>
            </div>
          )}

          <p className="mt-8 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
            <Info size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
            These demos are built for demonstration. Products, prices, names and orders are
            fictional, and no data is sent to a server.
          </p>
        </div>
      </section>

      <CtaBand
        title="Want something like one of these?"
        desc="Send the demo name and what you would change. You will get a scoped estimate with a realistic timeline."
      />
    </>
  )
}
