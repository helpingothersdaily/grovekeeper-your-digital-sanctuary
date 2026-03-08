import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ArrowLeft } from "lucide-react";

/* ─── Reusable scroll-reveal section ─── */
const NarrativeSection = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.section
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className={`min-h-[70vh] flex items-center justify-center px-6 ${className}`}
  >
    {children}
  </motion.section>
);

/* ─── Floating particle ─── */
const Particle = ({
  x,
  y,
  size,
  color,
  delay = 0,
}: {
  x: string;
  y: string;
  size: number;
  color: string;
  delay?: number;
}) => (
  <motion.div
    className={`absolute rounded-full ${color}`}
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -10, 0], x: [0, 5, -3, 0] }}
    transition={{
      duration: 8 + delay * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

/* ─── Drift dots (visual metaphor for items) ─── */
const DriftItem = ({
  label,
  type,
  x,
  y,
  delay,
}: {
  label: string;
  type: "photo" | "note" | "doc";
  x: string;
  y: string;
  delay: number;
}) => {
  const colors = {
    photo: "bg-grove-sage/15 border-grove-sage/20",
    note: "bg-grove-amber/15 border-grove-amber/20",
    doc: "bg-grove-golden/15 border-grove-golden/20",
  };

  return (
    <motion.div
      className={`absolute ${colors[type]} border rounded-xl px-3 py-1.5 font-body text-xs text-muted-foreground`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -6, 0], x: [0, 4, -2, 0] }}
      transition={{
        duration: 7 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {label}
    </motion.div>
  );
};

const HowItTends = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.06, 0.03]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient living background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: bgOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-grove-sage/30 via-transparent to-grove-amber/20" />
      </motion.div>

      <Particle x="5%" y="10%" size={60} color="bg-grove-sage/4" delay={0} />
      <Particle x="80%" y="20%" size={40} color="bg-grove-amber/5" delay={1.5} />
      <Particle x="90%" y="50%" size={50} color="bg-grove-golden/4" delay={3} />
      <Particle x="15%" y="70%" size={30} color="bg-grove-sage/5" delay={2} />

      {/* Back button */}
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 font-body text-sm text-muted-foreground/60 hover:text-muted-foreground transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4" />
        Return
      </motion.button>

      {/* ─── 1. Opening Orientation ─── */}
      <NarrativeSection className="pt-24">
        <div className="max-w-lg text-center">
          <motion.p
            className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground/50 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            How GroveKeeper Tends
          </motion.p>
          <h1 className="font-display text-3xl md:text-[2.75rem] font-medium text-foreground leading-snug mb-6">
            Your digital life already has patterns.
          </h1>
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            GroveKeeper learns them quietly, watching before it ever moves.
          </p>
        </div>
      </NarrativeSection>

      {/* ─── 2. Observation Before Action ─── */}
      <NarrativeSection>
        <div className="max-w-2xl w-full">
          <div className="max-w-md mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
              First, it observes.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Photos, notes, documents—each resting where they landed. GroveKeeper notices connections between them but changes nothing. It observes the shape of your days without imposing structure.
            </p>
          </div>

          {/* Visual: floating separate items */}
          <div className="relative h-48 md:h-64">
            <DriftItem label="vacation photo" type="photo" x="5%" y="20%" delay={0} />
            <DriftItem label="meeting notes" type="note" x="35%" y="55%" delay={1.2} />
            <DriftItem label="receipt.pdf" type="doc" x="65%" y="15%" delay={0.6} />
            <DriftItem label="voice memo" type="note" x="20%" y="75%" delay={2} />
            <DriftItem label="sketch.png" type="photo" x="75%" y="65%" delay={1.8} />
            <DriftItem label="journal entry" type="note" x="50%" y="35%" delay={0.9} />
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 3. Natural Clustering ─── */}
      <NarrativeSection>
        <div className="max-w-2xl w-full">
          <div className="max-w-md ml-auto text-right mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
              Then, things find each other.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Related items drift closer—not snapping into folders, but gathering like leaves settling after wind. Clusters form by feeling and context, and they shift as your life does.
            </p>
          </div>

          {/* Visual: items closer together */}
          <div className="relative h-48 md:h-56">
            <motion.div
              className="absolute left-[10%] top-[30%] flex gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              <span className="bg-grove-sage/12 border border-grove-sage/15 rounded-xl px-3 py-1.5 font-body text-xs text-muted-foreground">vacation photo</span>
              <span className="bg-grove-sage/12 border border-grove-sage/15 rounded-xl px-3 py-1.5 font-body text-xs text-muted-foreground">beach sunset</span>
            </motion.div>
            <motion.div
              className="absolute right-[10%] top-[50%] flex gap-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.7 }}
            >
              <span className="bg-grove-amber/12 border border-grove-amber/15 rounded-xl px-3 py-1.5 font-body text-xs text-muted-foreground">meeting notes</span>
              <span className="bg-grove-golden/12 border border-grove-golden/15 rounded-xl px-3 py-1.5 font-body text-xs text-muted-foreground">project draft</span>
            </motion.div>
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 4. Cross-Media Understanding ─── */}
      <NarrativeSection>
        <div className="max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
            Meaning lives across formats.
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-12">
            A photograph, a journal entry, and a saved article can all belong to the same moment. GroveKeeper sees the thread between them—not by file type, but by what they mean to you.
          </p>

          {/* Visual: connected items with shared glow */}
          <div className="relative h-40 flex items-center justify-center gap-6">
            {["a photo", "a note", "a document"].map((item, i) => (
              <motion.div
                key={item}
                className="bg-card/80 border border-border/40 rounded-2xl px-5 py-3 font-body text-sm text-muted-foreground relative"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.2 }}
              >
                {item}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-grove-golden/20"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 5. Life Chapters ─── */}
      <NarrativeSection>
        <div className="max-w-2xl w-full">
          <div className="max-w-md mb-14">
            <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
              Chapters emerge on their own.
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              You don't have to name them. Time, place, and feeling weave themselves into quiet groupings—seasons of your life that surface naturally and can fade just as gently.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "That summer",
              "The move",
              "Early mornings",
              "Healing year",
              "Side project",
            ].map((chapter, i) => (
              <motion.span
                key={chapter}
                className="bg-card/60 border border-border/30 rounded-full px-5 py-2.5 font-body text-sm text-muted-foreground/70"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
              >
                {chapter}
              </motion.span>
            ))}
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 6. Gentle Deduplication ─── */}
      <NarrativeSection>
        <div className="max-w-lg text-center">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
            Nothing is removed without your knowing.
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-12">
            When duplicates appear, they rest side by side—one fading gently, waiting for your word. Release is always optional. Care is always reversible.
          </p>

          {/* Visual: duplicate pair */}
          <div className="flex items-center justify-center gap-4">
            <motion.div
              className="bg-card border border-border/50 rounded-2xl px-6 py-4 font-body text-sm text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              sunset.jpg
            </motion.div>
            <motion.div
              className="bg-card border border-border/30 rounded-2xl px-6 py-4 font-body text-sm text-muted-foreground/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              sunset (copy).jpg
            </motion.div>
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 7. Two Ways to Tend ─── */}
      <NarrativeSection>
        <div className="max-w-xl text-center">
          <h2 className="font-display text-2xl md:text-3xl font-medium text-foreground mb-4">
            Two postures, one grove.
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            Some days you sit with what's there, turning things over gently.
            Other days you step away, trusting the grove to tend itself.
            Both are care. The rhythm is yours.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div
              className="bg-card/60 border border-border/30 rounded-2xl p-6 text-left"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-display text-lg font-medium text-foreground mb-2">Guided Tending</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Present. Unhurried. Arranging things with your own hands.
              </p>
            </motion.div>
            <motion.div
              className="bg-card/60 border border-border/30 rounded-2xl p-6 text-left"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p className="font-display text-lg font-medium text-foreground mb-2">Quiet Tending</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Absent. Trusting. Returning to find things cared for.
              </p>
            </motion.div>
          </div>
        </div>
      </NarrativeSection>

      {/* ─── 8. Closing Reassurance ─── */}
      <NarrativeSection className="pb-32">
        <div className="max-w-md text-center">
          <motion.p
            className="font-display text-2xl md:text-3xl font-medium text-foreground leading-snug mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            Your grove will be here
            <br />
            when you're ready.
          </motion.p>
          <motion.p
            className="font-body text-muted-foreground/50 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Nothing is required. Understanding is enough for now.
          </motion.p>
        </div>
      </NarrativeSection>
    </div>
  );
};

export default HowItTends;
