import { FileType, FILE_TYPE_META } from "@/lib/clearingData";

interface FilterBarProps {
  activeFilter: FileType | "all";
  onFilterChange: (filter: FileType | "all") => void;
}

const filters: Array<FileType | "all"> = ["all", "photo", "doc", "note", "audio", "video", "sheet"];

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-2 px-4 py-4">
      {filters.map((f) => {
        const isActive = activeFilter === f;
        const label = f === "all" ? "All" : `${FILE_TYPE_META[f].emoji} ${FILE_TYPE_META[f].label}`;

        return (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-1.5 rounded-full font-display text-sm transition-all duration-200 ${
              isActive
                ? "bg-grove-moss text-primary-foreground shadow-sm"
                : "bg-card/60 text-foreground/60 hover:bg-card hover:text-foreground/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
