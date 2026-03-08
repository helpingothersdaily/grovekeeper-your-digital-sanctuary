import { motion } from "framer-motion";
import guidedImage from "@/assets/guided-tending.jpg";
import autonomousImage from "@/assets/autonomous-tending.jpg";

const TendingModes = () => {
  return (
    <section id="tending" className="py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.2em] text-grove-amber mb-4">
            Two Ways to Tend
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
            Your grove, <span className="italic text-grove-moss">your rhythm</span>
          </h2>
        </motion.div>

        {/* Guided Tending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-grove-sage/10 text-grove-sage font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Guided Tending
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
              A calm space to review,
              <br />
              <span className="italic">adjust, and arrange</span>
            </h3>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              GroveKeeper gathers related items into gentle piles—photos from a trip, 
              notes from a project, documents from a chapter of your life. You review 
              them at your own pace. No rush. No judgment.
            </p>
            <ul className="font-body text-muted-foreground space-y-3">
              {["Items presented as natural clusters", "Drag to rearrange, tap to release", "Everything at your own pace"].map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-grove-sage" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-grove-moss/10">
              <img
                src={guidedImage}
                alt="Hands gently arranging leaves, representing guided tending"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-grove-clearing border border-grove-golden/30 animate-breathe" />
          </motion.div>
        </div>

        {/* Autonomous Tending */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 lg:order-1"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-grove-moss/10">
              <img
                src={autonomousImage}
                alt="A forest grove organizing itself with floating leaves finding their clusters"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-grove-amber/20 animate-float-gentle" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-block bg-grove-amber/10 text-grove-amber font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              Autonomous Tending
            </div>
            <h3 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-6 leading-tight">
              Let your grove <br />
              <span className="italic">tend itself</span>
            </h3>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-6">
              When you're overwhelmed or simply away, GroveKeeper continues its quiet work—
              clustering new items, identifying patterns, removing duplicates, and restoring 
              clarity so you return to a grove that feels cared for.
            </p>
            <ul className="font-body text-muted-foreground space-y-3">
              {["Pattern recognition across all media", "Quiet deduplication and renewal", "A tended grove waiting when you return"].map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-grove-amber" />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TendingModes;
