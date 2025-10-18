import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-mono" >
            © {new Date().getFullYear()} Michel Akerele. Built with passion.
          </p>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
           
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
