import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/portfolio-button';
import { Github, Linkedin, Mail, Twitter, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20">
      {/* Technical grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6"
          >
            Building <span className="text-primary">precise</span> mobile architectures.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed"
          >
            I'm a Senior iOS Engineer with 4+ years of experience crafting consumer and enterprise apps using Swift, SwiftUI, and UIKit. I obsess over performance, clean architecture, and fluid user experiences.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button href="#projects" variant="primary">
              View My Apps <ArrowRight size={16} className="ml-2" />
            </Button>
            <Button href="#articles" variant="outline">
              Read My Articles
            </Button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          {/* Abstract Avatar / Technical Illustration */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute inset-8 border border-border/50 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-16 border border-border border-dashed rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 bg-foreground rounded-sm rotate-45 border border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.1)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="-rotate-45 w-24 h-24 text-background mix-blend-difference p-2">
                  <svg 
                    viewBox="0 0 512 512" 
                    className="w-full h-full fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M422.3 398.2c-55.8 45-125.7 66.8-197.8 62.4 83.2-46.7 131.6-117.3 125.2-205.8-2 36.3-15.6 70.9-39.1 97.4-44.5 50-109.8 72-171 63.8 54.4-23.7 94.6-67.9 107.5-125.7-18 10-38.3 16.4-59.5 18.9-57.8 6.7-111.4-20.9-138.8-68.8 38.6 3 77.2-7 106.8-30.8-63.5-3.3-112.5-40-128.4-98 29.5 6.3 60.1 2.3 87.2-11.8-68.9-21.7-109-72.2-108.6-141.2 38.9 33.1 89.9 52.3 143.1 52.9-7.8-51.5 5.5-103.8 38.4-143.9 8.2-10 17.5-18.7 27.6-26.1-9.9 23.4-10.9 49.3-3.1 73.4 9 27.8 28.5 50.4 54.6 63.4-1.2-5.7-1.8-11.6-1.8-17.5 0-48.4 34.4-89.9 81.3-99.3 5-1 9.9-1.5 14.9-1.5 2.1 0 4.1.1 6.2.2-10.9 13.9-17 31.2-17.1 49.1-.1 26.6 13.7 51 36.5 64.6-4.3-12.7-4-26.4.8-38.7 11.2-28.7 39-46.9 69.8-45.9 3.2.1 6.5.4 9.7.9-2.9 6.2-7 11.8-12 16.5-17.3 16.3-25.9 40-23.1 63.6 2.3 19.3 12.3 36.7 27.7 48.2 1.4-13.8 8.4-26.4 19.5-34.9 12-9.2 27.2-13.2 42.1-11.2 5.1.7 10 2.2 14.7 4.5-31.5 35.8-32.9 89.2-3.1 126.6 4.9 6.2 10.6 11.7 17.1 16.4-19-1.8-38 .6-55 7.1-23.6 9-42.8 26.9-53.8 50.1 27.4-4 55.4 3 77.9 19.4-46.3 9.4-84.3 37.1-105.1 76.7 44.5-11.6 91.5-3.3 129.5 22.8-51.5 32-114.7 41.5-174.4 26.1 48 37.3 107.5 50.2 169.5 36.7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating tech badges */}
            <div className="absolute top-1/4 -left-4 glass-panel px-3 py-1.5 text-xs font-mono border-l-2 border-l-primary">SwiftUI</div>
            <div className="absolute bottom-1/4 -right-4 glass-panel px-3 py-1.5 text-xs font-mono border-l-2 border-l-primary">Architecture</div>
            <div className="absolute top-10 right-10 glass-panel px-3 py-1.5 text-xs font-mono border-l-2 border-l-primary">Concurrency</div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
}
