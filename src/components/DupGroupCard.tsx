import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DupGroup, TendingLayer } from '@/lib/fallenLeavesData'
import { FieldNote } from '@/components/FieldNote'
import { useToast } from '@/hooks/use-toast'

interface Props {
  group: DupGroup
  layer: TendingLayer
}

export default function DupGroupCard({ group, layer }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [silenced, setSilenced] = useState<string[]>([])
  const [proposed, setProposed] = useState(false)
  const [cooloff, setCooloff] = useState(false)
  const cooloffTimer = useRef<NodeJS.Timeout | null>(null)
  const { toast } = useToast()

  const canonical = group.files.find(f => f.canonical)

  const acknowledge = () => {
    setExpanded(true)
    setSilenced(group.files.filter(f => !f.canonical).map(f => f.name))
    toast({
      title: `Duplicate signals quieted in "${group.title}"`,
      description: 'Originals untouched — only the noise is silenced',
    })
  }

  const proposeConsolidation = () => {
    setExpanded(true)
    setProposed(true)
    setCooloff(false)
  }

  const approveConsolidation = () => {
    setProposed(false)
    acknowledge()
    toast({
      title: `Consolidation complete for "${group.title}"`,
      description: 'Non-canonical copies moved to holding area — fully reversible',
    })
  }

  const initiateRelease = () => {
    setExpanded(true)
    setProposed(false)
    setCooloff(true)
    cooloffTimer.current = setTimeout(() => completeRelease(), 8000)
  }

  const cancelRelease = () => {
    if (cooloffTimer.current) clearTimeout(cooloffTimer.current)
    setCooloff(false)
    toast({
      title: 'Release cancelled',
      description: 'Everything stays exactly where it was'
    })
  }

  const completeRelease = () => {
    setCooloff(false)
    acknowledge()
    toast({
      title: `Leaves released from "${group.title}"`,
      description: 'Logged and fully reversible — nothing permanently removed',
      variant: 'destructive'
    })
  }

  return (
    <>
      <div className="grove-pile-card p-6 mb-4">
        {/* Header */}
        <div
          className="cursor-pointer"
          onClick={() => setExpanded(e => !e)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🍂</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{group.title}</h3>
                <p className="font-body text-sm text-muted-foreground">
                  {group.files.length} presences
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
              <button
                onClick={acknowledge}
                className="font-body text-xs font-semibold px-4 py-2 transition-all grove-pebble"
                style={{ background: 'rgba(122,158,126,0.1)', border: '1px solid hsl(var(--grove-sage))', color: 'hsl(var(--grove-sage))' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'hsl(var(--grove-sage))')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(122,158,126,0.1)')}>
                acknowledge
              </button>

              {layer !== 'observe' && (
                <button
                  onClick={proposeConsolidation}
                  className="font-body text-xs font-semibold px-4 py-2 transition-all grove-pebble"
                  style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid hsl(var(--grove-amber))', color: 'hsl(var(--grove-amber))' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'hsl(var(--grove-amber))')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(201,168,76,0.1)')}>
                  consolidate
                </button>
              )}

              {layer === 'release' && (
                <button
                  onClick={initiateRelease}
                  className="font-body text-xs font-semibold px-4 py-2 transition-all grove-pebble"
                  style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid hsl(var(--destructive))', color: 'hsl(var(--destructive))' }}>
                  release
                </button>
              )}

              <span className="text-muted-foreground text-lg">▼</span>
            </div>
          </div>
        </div>

        {/* File cards */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3 mb-4">
              {group.files.map(file => (
                <motion.div
                  key={file.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-background/50 p-4 grove-pebble border border-border/50">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-body font-semibold text-foreground">{file.name}</h4>
                      <p className="font-body text-sm text-muted-foreground">{file.date} · {file.size} · ⌇ {file.substrate}</p>
                    </div>

                    <div className="flex gap-2">
                      {file.canonical && (
                        <span className="font-body text-xs font-semibold px-3 py-1 grove-pebble bg-grove-sage/10 border border-grove-sage text-grove-sage">
                          canonical
                        </span>
                      )}
                      {silenced.includes(file.name) && (
                        <span className="font-body text-xs font-semibold px-3 py-1 grove-pebble bg-muted/10 border border-muted text-muted-foreground">
                          silenced
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consolidation proposal */}
        <AnimatePresence>
          {proposed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-grove-amber/5 p-6 grove-pebble border border-grove-amber/30 mb-4">
              
              <h4 className="font-display text-lg font-semibold text-foreground mb-3">Consolidation proposal</h4>
              
              <p className="font-body text-sm text-muted-foreground mb-4">
                Keep {canonical?.name} as the canonical presence.
                Move {group.files.length - 1} {group.files.length - 1 === 1 ? 'copy' : 'copies'} to a holding area.
                Nothing will be deleted. Everything remains reversible.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={approveConsolidation}
                  className="font-body text-sm font-semibold px-6 py-2 transition-all grove-pebble bg-grove-sage text-primary-foreground hover:bg-grove-sage/90">
                  approve quietly
                </button>
                <button
                  onClick={() => setProposed(false)}
                  className="font-body text-sm px-5 py-2 text-muted-foreground transition-colors hover:text-foreground grove-pebble border border-border bg-transparent">
                  not now
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cool-off zone */}
        <AnimatePresence>
          {cooloff && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-destructive/5 p-6 grove-pebble border border-destructive/30 mb-4">
              
              <h4 className="font-display text-lg font-semibold text-destructive mb-3">Deferred removal — cooling off</h4>
              
              <p className="font-body text-sm text-muted-foreground mb-3">
                Queued for release. Completes in 8 seconds. Cancel at any time.
              </p>

              <p className="font-body text-lg font-semibold text-destructive mb-4">⏳ cooling off...</p>

              <div className="w-full bg-destructive/20 h-2 grove-pebble overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-destructive"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </div>
              
              <button
                onClick={cancelRelease}
                className="font-body text-sm font-semibold px-6 py-2 transition-all grove-pebble bg-background border border-border text-foreground hover:bg-muted">
                cancel — keep everything
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FieldNote />
    </>
  )
}