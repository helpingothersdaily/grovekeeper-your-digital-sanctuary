import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import BranchReply, { dispatchBranchEngaged } from "@/components/BranchReply";
import { Leaf } from "lucide-react";

const memoryClusters = [
  {
    id: "childhood",
    label: "Childhood",
    position: { x: "20%", y: "25%" },
    cards: [
      { id: "c1", caption: "Summer at the lake" },
      { id: "c2", caption: "Birthday cake, age seven" },
      { id: "c3", caption: "First day of school" },
      { id: "c4", caption: "Family vacation" },
    ],
  },
  {
    id: "work-making",
    label: "Work & Making",
    position: { x: "75%", y: "40%" },
    cards: [
      { id: "w1", caption: "The prototype that worked" },
      { id: "w2", caption: "Late night at the studio" },
      { id: "w3", caption: "First client meeting" },
      { id: "w4", caption: "Team celebration" },
      { id: "w5", caption: "Tools of the trade" },
    ],
  },
  {
    id: "places",
    label: "Places",
    position: { x: "45%", y: "70%" },
    cards: [
      { id: "p1", caption: "Quiet morning in Paris" },
      { id: "p2", caption: "Mountain trail" },
      { id: "p3", caption: "Corner café" },
      { id: "p4", caption: "Home again" },
    ],
  },
];

// Stack depth: how far behind the top card (capped at 2 for visual outline of 3)
const getStackStyle = (distanceFromTop: number) => {
  const d = Math.min(distanceFromTop, 2);
  return {
    x: d * 4,
    y: d * 5,
    scale: 1 - d * 0.04,
    opacity: distanceFromTop < 3 ? 1 : 0,
  };
};

const MemoryCard = ({
  card,
  clusterIndex,
  clusterPosition,
  zIndex,
  distanceFromTop,
  totalCards,
  onClick,
}: {
  card: { id: string; caption: string };
  clusterIndex: number;
  clusterPosition: { x: string; y: string };
  zIndex: number;
  distanceFromTop: number;
  totalCards: number;
  onClick: () => void;
}) => {
  const isTop = distanceFromTop === 0;
  const { x, y, scale, opacity } = getStackStyle(distanceFromTop);

  return (
    <motion.div
      layout
      layoutId={card.id}
      className={`absolute grove-pile-card w-48 h-32 p-4 ${
        isTop ? "cursor-pointer" : "pointer-events-none"
      }`}
      style={{
        left: clusterPosition.x,
        top: clusterPosition.y,
        zIndex,
        transformOrigin: "top left",
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ x, y, scale, opacity }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 28,
        opacity: { duration: 0.2 },
      }}
      whileHover={
        isTop
          ? {
              y: y - 4,
              scale: scale + 0.01,
              transition: { type: "spring", stiffness: 400, damping: 30 },
            }
          : undefined
      }
      whileTap={isTop ? { scale: 0.97 } : undefined}
      onClick={isTop ? onClick : undefined}
    >
      <div className="absolute top-2 right-2 text-[10px] text-grove-bark/30 font-display">
        {totalCards - distanceFromTop}/{totalCards}
      </div>

      <div className="w-full h-20 rounded-2xl overflow-hidden mb-2">
        <img
          src={`https://picsum.photos/seed/${card.id}/300/200`}
          alt={card.caption}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="font-display text-xs text-foreground/70 text-center leading-relaxed">
        {card.caption}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatchBranchEngaged(card.id, e.currentTarget.getBoundingClientRect());
        }}
        className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-display text-[hsl(var(--grove-sage))] hover:opacity-80 transition-opacity z-10"
      >
        <Leaf size={10} />
        branch
      </button>
    </motion.div>
  );
};

const ClusterLabel = ({ cluster, index }: { cluster: (typeof memoryClusters)[0]; index: number }) => (
  <motion.div
    className="absolute text-center"
    style={{
      left: cluster.position.x,
      top: cluster.position.y,
      transform: "translate(-50%, -100px)",
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.3 + 0.6, duration: 0.8 }}
  >
    <h3 className="font-display text-lg text-foreground/50">{cluster.label}</h3>
  </motion.div>
);

const GuidedTendingSession = () => {
  // order array: last element = top card (highest z-index)
  const [clusterOrders, setClusterOrders] = useState<Record<string, number[]>>(() => {
    const orders: Record<string, number[]> = {};
    memoryClusters.forEach((cluster) => {
      orders[cluster.id] = cluster.cards.map((_, i) => i);
    });
    return orders;
  });

  // Always send the current top card to the back
  const shuffleTop = useCallback((clusterId: string) => {
    setClusterOrders((prev) => {
      const current = [...prev[clusterId]];
      const top = current.pop()!;
      current.unshift(top);
      return { ...prev, [clusterId]: current };
    });
  }, []);

  return (
    <div className="min-h-screen bg-grove-clearing relative overflow-hidden">
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display text-4xl font-medium text-foreground">The Clearing</h1>
      </motion.div>

      <div className="relative w-full h-screen">
        {memoryClusters.map((cluster, clusterIndex) => {
          const order = clusterOrders[cluster.id];
          const total = cluster.cards.length;
          return (
            <div key={cluster.id}>
              <ClusterLabel cluster={cluster} index={clusterIndex} />
              {order.map((originalIndex, zOrder) => {
                const card = cluster.cards[originalIndex];
                const distanceFromTop = total - 1 - zOrder;
                return (
                  <MemoryCard
                    key={card.id}
                    card={card}
                    clusterIndex={clusterIndex}
                    clusterPosition={cluster.position}
                    zIndex={zOrder}
                    distanceFromTop={distanceFromTop}
                    totalCards={total}
                    onClick={() => shuffleTop(cluster.id)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      <BranchReply />
    </div>
  );
};

export default GuidedTendingSession;
