import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sprout, Cloud, Box, ArrowRight } from "lucide-react";
import groveLogo from "@/assets/grove-logo.png";

const HabitatCard = ({
  icon: Icon,
  name,
  description,
  isSelected,
  onClick,
  delay,
}: {
  icon: any;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    onClick={onClick}
    className={`
      cursor-pointer relative overflow-hidden transition-all duration-500
      rounded-[3rem] p-8 backdrop-blur-md border
      ${
        isSelected
          ? "bg-grove-sage/10 border-grove-sage/40 shadow-xl"
          : "bg-background/40 border-border/40 hover:bg-background/60 hover:border-border/60"
      }
    `}
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div
        className={`w-16 h-16 rounded-[2rem] flex items-center justify-center transition-colors duration-500 ${
          isSelected ? "bg-grove-sage/20 text-grove-moss" : "bg-muted/50 text-muted-foreground"
        }`}
      >
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-display text-2xl text-foreground mb-2">{name}</h3>
        <p className="font-body text-sm text-muted-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
    
    <AnimatePresence>
      {isSelected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-6 right-6"
        >
          <Sprout className="w-5 h-5 text-grove-sage" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const StewardshipOnboarding = () => {
  const navigate = useNavigate();
  const [selectedHabitats, setSelectedHabitats] = useState<Set<string>>(new Set());

  const toggleHabitat = (id: string) => {
    setSelectedHabitats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleInvite = () => {
    navigate("/first-grove");
  };

  return (
    <div className="min-h-screen bg-grove-clearing relative overflow-hidden flex flex-col items-center justify-center px-6 py-12">
      {/* Gentle ambient background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(ellipse 800px 600px at 50% 0%, hsl(var(--grove-sage) / 0.05), transparent)",
            "radial-gradient(ellipse 800px 600px at 50% 10%, hsl(var(--grove-sage) / 0.08), transparent)",
            "radial-gradient(ellipse 800px 600px at 50% 0%, hsl(var(--grove-sage) / 0.05), transparent)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-3xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-16 space-y-6"
        >
          <motion.img
            src={groveLogo}
            alt="GroveKeeper"
            className="w-10 h-10 mx-auto opacity-40 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.4, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <h1 className="font-display text-4xl md:text-5xl font-medium text-foreground tracking-tight">
            Invite GroveKeeper
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Allow your grove to cast a quiet, organizing veil over your external habitats. 
            Nothing is moved, deleted, or permanently altered. We simply map continuity and release signals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <HabitatCard
            icon={Cloud}
            name="Google Habitat"
            description="Tangled documents and distant memories resting in Google Drive."
            isSelected={selectedHabitats.has("google")}
            onClick={() => toggleHabitat("google")}
            delay={0.8}
          />
          <HabitatCard
            icon={Box}
            name="OneDrive Habitat"
            description="Chapters and notes scattered across the Microsoft ecosystem."
            isSelected={selectedHabitats.has("onedrive")}
            onClick={() => toggleHabitat("onedrive")}
            delay={1.0}
          />
        </div>

        <motion.div
          className="flex flex-col items-center space-y-6 min-h-[100px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <AnimatePresence mode="wait">
            {selectedHabitats.size > 0 ? (
              <motion.button
                key="invite-btn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={handleInvite}
                className="group flex items-center gap-3 bg-foreground text-background px-8 py-4 rounded-[2rem] font-body text-lg shadow-lg hover:shadow-xl transition-all duration-500 hover:bg-grove-moss"
              >
                Let the tending begin
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.p
                key="waiting-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-body text-sm text-muted-foreground/60 tracking-wide"
              >
                Choose a habitat to tend, when you're ready
              </motion.p>
            )}
          </AnimatePresence>
          
          <p className="font-body text-xs text-muted-foreground/40 max-w-md text-center">
            GroveKeeper uses a 'Read-Only Stewardship' model. Your files remain untouched in their native environments.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default StewardshipOnboarding;
