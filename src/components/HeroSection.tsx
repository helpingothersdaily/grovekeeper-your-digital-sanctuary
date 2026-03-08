import { motion } from "framer-motion";
import heroImage from "@/assets/grove-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="A gentle digital grove with floating documents and photos among soft golden light"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <p className="font-body text-sm uppercase tracking-[0.25em] text-muted-foreground mb-6">
            Ecological Intelligence for Your Digital Life
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.05] text-foreground mb-8">
            Tend your digital space
            <br />
            <span className="text-gradient-grove italic">like a living grove</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            GroveKeeper gently organizes your photos, documents, notes, and memories—
            reducing overwhelm and restoring clarity, one quiet tending at a time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="bg-primary text-primary-foreground font-body px-8 py-4 rounded-xl text-base hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Enter Your Grove
          </button>
          <button className="border border-border text-foreground font-body px-8 py-4 rounded-xl text-base hover:bg-card transition-all">
            See How It Works
          </button>
        </motion.div>

        {/* Floating leaf decorations */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-3 h-3 rounded-full bg-grove-sage/30"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-16 w-2 h-2 rounded-full bg-grove-amber/40"
        />
      </div>
    </section>
  );
};

export default HeroSection;
