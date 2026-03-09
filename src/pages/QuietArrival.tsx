import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const QuietArrival = () => {
  const navigate = useNavigate();
  const [settling, setSettling] = useState(false);

  useEffect(() => {
    if (settling) {
      const timer = setTimeout(() => navigate("/guided-tending/session"), 2000);
      return () => clearTimeout(timer);
    }
  }, [settling, navigate]);

  const handleHabitat = () => setSettling(true);

  return (
    <div className="min-h-screen bg-grove-clearing flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grove-glass w-full max-w-lg py-16 px-12 text-center"
        style={{ borderRadius: "3rem" }}
      >
        {/* Posture label */}
        <motion.p
          className="font-body text-[11px] tracking-wide mb-8"
          style={{ color: "hsl(var(--grove-sage))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Quiet Tending
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-display text-3xl md:text-4xl font-medium italic text-foreground mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Rest. I'll tend while you're away.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body text-muted-foreground text-base leading-[1.8] mb-12 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          GroveKeeper will work in the background — grouping, noticing, never
          disturbing. You'll find a Field Note waiting when you return.
        </motion.p>

        <AnimatePresence mode="wait">
          {!settling ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {/* Habitat buttons */}
              <div className="space-y-6 mb-8">
                <button
                  onClick={handleHabitat}
                  className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                  style={{ borderRadius: "3rem" }}
                >
                  ⌇ Google Drive
                </button>
                <button
                  onClick={handleHabitat}
                  className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                  style={{ borderRadius: "3rem" }}
                >
                  ⌇ OneDrive
                </button>
              </div>

              {/* Reassurance */}
              <p
                className="font-body text-[11px] mb-8"
                style={{ color: "hsl(var(--grove-amber))" }}
              >
                Nothing will be moved or deleted. Ever.
              </p>

              {/* Back link */}
              <button
                onClick={() => navigate("/first-grove")}
                className="font-body text-[11px] transition-opacity duration-300 hover:opacity-70"
                style={{ color: "hsl(var(--grove-amber))" }}
              >
                ← choose a different posture
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="settling"
              className="py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                className="text-4xl block mb-6"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 12 }}
              >
                🌱
              </motion.span>
              <p className="font-display text-xl italic text-foreground/70">
                GroveKeeper is settling in…
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default QuietArrival;
