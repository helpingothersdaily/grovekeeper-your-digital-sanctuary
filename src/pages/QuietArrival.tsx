import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import groveLogo from "@/assets/grove-logo.png";

const FloatingMote = ({
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
    className="absolute rounded-full bg-grove-amber/[var(--mote-opacity)]"
    style={
      {
        left: x,
        top: y,
        width: size,
        height: size,
        "--mote-opacity": opacity,
      } as React.CSSProperties
    }
    animate={{
      y: [0, -6, 0],
      opacity: [opacity, opacity * 1.3, opacity],
    }}
    transition={{
      duration: 9 + delay * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const QuietArrival = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grove-clearing flex items-center justify-center relative overflow-hidden">
      {/* Atmosphere */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 500px 350px at 50% 45%, hsl(var(--grove-golden) / 0.05), transparent)",
            "radial-gradient(ellipse 500px 350px at 55% 50%, hsl(var(--grove-golden) / 0.07), transparent)",
            "radial-gradient(ellipse 500px 350px at 50% 45%, hsl(var(--grove-golden) / 0.05), transparent)",
          ],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <FloatingMote delay={0} x="15%" y="30%" size={50} opacity={0.04} />
      <FloatingMote delay={2} x="72%" y="20%" size={40} opacity={0.05} />
      <FloatingMote delay={3.5} x="80%" y="60%" size={56} opacity={0.03} />
      <FloatingMote delay={1} x="30%" y="75%" size={32} opacity={0.04} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
        className="relative z-10 max-w-md w-full mx-6 text-center"
      >
        {/* Logo */}
        <motion.img
          src={groveLogo}
          alt="GroveKeeper"
          className="w-10 h-10 mx-auto mb-14 opacity-60"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />

        {/* Acknowledgment */}
        <motion.h1
          className="font-display text-3xl md:text-[2.5rem] font-medium text-foreground leading-snug mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Your grove will be tended quietly.
        </motion.h1>

        {/* Reassurance */}
        <motion.div
          className="space-y-3 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            Nothing irreversible will happen.
          </p>
          <p className="font-body text-muted-foreground/60 text-base leading-relaxed">
            You can return whenever you're ready.
          </p>
        </motion.div>

        {/* Gentle departure */}
        <motion.button
          onClick={() => navigate("/quiet-tending")}
          className="font-body text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          Rest now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default QuietArrival;
