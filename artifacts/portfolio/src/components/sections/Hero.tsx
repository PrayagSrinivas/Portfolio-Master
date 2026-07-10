import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/portfolio-button';
import { ArrowRight } from 'lucide-react';

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

        {/* Dynamic floating logo orbit system */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Ambient background glows */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute inset-10 bg-blue-500/5 rounded-full blur-3xl mix-blend-screen" />
            
            {/* Technical concentric orbital rings */}
            <div className="absolute inset-8 border border-border/40 rounded-full animate-[spin_80s_linear_infinite]" />
            <div className="absolute inset-20 border border-border/30 border-dashed rounded-full animate-[spin_50s_linear_infinite_reverse]" />
            <div className="absolute inset-32 border border-border/20 rounded-full" />
            
            {/* Center Core: Apple Developer Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-3xl bg-muted/10 border border-border/60 flex items-center justify-center backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <svg viewBox="0 0 170 170" className="w-12 h-12 fill-foreground/90 transition-transform duration-500 group-hover:scale-105">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.15-2.88-2.38-6.67-6.85-11.37-13.41-6.15-8.62-11.24-18.76-15.25-30.41-4.01-11.64-6.02-22.95-6.02-33.91 0-16.1 4.21-29.43 12.62-39.99 8.41-10.56 19.01-15.95 31.8-16.18 5.75 0 11.96 1.7 18.64 5.1 6.68 3.4 11.32 5.1 13.9 5.1 2.11 0 6.64-1.8 13.6-5.4 6.96-3.6 13.06-5.22 18.3-4.86 15.66.86 27.53 6.97 35.61 18.33-13.25 8.12-19.68 19.34-19.31 33.66.36 10.63 4.41 19.46 12.16 26.49 7.74 7.03 16.94 10.86 27.61 11.49-2.45 7.16-5.69 14.16-9.72 21.02zM119.22 16.92c0 8.01-2.9 15.52-8.7 22.52-5.8 7-12.98 11.53-21.52 13.6-1.12.23-2.28.35-3.48.35-1 0-2.02-.12-3.08-.35 1-8.52 4.14-16.32 9.42-23.41 5.27-7.09 12.44-11.87 21.52-14.34 1.13-.24 2.22-.36 3.29-.36.95 0 2 .12 3.05.39z"/>
                </svg>
              </div>
            </div>

            {/* Orbiting Logo 1: Swift (Top Left) */}
            <motion.div 
              animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-6 w-14 h-14 rounded-2xl bg-[#F05138] flex items-center justify-center shadow-lg shadow-red-500/10 border border-white/10 group cursor-pointer"
            >
              <svg viewBox="0 0 512 512" fill="white" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                <path d="M422.3 398.2c-55.8 45-125.7 66.8-197.8 62.4 83.2-46.7 131.6-117.3 125.2-205.8-2 36.3-15.6 70.9-39.1 97.4-44.5 50-109.8 72-171 63.8 54.4-23.7 94.6-67.9 107.5-125.7-18 10-38.3 16.4-59.5 18.9-57.8 6.7-111.4-20.9-138.8-68.8 38.6 3 77.2-7 106.8-30.8-63.5-3.3-112.5-40-128.4-98 29.5 6.3 60.1 2.3 87.2-11.8-68.9-21.7-109-72.2-108.6-141.2 38.9 33.1 89.9 52.3 143.1 52.9-7.8-51.5 5.5-103.8 38.4-143.9 8.2-10 17.5-18.7 27.6-26.1-9.9 23.4-10.9 49.3-3.1 73.4 9 27.8 28.5 50.4 54.6 63.4-1.2-5.7-1.8-11.6-1.8-17.5 0-48.4 34.4-89.9 81.3-99.3 5-1 9.9-1.5 14.9-1.5 2.1 0 4.1.1 6.2.2-10.9 13.9-17 31.2-17.1 49.1-.1 26.6 13.7 51 36.5 64.6-4.3-12.7-4-26.4.8-38.7 11.2-28.7 39-46.9 69.8-45.9 3.2.1 6.5.4 9.7.9-2.9 6.2-7 11.8-12 16.5-17.3 16.3-25.9 40-23.1 63.6 2.3 19.3 12.3 36.7 27.7 48.2 1.4-13.8 8.4-26.4 19.5-34.9 12-9.2 27.2-13.2 42.1-11.2 5.1.7 10 2.2 14.7 4.5-31.5 35.8-32.9 89.2-3.1 126.6 4.9 6.2 10.6 11.7 17.1 16.4-19-1.8-38 .6-55 7.1-23.6 9-42.8 26.9-53.8 50.1 27.4-4 55.4 3 77.9 19.4-46.3 9.4-84.3 37.1-105.1 76.7 44.5-11.6 91.5-3.3 129.5 22.8-51.5 32-114.7 41.5-174.4 26.1 48 37.3 107.5 50.2 169.5 36.7z" />
              </svg>
            </motion.div>

            {/* Orbiting Logo 2: SwiftUI (Top Right) */}
            <motion.div 
              animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-10 right-10 w-14 h-14 rounded-2xl bg-[#007AFF]/10 border border-[#007AFF]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 transition-transform duration-300 group-hover:scale-110">
                <g stroke="#00C7FC" strokeWidth="3.5" strokeLinecap="round">
                  <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(-45 32 32)" />
                  <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(15 32 32)" />
                  <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(75 32 32)" />
                </g>
              </svg>
            </motion.div>

            {/* Orbiting Logo 3: App Store (Middle Right) */}
            <motion.div 
              animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 -right-6 w-14 h-14 rounded-2xl bg-[#007AFF] flex items-center justify-center shadow-lg shadow-blue-500/10 border border-white/10 group cursor-pointer"
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                <path d="M32 12L15 44h34L32 12z" stroke="white" strokeWidth="3.5" strokeLinejoin="round" />
                <path d="M22 34h20" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Orbiting Logo 4: TestFlight (Bottom Right) */}
            <motion.div 
              animate={{ y: [0, 16, 0], x: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-8 right-8 w-14 h-14 rounded-2xl bg-[#1D9BF0]/10 border border-[#00C7FC]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 transition-transform duration-300 group-hover:scale-110">
                <circle cx="32" cy="32" r="18" stroke="#00C7FC" strokeWidth="3" />
                <circle cx="32" cy="32" r="8" stroke="#00C7FC" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M32 10v44M10 32h44" stroke="#00C7FC" strokeWidth="2.5" />
              </svg>
            </motion.div>

            {/* Orbiting Logo 5: Database (Bottom Left) */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-10 left-6 w-14 h-14 rounded-2xl bg-[#AF52DE]/10 border border-[#AF52DE]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <svg viewBox="0 0 64 64" fill="none" stroke="#AF52DE" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 transition-transform duration-300 group-hover:scale-110">
                <path d="M16 16c0-3.3 7.2-6 16-6s16 2.7 16 6M16 16c0 3.3 7.2 6 16 6s16-2.7 16-6M16 16v10c0 3.3 7.2 6 16 6s16-2.7 16-6V16M16 26v10c0 3.3 7.2 6 16 6s16-2.7 16-6V26" />
              </svg>
            </motion.div>

            {/* Orbiting Logo 6: GitHub (Middle Left) */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-1/2 -translate-y-1/2 -left-6 w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center shadow-lg border border-border group cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-background transition-transform duration-300 group-hover:scale-110">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.div>
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
