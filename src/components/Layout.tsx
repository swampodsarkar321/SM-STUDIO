import { Suspense, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Facebook, Mail, Menu, MessageCircle, X, Youtube } from 'lucide-react'
import Logo from './Logo'
import { EMAIL, FB, WA, YT, waLink } from '../lib'

const nav = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Pricing', '/pricing'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const

const serviceNames = [
  'Website Development',
  'Web Applications',
  'Automation & Bots',
  'UI/UX & Redesign',
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:text-ink'
    }`

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? 'border-b border-line bg-white/85 backdrop-blur-xl' : ''
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <Link to="/" aria-label="SM Studio home" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {nav.map(([label, href]) => (
              <NavLink key={href} to={href} end={href === '/'} className={navClass}>
                {label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-p ml-3 !px-5 !py-2.5">
              Start a project
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </nav>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="flex min-h-[calc(100vh-4rem)] flex-col overflow-y-auto border-t border-line bg-white px-5 pb-8 pt-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map(([label, href]) => (
                <NavLink
                  key={href}
                  to={href}
                  end={href === '/'}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-base font-medium transition ${
                      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>
            <Link to="/contact" className="btn-p mt-4 w-full">
              Start a project
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              {waLink('Hello SM Studio, I would like to discuss a project.') && (
                <a
                  className="btn-s !px-4 !py-2"
                  href={waLink('Hello SM Studio, I would like to discuss a project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  WhatsApp
                </a>
              )}
              {EMAIL && (
                <a className="btn-s !px-4 !py-2" href={`mailto:${EMAIL}`}>
                  <Mail size={16} aria-hidden="true" />
                  Email
                </a>
              )}
            </div>

            <div className="mt-auto border-t border-line pt-5 text-xs leading-relaxed text-slate-500">
              <p className="inline-flex items-center gap-2 text-slate-600">
                <span
                  className="h-2 w-2 animate-pulseSoft rounded-full bg-mint"
                  aria-hidden="true"
                />
                Available for new projects
              </p>
              <p className="mt-2">Replies within 24 hours · Working worldwide</p>
            </div>
          </nav>
        )}
      </header>

      <main id="main" className="pt-16">
        <Suspense
          fallback={
            <div
              className="grid min-h-[60vh] place-items-center"
              role="status"
              aria-label="Loading page"
            >
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>

      <footer className="mt-24 border-t border-line bg-panel/40">
        <div className="container-x grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" aria-label="SM Studio home">
              <Logo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              Independent digital studio by Swampod. We build fast websites, useful web apps,
              automation and digital experiences for businesses and creators.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="h-2 w-2 animate-pulseSoft rounded-full bg-mint" aria-hidden="true" />
              Available for new projects
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {WA && (
                <a
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-600 transition hover:border-brand-400/50 hover:text-ink"
                  href={waLink('Hello SM Studio, I would like to discuss a project.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={16} />
                </a>
              )}
              {EMAIL && (
                <a
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-600 transition hover:border-brand-400/50 hover:text-ink"
                  href={`mailto:${EMAIL}`}
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              )}
              {FB && (
                <a
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-600 transition hover:border-brand-400/50 hover:text-ink"
                  href={FB}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
              {YT && (
                <a
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-slate-600 transition hover:border-brand-400/50 hover:text-ink"
                  href={YT}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>
          </div>

          <div className="text-sm md:col-span-3">
            <p className="font-display font-semibold text-ink">Services</p>
            <ul className="mt-4 space-y-2.5">
              {serviceNames.map((name) => (
                <li key={name}>
                  <Link className="text-slate-600 transition hover:text-ink" to="/services">
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm md:col-span-2">
            <p className="font-display font-semibold text-ink">Studio</p>
            <ul className="mt-4 space-y-2.5">
              {[
                ['About', '/about'],
                ['Portfolio', '/portfolio'],
                ['Pricing', '/pricing'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link className="text-slate-600 transition hover:text-ink" to={href}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm md:col-span-2">
            <p className="font-display font-semibold text-ink">Get in touch</p>
            <ul className="mt-4 space-y-2.5">
              {EMAIL && (
                <li>
                  <a
                    className="break-all text-slate-600 transition hover:text-ink"
                    href={`mailto:${EMAIL}`}
                  >
                    {EMAIL}
                  </a>
                </li>
              )}
              {WA && (
                <li>
                  <a
                    className="text-slate-600 transition hover:text-ink"
                    href={waLink('Hello SM Studio, I would like to discuss a project.')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp chat
                  </a>
                </li>
              )}
              <li>
                <Link className="text-slate-600 transition hover:text-ink" to="/contact">
                  Project inquiry form
                </Link>
              </li>
              <li className="text-slate-500">Replies within 24 hours</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
            <p>
              © {new Date().getFullYear()} SM Studio. All rights reserved. ·{' '}
              <Link className="transition hover:text-slate-600" to="/privacy">
                Privacy
              </Link>
            </p>
            <p>Independent studio · Bangladesh · Working worldwide</p>
          </div>
        </div>
      </footer>
    </>
  )
}
