import { ClearingCard } from "@/lib/clearingData";
import { Leaf } from "lucide-react";
import { dispatchBranchEngaged } from "@/components/BranchReply";

interface FileCardProps {
  card: ClearingCard;
  style: React.CSSProperties;
  filtered: boolean;
}

const PhotoPreview = ({ id, caption }: { id: string; caption: string }) => (
  <div className="w-full h-[88px] rounded-[1.75rem] overflow-hidden">
    <img
      src={`https://picsum.photos/seed/${id}/300/200`}
      alt={caption}
      className="w-full h-full object-cover"
    />
  </div>
);

const DocPreview = ({ ext }: { ext?: string }) => (
  <div className="w-full h-[88px] rounded-[1.75rem] bg-[hsl(38_40%_88%)] relative overflow-hidden flex flex-col justify-center px-4 gap-1.5">
    {/* Folded corner */}
    <div className="absolute top-0 right-0 w-6 h-6">
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[24px] border-l-transparent border-t-[24px] border-t-[hsl(38_30%_80%)]" />
    </div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-[1px] bg-[hsl(25_30%_70%/0.3)] w-full" />
    ))}
    <span className="absolute bottom-2 right-3 text-[9px] font-body font-semibold text-grove-bark/50 uppercase tracking-wider">
      {ext || "doc"}
    </span>
  </div>
);

const NotePreview = () => (
  <div className="w-full h-[88px] rounded-[1.75rem] bg-[hsl(38_55%_85%)] relative flex flex-col justify-center px-4 gap-2">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="h-[1px] bg-grove-bark/20"
        style={{ width: `${70 - i * 15}%`, fontStyle: "italic" }}
      />
    ))}
    <span className="absolute bottom-2 right-3 text-lg opacity-40">✒</span>
  </div>
);

const AudioPreview = ({ dur }: { dur?: string }) => (
  <div className="w-full h-[88px] rounded-[1.75rem] bg-[hsl(142_20%_88%)] flex items-center justify-center gap-[3px] relative px-3">
    {[28, 18, 38, 24, 42, 16, 34, 20, 36, 22, 40, 18, 30].map((h, i) => (
      <div
        key={i}
        className="w-[3px] rounded-full bg-grove-moss/60 animate-wave-pulse"
        style={{
          height: `${h}%`,
          animationDelay: `${i * 0.12}s`,
        }}
      />
    ))}
    <span className="absolute bottom-2 right-3 text-[9px] font-body text-grove-bark/50">
      {dur || "2:34"}
    </span>
  </div>
);

const VideoPreview = ({ dur }: { dur?: string }) => (
  <div className="w-full h-[88px] rounded-[1.75rem] bg-[hsl(220_10%_18%)] relative flex items-center justify-center overflow-hidden">
    {/* Filmstrip */}
    <div className="absolute top-0 left-0 right-0 h-3 flex">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex-1 border-r border-white/10 bg-white/5" />
      ))}
    </div>
    <span className="text-white/80 text-2xl">▶</span>
    <span className="absolute bottom-2 right-3 text-[9px] font-body text-white/40">
      {dur || "0:48"}
    </span>
  </div>
);

const SheetPreview = () => (
  <div className="w-full h-[88px] rounded-[1.75rem] bg-[hsl(138_15%_90%)] p-2 overflow-hidden">
    <div className="grid grid-cols-4 grid-rows-5 gap-[2px] w-full h-full">
      {[...Array(20)].map((_, i) => {
        const isHeader = i < 4;
        const isValue = !isHeader && i % 3 === 0;
        return (
          <div
            key={i}
            className={`rounded-sm ${
              isHeader
                ? "bg-grove-moss/15"
                : isValue
                  ? "bg-grove-sage/15"
                  : "bg-white/30"
            }`}
          />
        );
      })}
    </div>
  </div>
);

const previewMap: Record<string, React.FC<any>> = {
  photo: PhotoPreview,
  doc: DocPreview,
  note: NotePreview,
  audio: AudioPreview,
  video: VideoPreview,
  sheet: SheetPreview,
};

const FileCard = ({ card, style, filtered }: FileCardProps) => {
  const Preview = previewMap[card.type];

  return (
    <div
      className={`absolute w-[188px] clearing-card transition-all duration-300 ${
        filtered ? "opacity-[0.08] pointer-events-none" : "opacity-100"
      }`}
      style={style}
    >
      {/* Substrate glyph */}
      <span className="absolute top-2 right-3 text-[10px] text-grove-bark/20 font-display select-none">
        ⌇
      </span>

      <Preview id={card.id} caption={card.caption} ext={card.ext} dur={card.dur} />

      <p className="font-display text-xs text-foreground/70 text-center leading-relaxed mt-2 px-1">
        {card.caption}
      </p>

      {/* Branch button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          dispatchBranchEngaged(card.id, e.currentTarget.getBoundingClientRect());
        }}
        className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-display text-grove-sage hover:opacity-80 transition-opacity z-10"
      >
        <Leaf size={10} />
        branch
      </button>
    </div>
  );
};

export default FileCard;
