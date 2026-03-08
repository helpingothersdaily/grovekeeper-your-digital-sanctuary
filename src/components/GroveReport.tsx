import { motion } from "framer-motion";
import { TreePine, Recycle, AlertCircle, CheckCircle2 } from "lucide-react";

const GroveReport = () => {
  return (
    <section id="grove-report" className="py-28">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.2em] text-grove-sage mb-4">
            Grove Report
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground mb-6">
            A quiet summary of <span className="italic text-grove-moss">what was tended</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-lg leading-relaxed">
            After each tending session, GroveKeeper produces a Grove Report—a gentle overview 
            of what was organized, what was renewed, and what still needs your attention.
          </p>
        </motion.div>

        {/* Mock Grove Report card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card rounded-3xl border border-border/50 shadow-xl overflow-hidden"
        >
          {/* Report header */}
          <div className="bg-primary/5 px-8 py-6 border-b border-border/50">
            <div className="flex items-center gap-3 mb-2">
              <TreePine className="w-5 h-5 text-primary" />
              <p className="font-display text-xl font-semibold text-foreground">Grove Report</p>
            </div>
            <p className="font-body text-sm text-muted-foreground">March 8, 2026 · Autonomous Tending Session</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Items Tended", value: "147", color: "text-primary" },
                { label: "Clusters Formed", value: "12", color: "text-grove-sage" },
                { label: "Duplicates Found", value: "23", color: "text-grove-amber" },
                { label: "Life Chapters", value: "3", color: "text-grove-bark" },
              ].map((stat) => (
                <div key={stat.label} className="bg-background rounded-2xl p-5 text-center border border-border/30">
                  <p className={`font-display text-3xl font-semibold ${stat.color}`}>{stat.value}</p>
                  <p className="font-body text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Sections */}
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-grove-sage/5 rounded-2xl p-5 border border-grove-sage/10">
                <CheckCircle2 className="w-5 h-5 text-grove-sage mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">What Was Tended</p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    Photos from your September coast trip were clustered with your journal entry and the restaurant receipt. 
                    Your "Home Renovation" project notes were gathered from three different apps into one clear branch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-grove-amber/5 rounded-2xl p-5 border border-grove-amber/10">
                <Recycle className="w-5 h-5 text-grove-amber mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">What Was Renewed</p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    23 duplicate photos identified (15 auto-released, 8 awaiting your review). 
                    Outdated drafts of your resume were archived, keeping only the most recent version visible.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-grove-moss/5 rounded-2xl p-5 border border-grove-moss/10">
                <AlertCircle className="w-5 h-5 text-grove-moss mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body font-semibold text-foreground text-sm mb-1">What Still Needs Attention</p>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    42 uncategorized items from last week. A cluster labeled "Medical Records" may need your review 
                    before GroveKeeper can tend it further. One branch has grown quite long—would you like to prune it?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GroveReport;
