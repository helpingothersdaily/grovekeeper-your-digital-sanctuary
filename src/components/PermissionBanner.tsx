const PILLS = [
  { label: '✓ Read',               style: 'bg-grove-sage/10 border-grove-sage text-grove-sage' },
  { label: 'Write (opt-in)',        style: 'bg-muted/10 border-border text-muted-foreground' },
  { label: '✗ Delete (never silent)', style: 'bg-destructive/5 border-destructive/30 text-destructive/60' },
]

export default function PermissionBanner() {
  return (
    <div className="grove-glass mx-auto my-6 px-8 py-5 flex items-center justify-between gap-4 flex-wrap max-w-4xl"
      style={{ borderRadius: '2rem' }}>
      <p className="font-body text-sm text-muted-foreground">
        <strong className="text-foreground font-semibold">Current stewardship level:</strong>{' '}
        Read-only observation. No files will be moved or changed without your explicit approval.
      </p>
      <div className="flex gap-2 flex-wrap">
        {PILLS.map(p => (
          <span key={p.label}
            className={`font-body text-xs font-semibold px-3 py-1 rounded-full border ${p.style}`}>
            {p.label}
          </span>
        ))}
      </div>
    </div>
  )
}
