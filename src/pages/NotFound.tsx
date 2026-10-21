import { Link } from 'react-router-dom'
import { ArrowLeft, Compass } from 'lucide-react'
import Seo from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        desc="The page you were looking for does not exist. Return to SM Studio home or browse the portfolio."
        path="/404"
      />

      <section className="container-x relative overflow-hidden py-24 text-center md:py-32">
        <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <p className="font-display text-7xl font-bold text-gradient md:text-9xl">404</p>
          <h1 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            This page does not exist.
          </h1>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
            The link may be old or mistyped. Head back to the home page, or browse the working demos
            in the portfolio.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-p">
              <ArrowLeft size={16} aria-hidden="true" />
              Back home
            </Link>
            <Link to="/portfolio" className="btn-s">
              <Compass size={16} aria-hidden="true" />
              View portfolio
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
