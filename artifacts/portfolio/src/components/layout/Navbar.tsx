import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '#projects' },
  { label: 'Articles', href: '/articles' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '#contact' },
];

function SwiftIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 512 512" 
      className={cn("fill-current", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M422.3 398.2c-55.8 45-125.7 66.8-197.8 62.4 83.2-46.7 131.6-117.3 125.2-205.8-2 36.3-15.6 70.9-39.1 97.4-44.5 50-109.8 72-171 63.8 54.4-23.7 94.6-67.9 107.5-125.7-18 10-38.3 16.4-59.5 18.9-57.8 6.7-111.4-20.9-138.8-68.8 38.6 3 77.2-7 106.8-30.8-63.5-3.3-112.5-40-128.4-98 29.5 6.3 60.1 2.3 87.2-11.8-68.9-21.7-109-72.2-108.6-141.2 38.9 33.1 89.9 52.3 143.1 52.9-7.8-51.5 5.5-103.8 38.4-143.9 8.2-10 17.5-18.7 27.6-26.1-9.9 23.4-10.9 49.3-3.1 73.4 9 27.8 28.5 50.4 54.6 63.4-1.2-5.7-1.8-11.6-1.8-17.5 0-48.4 34.4-89.9 81.3-99.3 5-1 9.9-1.5 14.9-1.5 2.1 0 4.1.1 6.2.2-10.9 13.9-17 31.2-17.1 49.1-.1 26.6 13.7 51 36.5 64.6-4.3-12.7-4-26.4.8-38.7 11.2-28.7 39-46.9 69.8-45.9 3.2.1 6.5.4 9.7.9-2.9 6.2-7 11.8-12 16.5-17.3 16.3-25.9 40-23.1 63.6 2.3 19.3 12.3 36.7 27.7 48.2 1.4-13.8 8.4-26.4 19.5-34.9 12-9.2 27.2-13.2 42.1-11.2 5.1.7 10 2.2 14.7 4.5-31.5 35.8-32.9 89.2-3.1 126.6 4.9 6.2 10.6 11.7 17.1 16.4-19-1.8-38 .6-55 7.1-23.6 9-42.8 26.9-53.8 50.1 27.4-4 55.4 3 77.9 19.4-46.3 9.4-84.3 37.1-105.1 76.7 44.5-11.6 91.5-3.3 129.5 22.8-51.5 32-114.7 41.5-174.4 26.1 48 37.3 107.5 50.2 169.5 36.7z" />
    </svg>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors rounded-sm border border-border bg-muted/20"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      if (location !== '/') {
        setLocation('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      setLocation(href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-background/80 backdrop-blur-md border-border/50 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-border/50 group-hover:border-primary/50 transition-all duration-300">
            <img 
              src="/profile.jpg" 
              alt="Srinivas Prayag Sahu" 
              className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight leading-none uppercase group-hover:text-primary transition-colors duration-300">Srinivas Prayag Sahu</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-1">iOS Developer</span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 mr-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          <ThemeToggle />

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/80 backdrop-blur-xl border-b border-border absolute top-full left-0 right-0 overflow-hidden shadow-lg"
          >
            <nav className="flex flex-col py-4 px-6 gap-4 h-full">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.href, e)}
                  className="text-sm font-mono text-foreground hover:text-primary transition-colors uppercase tracking-wider py-2 border-b border-border/50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
