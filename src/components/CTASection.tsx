import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-28 bg-grove-clearing relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-1/4 w-32 h-32 rounded-full bg-grove-sage/5 animate-float-gentle" />
      <div className="absolute bottom-10 right-1/4 w-20 h-20 rounded-full bg-grove-amber/10 animate-sway" />

      <div className="container mx-auto px-6 text-center relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-medium text-foreground mb-6 leading-tight">
            Your grove is waiting
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            No shame. No pressure. Just a quiet place where your digital life 
            can finally breathe. Begin tending whenever you're ready.
          </p>
          <button className="bg-primary text-primary-foreground font-body px-10 py-4 rounded-xl text-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            Begin Tending
          </button>
          <p className="font-body text-sm text-muted-foreground mt-6">
            Free to start · No credit card required · Your data stays yours
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
