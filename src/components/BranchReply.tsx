import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { calcVinePath, calcBubblePosition, calcVineLength, VinePoint } from '@/lib/vineUtils';

export const dispatchBranchEngaged = (branchId: string, originRect: DOMRect) => {
  window.dispatchEvent(new CustomEvent('BranchEngaged', {
    detail: { branchId, originRect }
  }));
};

interface BranchState {
  branchId: string;
  originRect: DOMRect;
  targetPos: VinePoint;
}

export const BranchReply = () => {
  const [activeBranch, setActiveBranch] = useState<BranchState | null>(null);
  const [showBubble, setShowBubble] = useState(false);
  const [dashOffset, setDashOffset] = useState<number | null>(null);

  useEffect(() => {
    const handleEngaged = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { branchId, originRect } = customEvent.detail;
      
      // Calculate bubble position using utility
      const targetPos = calcBubblePosition(
        originRect,
        window.innerWidth,
        window.innerHeight
      );
      
      setActiveBranch({
        branchId,
        originRect,
        targetPos
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
      setDashOffset(null);
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
  
  const origin: VinePoint = {
    x: originRect.left + originRect.width / 2,
    y: originRect.top + originRect.height / 2
  };
  
  const pathD = calcVinePath(origin, targetPos);
  const vineLength = calcVineLength(origin, targetPos);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.path
          d={pathD}
          stroke="hsl(var(--grove-sage))"
          strokeWidth="2"
          fill="none"
          strokeDasharray={vineLength}
          strokeDashoffset={vineLength}
          initial={{ strokeDashoffset: vineLength }}
          animate={{ strokeDashoffset: 0 }}
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
