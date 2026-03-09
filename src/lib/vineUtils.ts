// vineUtils.ts
// Calculates SVG cubic bezier path between two screen points
// Used by BranchReply to draw organic vine connections

export interface VinePoint {
  x: number;
  y: number;
}

export const calcVinePath = (origin: VinePoint, target: VinePoint): string => {
  const controlOffset = Math.abs(target.y - origin.y) * 0.6;
  return `M ${origin.x},${origin.y} C ${origin.x},${origin.y + controlOffset} ${target.x},${target.y - controlOffset} ${target.x},${target.y}`;
};

export const calcBubblePosition = (
  originRect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
): VinePoint => {
  // Float the bubble to the right if origin is left-of-center, and vice versa
  const goRight = originRect.left < viewportWidth / 2;
  return {
    x: goRight
      ? Math.min(originRect.right + 180, viewportWidth - 280)
      : Math.max(originRect.left - 180, 60),
    y: Math.min(originRect.top + 60, viewportHeight - 240),
  };
};

export const calcVineLength = (origin: VinePoint, target: VinePoint): number => {
  // Approximate path length for stroke-dasharray animation
  const dx = target.x - origin.x;
  const dy = target.y - origin.y;
  return Math.sqrt(dx * dx + dy * dy) * 1.4; // 1.4 accounts for curve length
};
