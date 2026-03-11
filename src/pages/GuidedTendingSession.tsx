import { useState } from "react";
import { motion } from "framer-motion";
import { FileType } from "@/lib/clearingData";
import { clusters } from "@/lib/clearingData";
import FilterBar from "@/components/clearing/FilterBar";
import ClusterGroup from "@/components/clearing/ClusterGroup";
import BranchReply from "@/components/BranchReply";

/** Cluster center positions on the canvas (percentages mapped to px in component) */
const clusterPositions = [
  { xPct: 15, yPct: 25 },  // The House Project
  { xPct: 55, yPct: 20 },  // Summer 2019
  { xPct: 85, yPct: 35 },  // Work — The Pivot
  { xPct: 30, yPct: 60 },  // Mum & Dad
  { xPct: 70, yPct: 65 },  // Learning
];

const GuidedTendingSession = () => {
  const [activeFilter, setActiveFilter] = useState<FileType | "all">("all");

  // Canvas dimensions for absolute positioning
  const canvasWidth = 1200;
  const canvasHeight = 800;

  return (
    <div className="min-h-screen bg-grove-clearing relative overflow-hidden">
      <motion.div
        className="pt-12 pb-2 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display text-4xl font-medium text-foreground">The Clearing</h1>
        <p className="font-display text-sm text-foreground/40 mt-2">
          Click any cluster label to rename it · branch a thought from any file
        </p>
      </motion.div>

      <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <div
        className="relative mx-auto"
        style={{
          width: canvasWidth,
          maxWidth: "100%",
          height: canvasHeight,
          isolation: "isolate",
        }}
      >
        {clusters.map((cluster, i) => (
          <ClusterGroup
            key={cluster.id}
            cluster={cluster}
            activeFilter={activeFilter}
            centerX={(clusterPositions[i].xPct / 100) * canvasWidth}
            centerY={(clusterPositions[i].yPct / 100) * canvasHeight}
          />
        ))}
      </div>

      <BranchReply />
    </div>
  );
};

export default GuidedTendingSession;
