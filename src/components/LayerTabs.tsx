import { TendingLayer } from '@/lib/fallenLeavesData'

const TABS: { id: TendingLayer; label: string }[] = [
  { id: 'observe',     label: '🌿 Observing' },
  { id: 'consolidate', label: '🪨 Consolidating' },
  { id: 'release',     label: '🍂 Releasing' },
]

export default function LayerTabs({
  active,
  onChange,
}: {
  active: TendingLayer
  onChange: (l: TendingLayer) => void
}) {
  return (
    <div className="flex gap-3 justify-center mb-8">
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className="font-body text-sm font-semibold px-6 py-2 transition-all duration-250"
          style={{
            borderRadius: '3rem',
            border: '1.5px solid',
            borderColor: active === tab.id ? 'hsl(var(--grove-moss))' : 'hsl(var(--border))',
            background: active === tab.id ? 'hsl(var(--grove-moss))' : 'transparent',
            color: active === tab.id ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}