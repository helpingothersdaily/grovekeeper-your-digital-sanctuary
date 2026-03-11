export type FileType = "photo" | "doc" | "note" | "audio" | "video" | "sheet";

export interface ClearingCard {
  id: string;
  caption: string;
  type: FileType;
  ext?: string;
  dur?: string;
}

export interface ClearingCluster {
  id: string;
  defaultLabel: string;
  cards: ClearingCard[];
}

export const FILE_TYPE_META: Record<FileType, { emoji: string; label: string }> = {
  photo:  { emoji: "🖼", label: "Memories" },
  doc:    { emoji: "📄", label: "Chapters" },
  note:   { emoji: "🌱", label: "Branches" },
  audio:  { emoji: "🎵", label: "Echoes" },
  video:  { emoji: "🎞", label: "Moments" },
  sheet:  { emoji: "📊", label: "Ledgers" },
};

export const clusters: ClearingCluster[] = [
  {
    id: "house-project",
    defaultLabel: "The House Project",
    cards: [
      { id: "hp1", caption: "Mortgage paperwork", type: "doc", ext: "pdf" },
      { id: "hp2", caption: "Before — front door", type: "photo" },
      { id: "hp3", caption: "Things to fix first", type: "note" },
      { id: "hp4", caption: "Renovation budget", type: "sheet" },
    ],
  },
  {
    id: "summer-2019",
    defaultLabel: "Summer 2019",
    cards: [
      { id: "s1", caption: "Last day at the lake", type: "photo" },
      { id: "s2", caption: "Road trip, day two", type: "photo" },
      { id: "s3", caption: "Sunset from the cabin", type: "video", dur: "1:12" },
      { id: "s4", caption: "Morning recording", type: "audio", dur: "3:07" },
      { id: "s5", caption: "Things I wanted to remember", type: "note" },
    ],
  },
  {
    id: "work-pivot",
    defaultLabel: "Work — The Pivot",
    cards: [
      { id: "wp1", caption: "Strategy brief v3", type: "doc" },
      { id: "wp2", caption: "Q2 projections", type: "sheet" },
      { id: "wp3", caption: "What I told the team", type: "note" },
      { id: "wp4", caption: "Board deck — final", type: "doc", ext: "pdf" },
    ],
  },
  {
    id: "mum-dad",
    defaultLabel: "Mum & Dad",
    cards: [
      { id: "md1", caption: "Christmas 2021", type: "photo" },
      { id: "md2", caption: "Voicemail — keep", type: "audio", dur: "0:42" },
      { id: "md3", caption: "Garden, late summer", type: "photo" },
      { id: "md4", caption: "Dad\u2019s recipe", type: "doc", ext: "pdf" },
    ],
  },
  {
    id: "learning",
    defaultLabel: "Learning",
    cards: [
      { id: "l1", caption: "Notes from the course", type: "note" },
      { id: "l2", caption: "Lecture recording", type: "audio", dur: "48:12" },
      { id: "l3", caption: "Certificate", type: "doc", ext: "pdf" },
    ],
  },
];
