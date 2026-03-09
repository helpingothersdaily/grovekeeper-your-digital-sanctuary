import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export const FieldNote = () => {
  const { toasts, dismiss } = useToast();

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        dismiss(toast.id);
      }, 4000);
      return () => clearTimeout(timer);
    });
  }, [toasts, dismiss]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const isCleared = toast.variant === "destructive" || toast.title?.toString().toLowerCase().includes("clear");
          const isCaution = toast.title?.toString().toLowerCase().includes("caution");
          
          return (
            <motion.div
              key={toast.id}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-[hsl(var(--grove-cream))] border rounded-[3rem] px-6 py-3 shadow-lg pointer-events-auto"
              style={{
                borderColor: isCaution ? 'hsl(var(--grove-amber))' : 'hsl(var(--grove-moss))'
              }}
            >
              <p className="font-display text-lg text-foreground flex items-center gap-2">
                <span>{isCleared ? "🪨" : "🌱"}</span>
                <span>{toast.title || toast.description}</span>
              </p>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
