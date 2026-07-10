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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 border border-border bg-muted/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Available for new opportunities</span>
          </motion.div>

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
                <div className="-rotate-45 font-mono text-6xl text-background font-bold tracking-tighter mix-blend-difference">
                  SPS
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
