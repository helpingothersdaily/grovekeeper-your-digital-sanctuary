import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Trees, Leaf } from "lucide-react";
import groveLogo from "@/assets/grove-logo.png";

const FirstGrove = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-grove-clearing flex items-center justify-center relative overflow-hidden">
      {/* Ambient decorative elements */}
      <div className="absolute top-1/4 left-[10%] w-40 h-40 rounded-full bg-grove-sage/5 animate-float-gentle" />
      <div className="absolute bottom-1/3 right-[15%] w-24 h-24 rounded-full bg-grove-amber/8 animate-sway" />
      <div className="absolute top-[60%] left-[60%] w-16 h-16 rounded-full bg-grove-golden/10 animate-breathe" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full mx-6 text-center"
      >
        <motion.img
          src={groveLogo}
          alt="GroveKeeper"
          className="w-14 h-14 mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className="font-display text-3xl md:text-4xl font-medium text-foreground leading-snug mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          This is your grove.
        </motion.p>

        <motion.p
          className="font-body text-muted-foreground text-lg leading-relaxed mb-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Nothing will be changed without your consent.
        </motion.p>

        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <button
            onClick={() => navigate("/grove?mode=guided")}
            className="group flex items-center gap-4 w-full bg-card hover:bg-card/80 border border-border/60 hover:border-grove-sage/40 rounded-2xl px-6 py-5 text-left transition-all duration-300"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-grove-sage/10 flex items-center justify-center group-hover:bg-grove-sage/20 transition-colors">
              <Trees className="w-5 h-5 text-grove-sage" />
            </div>
            <div>
              <span className="font-display text-lg font-medium text-foreground block">
                Begin Guided Tending
              </span>
              <span className="font-body text-sm text-muted-foreground">
                Review and arrange at your own pace
              </span>
            </div>
          </button>

          <button
            onClick={() => navigate("/grove?mode=autonomous")}
            className="group flex items-center gap-4 w-full bg-card hover:bg-card/80 border border-border/60 hover:border-grove-amber/40 rounded-2xl px-6 py-5 text-left transition-all duration-300"
          >
            <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-grove-amber/10 flex items-center justify-center group-hover:bg-grove-amber/20 transition-colors">
              <Leaf className="w-5 h-5 text-grove-amber" />
            </div>
            <div>
              <span className="font-display text-lg font-medium text-foreground block">
                Let GroveKeeper Tend Quietly
              </span>
              <span className="font-body text-sm text-muted-foreground">
                Your grove organizes itself gently
              </span>
            </div>
          </button>
        </motion.div>

        <motion.p
          className="font-body text-sm text-muted-foreground/70 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          You can change this anytime.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FirstGrove;
