import { useState } from 'react'
import { motion } from 'framer-motion'
import { DUP_DATA, TendingLayer } from '@/lib/fallenLeavesData'
import PermissionBanner from '@/components/PermissionBanner'
import LayerTabs from '@/components/LayerTabs'
import DupGroupCard from '@/components/DupGroupCard'

export default function FallenLeaves() {
  const [layer, setLayer] = useState<TendingLayer>('observe')

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-14">
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
            Fallen Leaves
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base sm:text-lg text-muted-foreground">
            Duplicates aren&apos;t errors — they&apos;re context. GroveKeeper groups them quietly.
            <br className="hidden sm:block" />
            You decide what happens next, if anything at all.
          </p>
        </motion.header>

        <div className="mt-8">
          <PermissionBanner />
        </div>

        <div className="mt-6">
          <LayerTabs active={layer} onChange={setLayer} />
        </div>

        <section className="mt-2" aria-label="Duplicate groups">
          {DUP_DATA.map((group, i) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <DupGroupCard group={group} layer={layer} />
            </motion.div>
          ))}
        </section>
      </section>
    </main>
  )
}
