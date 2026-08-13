interface SectionEyebrowProps {
  ref: string
  children: React.ReactNode
}

// A spec-reference eyebrow — the § marker encodes a real section index,
// echoing the "datasheet" language used across the site.
export function SectionEyebrow({ ref, children }: SectionEyebrowProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono-label text-accent">{ref}</span>
      <span className="h-px w-8 bg-line" aria-hidden />
      <span className="mono-label">{children}</span>
    </div>
  )
}
