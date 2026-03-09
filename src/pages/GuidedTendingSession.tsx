import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import groveLogo from "@/assets/grove-logo.png";

// Mock memory clusters — these would come from the stewardship core
const memoryPiles = [
  {
    id: "coast-trip",
    label: "The coast, September",
    items: [
      { id: "m1", type: "photo", color: "grove-sage", size: "lg" },
      { id: "m2", type: "photo", color: "grove-sage", size: "md" },
      { id: "m3", type: "note", color: "grove-amber", size: "sm" },
    ],
    position: { x: "15%", y: "25%" },
    rotation: -3,
  },
  {
    id: "home-chapter",
    label: "Moving in together",
    items: [
      { id: "m4", type: "document", color: "grove-bark", size: "md" },
      { id: "m5", type: "photo", color: "grove-sage", size: "lg" },
      { id: "m6", type: "photo", color: "grove-sage", size: "sm" },
      { id: "m7", type: "note", color: "grove-amber", size: "sm" },
    ],
    position: { x: "55%", y: "18%" },
    rotation: 2,
  },
  {
    id: "recipes",
    label: "Grandma's recipes",
    items: [
      { id: "m8", type: "document", color: "grove-bark", size: "md" },
      { id: "m9", type: "photo", color: "grove-sage", size: "sm" },
    ],
    position: { x: "35%", y: "60%" },
    rotation: -1.5,
  },
  {
    id: "garden-notes",
    label: "The garden project",
    items: [
      { id: "m10", type: "note", color: "grove-amber", size: "md" },
      { id: "m11", type: "photo", color: "grove-sage", size: "md" },
      { id: "m12", type: "note", color: "grove-amber", size: "sm" },
    ],
    position: { x: "70%", y: "55%" },
    rotation: 1,
  },
];

const sizeMap = {
  sm: { w: "w-14 h-14 md:w-16 md:h-16", offset: 8 },
  md: { w: "w-20 h-20 md:w-24 md:h-24", offset: 12 },
  lg: { w: "w-28 h-28 md:w-32 md:h-32", offset: 16 },
};

const typeIcon: Record<string, string> = {
  photo: "◐",
  document: "▭",
  note: "◇",
};

const colorMap: Record<string, string> = {
  "grove-sage": "bg-grove-sage/20 border-grove-sage/30",
  "grove-amber": "bg-grove-amber/20 border-grove-amber/30",
  "grove-bark": "bg-grove-bark/20 border-grove-bark/30",
};

const MemoryPile = ({
  pile,
  index,
  reducedMotion,
  onPileNotice,
  isNoticed,
}: {
  pile: (typeof memoryPiles)[0];
  index: number;
  reducedMotion: boolean;
  onPileNotice: (id: string) => void;
  isNoticed: boolean;
}) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: pile.position.x,
        top: pile.position.y,
        transform: `translate(-50%, -50%)`,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        delay: 2 + index * 0.6,
        ease: "easeOut",
      }}
      onClick={() => onPileNotice(pile.id)}
    >
      {/* The pile of items — asymmetric, overlapping */}
      <motion.div
        className="relative"
        animate={
          reducedMotion
            ? {}
            : {
                rotate: [pile.rotation, pile.rotation + 0.5, pile.rotation],
              }
        }
        transition={{
          duration: 12 + index * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {pile.items.map((item, i) => {
          const size = sizeMap[item.size as keyof typeof sizeMap];
          // Organic offset — each item slightly displaced from center
          const angle = (i / pile.items.length) * Math.PI * 2 + index;
          const radius = size.offset + i * 4;
          const offsetX = Math.cos(angle) * radius;
          const offsetY = Math.sin(angle) * radius;

          return (
            <motion.div
              key={item.id}
              className={`
                ${size.w} rounded-[3rem] border backdrop-blur-sm
                ${colorMap[item.color]}
                flex items-center justify-center
                ${i === 0 ? "relative" : "absolute"}
                transition-shadow duration-700
              `}
              style={{
                left: i === 0 ? 0 : `calc(50% + ${offsetX}px)`,
                top: i === 0 ? 0 : `calc(50% + ${offsetY}px)`,
                transform: i === 0 ? "none" : "translate(-50%, -50%)",
                zIndex: pile.items.length - i,
              }}
              whileHover={{ scale: 1.05 }}
              animate={
                reducedMotion
                  ? {}
                  : {
                      y: [0, -2 - i, 0],
                    }
              }
              transition={{
                duration: 6 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <span className="text-muted-foreground/40 text-lg select-none">
                {typeIcon[item.type]}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Pile label — appears only when noticed */}
      <AnimatePresence>
        {isNoticed && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-body text-xs text-muted-foreground/60 text-center mt-4 whitespace-nowrap"
          >
            {pile.label}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FloatingMote = ({
  delay,
  x,
  y,
  size,
  opacity,
  reducedMotion,
}: {
  delay: number;
  x: string;
  y: string;
  size: number;
  opacity: number;
  reducedMotion: boolean;
}) => (
  <motion.div
    className="absolute rounded-full bg-grove-sage/[var(--mote-opacity)]"
    style={
      {
        left: x,
        top: y,
        width: size,
        height: size,
        "--mote-opacity": opacity,
      } as React.CSSProperties
    }
    animate={
      reducedMotion
        ? {}
        : {
            y: [0, -6, 0],
            opacity: [opacity, opacity * 1.2, opacity],
          }
    }
    transition={{
      duration: 10 + delay * 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const GuidedTendingSession = () => {
  const reducedMotion = useReducedMotion() ?? false;
  const [noticedPiles, setNoticedPiles] = useState<Set<string>>(new Set());

  const handlePileNotice = (id: string) => {
    setNoticedPiles((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-grove-clearing flex flex-col relative overflow-hidden">
      {/* Atmosphere */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={
          reducedMotion
            ? {}
            : {
                background: [
                  "radial-gradient(ellipse 800px 500px at 40% 35%, hsl(var(--grove-sage) / 0.04), transparent)",
                  "radial-gradient(ellipse 800px 500px at 55% 50%, hsl(var(--grove-sage) / 0.06), transparent)",
                  "radial-gradient(ellipse 800px 500px at 40% 35%, hsl(var(--grove-sage) / 0.04), transparent)",
                ],
              }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <FloatingMote delay={0} x="8%" y="15%" size={80} opacity={0.025} reducedMotion={reducedMotion} />
      <FloatingMote delay={2.5} x="85%" y="20%" size={55} opacity={0.035} reducedMotion={reducedMotion} />
      <FloatingMote delay={4} x="75%" y="75%" size={65} opacity={0.025} reducedMotion={reducedMotion} />
      <FloatingMote delay={1.5} x="15%" y="80%" size={45} opacity={0.03} reducedMotion={reducedMotion} />

      {/* Quiet header presence */}
      <motion.div
        className="relative z-10 pt-12 pb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.img
          src={groveLogo}
          alt="GroveKeeper"
          className="w-7 h-7 mx-auto mb-6 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.p
          className="font-display text-xl md:text-2xl font-medium text-foreground/80"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          We're here together.
        </motion.p>
      </motion.div>

      {/* The Clearing — natural memory piles */}
      <div className="flex-1 relative z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          {memoryPiles.map((pile, i) => (
            <MemoryPile
              key={pile.id}
              pile={pile}
              index={i}
              reducedMotion={reducedMotion}
              onPileNotice={handlePileNotice}
              isNoticed={noticedPiles.has(pile.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Gentle orientation */}
      <motion.div
        className="relative z-10 pb-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 4.5 }}
      >
        <p className="font-body text-sm text-muted-foreground/50">
          {noticedPiles.size === 0
            ? "Notice what's gathered here"
            : noticedPiles.size < memoryPiles.length
              ? "There's more, when you're ready"
              : "Your grove is beginning to take shape"}
        </p>
      </motion.div>
    </div>
  );
};

export default GuidedTendingSession;
