import { Plus } from 'lucide-react'
import type { Faq } from '../data'

export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group card overflow-hidden p-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-left font-medium marker:hidden [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <Plus
              size={18}
              className="shrink-0 text-brand-600 transition duration-200 group-open:rotate-45"
              aria-hidden="true"
            />
          </summary>
          <p className="border-t border-line px-5 pb-5 pt-4 text-sm leading-relaxed text-slate-600">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  )
}
