import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import groveLogo from "@/assets/grove-logo.png";

const FloatingLeaf = ({
  delay,
  x,
  y,
  size,
  opacity,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-grove-sage/[var(--leaf-opacity)]"
    style={
      {
        left: x,
        top: y,
        width: size,
        height: size,
        "--leaf-opacity": opacity,
      } as React.CSSProperties
    }
    animate={{
      y: [0, -12, 0],
      x: [0, 6, -4, 0],
      opacity: [opacity, opacity * 1.3, opacity],
    }}
    transition={{
      duration: 7 + delay * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const LightDrift = () => (
  <motion.div
    className="absolute inset-0 pointer-events-none"
    animate={{
      background: [
        "radial-gradient(ellipse 600px 400px at 40% 30%, hsl(var(--grove-golden) / 0.04), transparent)",
        "radial-gradient(ellipse 600px 400px at 55% 45%, hsl(var(--grove-golden) / 0.06), transparent)",
        "radial-gradient(ellipse 600px 400px at 45% 35%, hsl(var(--grove-golden) / 0.04), transparent)",
      ],
    }}
    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
  />
);

const FirstGrove = () => {
  const navigate = useNavigate();
  const [chosen, setChosen] = useState<string | null>(null);

  const handleChoice = (mode: string) => {
    setChosen(mode);
    setTimeout(() => navigate(`/grove?mode=${mode}`), 900);
  };

  return (
    <div className="min-h-screen bg-grove-clearing flex items-center justify-center relative overflow-hidden">
      {/* Living atmosphere */}
      <LightDrift />
      <FloatingLeaf delay={0} x="8%" y="20%" size={80} opacity={0.04} />
      <FloatingLeaf delay={1.5} x="75%" y="15%" size={48} opacity={0.05} />
      <FloatingLeaf delay={3} x="85%" y="60%" size={64} opacity={0.03} />
      <FloatingLeaf delay={0.8} x="20%" y="70%" size={36} opacity={0.06} />
      <FloatingLeaf delay={2.2} x="55%" y="80%" size={52} opacity={0.04} />
      <FloatingLeaf delay={4} x="40%" y="12%" size={28} opacity={0.05} />

      <AnimatePresence>
        {chosen && (
          <motion.div
            className="absolute inset-0 bg-background/60 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-6 text-center"
      >
        {/* Logo — quiet presence */}
        <motion.img
          src={groveLogo}
          alt="GroveKeeper"
          className="w-12 h-12 mx-auto mb-12 opacity-70"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Opening line */}
        <motion.h1
          className="font-display text-3xl md:text-[2.5rem] font-medium text-foreground leading-snug mb-5"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          This is your grove.
        </motion.h1>

        {/* Gentle orientation */}
        <motion.div
          className="space-y-2 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            Nothing here will change without your consent.
          </p>
          <p className="font-body text-muted-foreground/70 text-base leading-relaxed">
            You decide how your grove is cared for.
          </p>
        </motion.div>

        {/* Two equal paths */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.7 }}
        >
          <button
            onClick={() => handleChoice("guided")}
            disabled={!!chosen}
            className="group w-full bg-card/70 hover:bg-card border border-border/40 hover:border-grove-sage/30 rounded-2xl px-7 py-6 text-left transition-all duration-500 ease-out disabled:opacity-60"
          >
            <span className="font-display text-lg font-medium text-foreground block mb-1.5">
              Guided Tending
            </span>
            <span className="font-body text-sm text-muted-foreground leading-relaxed block">
              A calm space to sit with what's here.
              <br />
              Review, adjust, and arrange at your own pace.
            </span>
          </button>

          <button
            onClick={() => handleChoice("autonomous")}
            disabled={!!chosen}
            className="group w-full bg-card/70 hover:bg-card border border-border/40 hover:border-grove-amber/30 rounded-2xl px-7 py-6 text-left transition-all duration-500 ease-out disabled:opacity-60"
          >
            <span className="font-display text-lg font-medium text-foreground block mb-1.5">
              Quiet Tending
            </span>
            <span className="font-body text-sm text-muted-foreground leading-relaxed block">
              Let your grove be gently cared for while you rest.
              <br />
              Nothing irreversible. You return to clarity.
            </span>
          </button>
        </motion.div>

        {/* Grounding reassurance */}
        <motion.p
          className="font-body text-sm text-muted-foreground/50 mt-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.3 }}
        >
          Your grove will wait.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FirstGrove;
