export default function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient shadow-glow">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <path
            d="M43 22c0-4.4-4.4-7.5-10.4-7.5S22 17.3 22 22.2c0 4.4 3.4 6.6 8.6 7.7l4.2.9c3.4.7 5 2 5 4.2 0 2.8-2.9 4.6-7.2 4.6-4.7 0-7.8-2.1-8.1-5.6"
            fill="none"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="47" cy="17" r="3.5" fill="white" opacity=".85" />
        </svg>
      </span>
      {withText && (
        <span className="font-display text-lg font-bold tracking-tight text-ink">SM Studio</span>
      )}
    </span>
  )
}
