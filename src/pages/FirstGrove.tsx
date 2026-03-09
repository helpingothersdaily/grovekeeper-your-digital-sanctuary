import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FirstGrove = () => {
  const navigate = useNavigate();

  const handleTend = () => {
    navigate("/guided-tending/arrival");
  };

  return (
    <div className="min-h-screen bg-grove-mist flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="grove-glass w-full max-w-lg p-12 text-center"
        style={{ borderRadius: "3rem" }}
      >
        <motion.h1
          className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Invite a Gardener
        </motion.h1>

        <motion.p
          className="font-body text-muted-foreground text-base leading-relaxed mb-10 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          GroveKeeper will move quietly around your files — never moving them, never deleting. Only seeing.
        </motion.p>

        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="text-center">
            <button
              onClick={() => navigate("/guided-tending/arrival")}
              className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              style={{ borderRadius: "3rem" }}
            >
              ⌇ Guided Tending
            </button>
            <p className="font-body text-sm text-muted-foreground mt-2">You'll tend alongside me.</p>
          </div>
          <div className="text-center">
            <button
              onClick={() => navigate("/quiet-tending/arrival")}
              className="w-full bg-grove-sage text-white font-body text-base px-8 py-4 transition-transform duration-300 ease-in-out hover:scale-[1.02]"
              style={{ borderRadius: "3rem" }}
            >
              ⌇ Quiet Tending
            </button>
            <p className="font-body text-sm text-muted-foreground mt-2">I'll tend while you rest.</p>
          </div>
        </motion.div>

        <motion.p
          className="font-body text-sm"
          style={{ color: "hsl(var(--grove-amber))" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Read-only. Your files stay exactly where they are.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FirstGrove;
