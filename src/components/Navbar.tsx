import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import groveLogo from "@/assets/grove-logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-3">
          <img src={groveLogo} alt="GroveKeeper" className="w-8 h-8" />
          <span className="font-display text-2xl font-semibold text-foreground">
            GroveKeeper
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-body text-sm text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</a>
          <a href="#tending" className="hover:text-foreground transition-colors">Tending Modes</a>
          <a href="#branchreply" className="hover:text-foreground transition-colors">BranchReply</a>
          <a href="#grove-report" className="hover:text-foreground transition-colors">Grove Report</a>
          <button onClick={() => navigate("/fallen-leaves")} className="hover:text-foreground transition-colors">Fallen Leaves</button>
        </div>
        <button onClick={() => navigate("/first-grove")} className="bg-primary text-primary-foreground font-body text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
          Begin Tending
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
