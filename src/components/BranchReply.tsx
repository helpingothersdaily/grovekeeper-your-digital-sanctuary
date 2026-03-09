import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const dispatchBranchEngaged = (branchId: string, originRect: DOMRect) => {
  window.dispatchEvent(new CustomEvent('BranchEngaged', {
    detail: { branchId, originRect }
  }));
};

interface BranchState {
  branchId: string;
  originRect: DOMRect;
  targetPos: { x: number, y: number };
}

export const BranchReply = () => {
  const [activeBranch, setActiveBranch] = useState<BranchState | null>(null);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const handleEngaged = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { branchId, originRect } = customEvent.detail;
      
      // Target center of screen for the bubble
      const targetX = window.innerWidth / 2;
      const targetY = window.innerHeight / 2;
      
      setActiveBranch({
        branchId,
        originRect,
        targetPos: { x: targetX, y: targetY }
      });
      setShowBubble(false);

      setTimeout(() => {
        setShowBubble(true);
        window.dispatchEvent(new CustomEvent('BuddingTriggered', {
          detail: { branchId }
        }));
      }, 600);
    };

    const handleReleased = () => {
      setActiveBranch(null);
      setShowBubble(false);
    };

    window.addEventListener('BranchEngaged', handleEngaged);
    window.addEventListener('BranchReleased', handleReleased);

    return () => {
      window.removeEventListener('BranchEngaged', handleEngaged);
      window.removeEventListener('BranchReleased', handleReleased);
    };
  }, []);

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent('BranchReleased'));
  };

  if (!activeBranch) return null;

  const { originRect, targetPos } = activeBranch;
  
  const startX = originRect.left + originRect.width / 2;
  const startY = originRect.top + originRect.height / 2;
  
  const pathD = `M ${startX},${startY} C ${startX},${startY + 120} ${targetPos.x},${targetPos.y - 120} ${targetPos.x},${targetPos.y}`;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d={pathD}
          stroke="hsl(var(--grove-sage))"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </svg>

      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            style={{ left: targetPos.x, top: targetPos.y }}
          >
            <div className="grove-glass rounded-[3rem] p-6 shadow-xl flex items-start gap-4 min-w-[320px] border border-white/20 bg-white/40 backdrop-blur-md">
              <textarea
                placeholder="a new branch..."
                className="w-full bg-transparent border-none outline-none resize-none font-display italic text-[hsl(var(--grove-moss))] placeholder:text-[hsl(var(--grove-moss))]/50 min-h-[80px] text-lg"
                autoFocus
              />
              <button
                onClick={handleClose}
                className="text-[hsl(var(--grove-amber))] hover:opacity-80 transition-opacity p-2 rounded-full hover:bg-black/5 flex-shrink-0"
                aria-label="Close branch"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BranchReply;
