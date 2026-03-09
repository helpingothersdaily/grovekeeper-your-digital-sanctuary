import { motion } from "framer-motion";
import BranchReply, { dispatchBranchEngaged } from "@/components/BranchReply";
import { Leaf } from "lucide-react";

// Mock memory data with picsum photos
const memoryClusters = [
  {
    id: "childhood",
    label: "Childhood",
    position: { x: "20%", y: "25%" }, // top-left
    cards: [
      { id: "c1", caption: "Summer at the lake", rotation: -3 },
      { id: "c2", caption: "Birthday cake, age seven", rotation: 2 },
      { id: "c3", caption: "First day of school", rotation: -1 },
      { id: "c4", caption: "Family vacation", rotation: 4 },
    ]
  },
  {
    id: "work-making",
    label: "Work & Making",
    position: { x: "75%", y: "40%" }, // center-right
    cards: [
      { id: "w1", caption: "The prototype that worked", rotation: -5 },
      { id: "w2", caption: "Late night at the studio", rotation: 1 },
      { id: "w3", caption: "First client meeting", rotation: -2 },
      { id: "w4", caption: "Team celebration", rotation: 3 },
      { id: "w5", caption: "Tools of the trade", rotation: -4 },
    ]
  },
  {
    id: "places",
    label: "Places",
    position: { x: "45%", y: "70%" }, // bottom-center
    cards: [
      { id: "p1", caption: "Quiet morning in Paris", rotation: 2 },
      { id: "p2", caption: "Mountain trail", rotation: -3 },
      { id: "p3", caption: "Corner café", rotation: 1 },
      { id: "p4", caption: "Home again", rotation: -1 },
    ]
  }
];

const MemoryCard = ({ 
  card, 
  clusterIndex, 
  cardIndex, 
  clusterPosition 
}: { 
  card: any, 
  clusterIndex: number, 
  cardIndex: number, 
  clusterPosition: { x: string, y: string } 
}) => {
  // Calculate offset from cluster center for organic spread
  const angle = (cardIndex / 4) * Math.PI * 2 + clusterIndex;
  const radius = 60 + Math.random() * 40;
  const offsetX = Math.cos(angle) * radius;
  const offsetY = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute grove-pile-card w-48 h-32 p-4 cursor-pointer"
      style={{ 
        left: clusterPosition.x,
        top: clusterPosition.y,
        transform: `translate(${offsetX}px, ${offsetY}px) rotate(${card.rotation}deg)`,
        transformOrigin: "center center",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: clusterIndex * 0.3 + cardIndex * 0.1
      }}
      whileHover={{
        scale: 1.02,
        rotate: card.rotation + (card.rotation > 0 ? 2 : -2),
        transition: { type: "spring", stiffness: 300, damping: 25 }
      }}
    >
      {/* Substrate Indicator */}
      <div className="absolute top-2 right-2 text-xs text-grove-bark/40">
        ⌇
      </div>
      
      {/* Image */}
      <div className="w-full h-20 rounded-2xl overflow-hidden mb-2">
        <img 
          src={`https://picsum.photos/seed/${card.id}/300/200`}
          alt={card.caption}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Caption */}
      <p className="font-display text-xs text-foreground/70 text-center leading-relaxed">
        {card.caption}
      </p>

      {/* Branch Button */}
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

const ClusterLabel = ({ 
  cluster, 
  index 
}: { 
  cluster: any, 
  index: number 
}) => (
  <motion.div
    className="absolute text-center"
    style={{
      left: cluster.position.x,
      top: cluster.position.y,
      transform: "translate(-50%, -120px)"
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.3 + 0.8, duration: 0.8 }}
  >
    <h3 className="font-display text-lg text-foreground/50">
      {cluster.label}
    </h3>
  </motion.div>
);

const GuidedTendingSession = () => {
  return (
    <div className="min-h-screen bg-grove-clearing relative overflow-hidden">
      {/* Page Title */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-display text-4xl font-medium text-foreground">
          The Clearing
        </h1>
      </motion.div>

      {/* Memory Clusters */}
      <div className="relative w-full h-screen">
        {memoryClusters.map((cluster, clusterIndex) => (
          <div key={cluster.id}>
            {/* Cluster Label */}
            <ClusterLabel cluster={cluster} index={clusterIndex} />
            
            {/* Memory Cards */}
            {cluster.cards.map((card, cardIndex) => (
              <MemoryCard
                key={card.id}
                card={card}
                clusterIndex={clusterIndex}
                cardIndex={cardIndex}
                clusterPosition={cluster.position}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuidedTendingSession;