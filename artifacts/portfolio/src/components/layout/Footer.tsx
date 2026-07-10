import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border/50 py-8 bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold uppercase tracking-wider text-sm">Srinivas Prayag Sahu</span>
          <span className="text-xs font-mono text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="https://linkedin.com/in/srinivas-prayagsahu" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono uppercase">LinkedIn</a>
          <a href="https://srinivasprayag.medium.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono uppercase">Medium</a>
          <a href="mailto:sprayagsahu@gmail.com" className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono uppercase">Email</a>
        </div>
        
        <button 
          onClick={scrollToTop}
          className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
