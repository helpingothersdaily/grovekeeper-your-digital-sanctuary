import { motion } from "framer-motion";
import { Leaf, Layers, Brain, Sparkles } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Natural Clustering",
    description: "Items group themselves by emotional and contextual relevance—not rigid folders, but living clusters that breathe and shift.",
  },
  {
    icon: Brain,
    title: "Cross-Media Understanding",
    description: "A photo from Tuesday, a voice note from Wednesday, and a document from last month—GroveKeeper sees the thread that connects them.",
  },
  {
    icon: Layers,
    title: "Life Chapters",
    description: "Your grove naturally forms chapters: a move, a project, a season of rest. GroveKeeper identifies these without you having to name them.",
  },
  {
    icon: Sparkles,
    title: "Gentle Deduplication",
    description: "Duplicates are quietly identified and offered for release—never deleted without your knowing, always with care.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 bg-grove-mist">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.2em] text-grove-sage mb-4">
            How It Works
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
            Your digital life, understood <br className="hidden md:block" />
            <span className="italic text-grove-moss">as a living ecosystem</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            GroveKeeper doesn't impose structure. It observes, learns, and gently tends—
            like a patient gardener who knows when to prune and when to let things grow.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-grove-sage/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
