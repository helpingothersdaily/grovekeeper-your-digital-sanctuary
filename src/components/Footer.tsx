import groveLogo from "@/assets/grove-logo.png";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={groveLogo} alt="GroveKeeper" className="w-6 h-6" />
            <span className="font-display text-lg font-semibold text-foreground">GroveKeeper</span>
          </div>
          <p className="font-body text-sm text-muted-foreground text-center">
            Ecological intelligence for your digital life. Tend with care.
          </p>
          <div className="flex gap-6 font-body text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
