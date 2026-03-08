import { motion, useReducedMotion } from "framer-motion";
import groveLogo from "@/assets/grove-logo.png";

const FloatingMote = ({
  delay,
  x,
  y,
  size,
  opacity,
  reducedMotion,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  reducedMotion: boolean;
}) => (
  <motion.div
    className="absolute rounded-full bg-grove-sage/[var(--mote-opacity)]"
    style={
      {
        left: x,
        top: y,
        width: size,
        height: size,
        "--mote-opacity": opacity,
      } as React.CSSProperties
    }
    animate={
      reducedMotion
        ? {}
        : {
            y: [0, -6, 0],
            opacity: [opacity, opacity * 1.2, opacity],
          }
    }
    transition={{
      duration: 10 + delay * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const GuidedTendingSession = () => {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="min-h-screen bg-grove-clearing flex items-center justify-center relative overflow-hidden">
      {/* Atmosphere */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          reducedMotion
            ? {}
            : {
                background: [
                  "radial-gradient(ellipse 600px 400px at 45% 40%, hsl(var(--grove-sage) / 0.05), transparent)",
                  "radial-gradient(ellipse 600px 400px at 50% 50%, hsl(var(--grove-sage) / 0.07), transparent)",
                  "radial-gradient(ellipse 600px 400px at 45% 40%, hsl(var(--grove-sage) / 0.05), transparent)",
                ],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingMote delay={0} x="10%" y="20%" size={70} opacity={0.03} reducedMotion={reducedMotion} />
      <FloatingMote delay={2} x="80%" y="25%" size={50} opacity={0.04} reducedMotion={reducedMotion} />
      <FloatingMote delay={3.5} x="70%" y="70%" size={60} opacity={0.03} reducedMotion={reducedMotion} />
      <FloatingMote delay={1} x="20%" y="75%" size={40} opacity={0.04} reducedMotion={reducedMotion} />
      <FloatingMote delay={4} x="50%" y="15%" size={34} opacity={0.03} reducedMotion={reducedMotion} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-6 text-center"
      >
        {/* Logo — barely there */}
        <motion.img
          src={groveLogo}
          alt="GroveKeeper"
          className="w-8 h-8 mx-auto mb-16 opacity-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {/* Shared presence */}
        <motion.p
          className="font-display text-2xl md:text-3xl font-medium text-foreground leading-snug mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          We're here together.
        </motion.p>

        {/* The grove, unnamed */}
        <motion.div
          className="space-y-3 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 2 }}
        >
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            Your grove is here, as it is.
          </p>
          <p className="font-body text-muted-foreground/50 text-base leading-relaxed">
            Notice what's present.
          </p>
        </motion.div>

        {/* Quiet waiting — no label, no pressure */}
        <motion.p
          className="font-body text-sm text-muted-foreground/35 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3.5 }}
        >
          When you're ready
        </motion.p>
      </motion.div>
    </div>
  );
};

export default GuidedTendingSession;
