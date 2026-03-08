import { motion } from "framer-motion";
import { MessageCircle, GitBranch } from "lucide-react";

const BranchReply = () => {
  return (
    <section id="branchreply" className="py-28 bg-grove-clearing">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <GitBranch className="w-3.5 h-3.5" />
              Interaction Innovation
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight">
              BranchReply
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8">
              Thoughts don't move in straight lines—especially for ADHD minds. BranchReply 
              is a floating reply mechanism that lets you respond to any item, note, or message 
              in context. Conversations grow like branches: diverging, reconnecting, and 
              forming natural patterns of thought.
            </p>
            <div className="space-y-4">
              {[
                { title: "Reply in context", desc: "Attach a thought to any item, anywhere in your grove" },
                { title: "Natural branching", desc: "Follow tangents without losing the original thread" },
                { title: "Reconnection", desc: "Branches can merge when ideas converge again" },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-grove-sage/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-grove-sage" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">{item.title}</p>
                    <p className="font-body text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Interactive BranchReply visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-xl">
              {/* Main thread */}
              <div className="space-y-4">
                <div className="bg-background rounded-2xl p-4 border border-border/50">
                  <p className="font-body text-sm text-muted-foreground mb-1">Trip to Portland — Sept 2025</p>
                  <p className="font-body text-foreground">These photos from the coast remind me of the cabin we stayed in…</p>
                </div>

                {/* Branch line */}
                <div className="flex items-stretch gap-4 ml-6">
                  <div className="w-px bg-grove-sage/30 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-grove-sage/50" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="bg-grove-sage/5 rounded-2xl p-4 border border-grove-sage/20 flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <GitBranch className="w-3 h-3 text-grove-sage" />
                      <p className="font-body text-xs text-grove-sage">Branch reply</p>
                    </div>
                    <p className="font-body text-foreground text-sm">Oh! That cabin—I wrote a journal entry about it. GroveKeeper found it.</p>
                  </motion.div>
                </div>

                {/* Second branch */}
                <div className="flex items-stretch gap-4 ml-12">
                  <div className="w-px bg-grove-amber/30 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-grove-amber/50" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="bg-grove-amber/5 rounded-2xl p-4 border border-grove-amber/20 flex-1"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <GitBranch className="w-3 h-3 text-grove-amber" />
                      <p className="font-body text-xs text-grove-amber">Branch reply</p>
                    </div>
                    <p className="font-body text-foreground text-sm">I want to go back. Adding this to my "places to return" cluster.</p>
                  </motion.div>
                </div>

                {/* Floating reply button */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="flex justify-center pt-2"
                >
                  <div className="bg-primary text-primary-foreground font-body text-xs px-4 py-2 rounded-full flex items-center gap-2 shadow-lg shadow-primary/20">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reply to anything…
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BranchReply;
