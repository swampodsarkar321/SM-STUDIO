import { MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { waLink } from '../lib'
export default function WhatsAppCta({
  service,
  pkg,
  label = 'Chat on WhatsApp',
}: {
  service?: string
  pkg?: string
  label?: string
}) {
  const msg = `Hello SM Studio, I'd like to ask about a project.${service ? `\nService: ${service}` : ''}${pkg ? `\nPackage: ${pkg}` : ''}`
  const href = waLink(msg)
  return href ? (
    <a className="btn-s" href={href} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={18} />
      {label}
    </a>
  ) : (
    <Link className="btn-s" to={`/contact${pkg ? `?package=${encodeURIComponent(pkg)}` : ''}`}>
      Discuss Your Project
    </Link>
  )
}
