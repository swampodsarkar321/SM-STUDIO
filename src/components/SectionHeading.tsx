type SectionHeadingProps = {
  eyebrow?: string
  title: string
  desc?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'left',
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="h2 mt-4">{title}</h2>
      {desc && <p className="mt-4 leading-relaxed text-slate-600">{desc}</p>}
    </div>
  )
}
