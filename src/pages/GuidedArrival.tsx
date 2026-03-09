import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GuidedArrival = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grove-mist flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grove-glass w-full max-w-lg p-12 text-center"
        style={{ borderRadius: "3rem" }}
      >
        {/* Posture label */}
        <motion.p
          className="font-body text-[11px] tracking-wide mb-6"
          style={{ color: "hsl(var(--grove-sage))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Guided Tending
        </motion.p>

        {/* Heading */}
        <motion.h1
          className="font-display text-4xl md:text-5xl font-medium text-foreground mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Where shall we begin?
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="font-body text-muted-foreground text-base leading-relaxed mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Choose a habitat for us to tend together. You'll guide each decision.
        </motion.p>

        {/* Habitat buttons */}
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="text-center">
            <button
              onClick={() => navigate("/guided-tending/session")}
              className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              style={{ borderRadius: "3rem" }}
            >
              ⌇ Google Drive
            </button>
            <p className="font-body text-[11px] text-muted-foreground mt-2">
              Maps your Drive as a living grove
            </p>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/guided-tending/session")}
              className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              style={{ borderRadius: "3rem" }}
            >
              ⌇ OneDrive
            </button>
            <p className="font-body text-[11px] text-muted-foreground mt-2">
              Maps your OneDrive as a living grove
            </p>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.button
          onClick={() => navigate("/first-grove")}
          className="font-body text-[11px] transition-opacity duration-300 hover:opacity-70"
          style={{ color: "hsl(var(--grove-amber))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          ← choose a different posture
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GuidedArrival;
