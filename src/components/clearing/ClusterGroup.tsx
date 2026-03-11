import { useState, useRef, useEffect } from "react";
import { ClearingCard, ClearingCluster, FileType } from "@/lib/clearingData";
import FileCard from "./FileCard";

interface ClusterGroupProps {
  cluster: ClearingCluster;
  activeFilter: FileType | "all";
  centerX: number;
  centerY: number;
}

/** Scatter cards in a circle around the cluster center using trig */
const getScatterPosition = (index: number, total: number, centerX: number, centerY: number) => {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 75 + Math.random() * 40; // 75-115px as per brief
  // Use deterministic "random" based on index
  const r = 75 + ((index * 37) % 40);
  const x = centerX + Math.cos(angle) * r - 94; // half card width
  const y = centerY + Math.sin(angle) * r - 70; // half card height approx
  // slight random rotation
  const rot = ((index * 17) % 5) - 2; // -2 to +2
  return { left: x, top: y, transform: `rotate(${rot}deg)`, zIndex: index };
};

const ClusterGroup = ({ cluster, activeFilter, centerX, centerY }: ClusterGroupProps) => {
  const [label, setLabel] = useState(cluster.defaultLabel);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute" style={{ left: 0, top: 0, width: "100%", height: "100%" }}>
      {/* Renameable label */}
      <div
        className="absolute z-10 -translate-x-1/2 flex flex-col items-center"
        style={{ left: centerX, top: centerY - 110 }}
        onMouseEnter={() => setShowHint(true)}
        onMouseLeave={() => setShowHint(false)}
      >
        <input
          ref={inputRef}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.blur()}
          className="bg-transparent border-none outline-none text-center font-display text-lg text-foreground/50 hover:border-b hover:border-dashed hover:border-grove-amber focus:border-b-2 focus:border-solid focus:border-grove-moss transition-all w-auto min-w-[80px] max-w-[220px]"
          style={{
            borderBottom: showHint ? "1px dashed hsl(var(--grove-amber))" : "1px solid transparent",
          }}
        />
        <span
          className={`text-[10px] font-body text-grove-amber/60 mt-1 transition-opacity duration-200 ${
            showHint ? "opacity-100" : "opacity-0"
          }`}
        >
          click to rename
        </span>
      </div>

      {/* Scattered cards */}
      {cluster.cards.map((card, i) => {
        const pos = getScatterPosition(i, cluster.cards.length, centerX, centerY);
        const isFiltered = activeFilter !== "all" && card.type !== activeFilter;

        return (
          <FileCard
            key={card.id}
            card={card}
            style={pos}
            filtered={isFiltered}
          />
        );
      })}
    </div>
  );
};

export default ClusterGroup;
