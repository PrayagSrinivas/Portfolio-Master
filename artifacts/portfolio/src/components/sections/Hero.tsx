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
              <div className="w-36 h-36 rounded-[2rem] bg-muted/10 border border-border/60 flex items-center justify-center backdrop-blur-md shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/15 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg" 
                  alt="Apple Logo"
                  className="w-16 h-16 dark:invert opacity-90 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Orbiting Logo 1: Swift (Top Left) */}
            <motion.div 
              animate={{ y: [0, -16, 0], x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-4 left-4 w-18 h-18 rounded-[1.25rem] overflow-hidden shadow-lg shadow-red-500/10 border border-white/10 group cursor-pointer"
            >
              <img 
                src="https://www.vectorlogo.zone/logos/swift/swift-icon.svg" 
                alt="Swift Programming Language"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            {/* Orbiting Logo 2: SwiftUI (Top Right) */}
            <motion.div 
              animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-8 right-8 w-18 h-18 rounded-[1.25rem] bg-muted/10 border border-[#007AFF]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <img 
                src="https://img.icons8.com/color/512/swiftui.png" 
                alt="SwiftUI Framework"
                className="w-12 h-12 transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            {/* Orbiting Logo 3: App Store (Middle Right) */}
            <motion.div 
              animate={{ y: [0, -12, 0], x: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/2 -translate-y-1/2 -right-8 w-18 h-18 rounded-[1.25rem] overflow-hidden shadow-lg shadow-blue-500/10 border border-white/10 group cursor-pointer"
            >
              <img 
                src="https://www.vectorlogo.zone/logos/apple_appstore/apple_appstore-icon.svg" 
                alt="App Store Connect"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            {/* Orbiting Logo 4: TestFlight (Bottom Right) */}
            <motion.div 
              animate={{ y: [0, 16, 0], x: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-6 right-6 w-18 h-18 rounded-[1.25rem] overflow-hidden bg-muted/10 border border-[#00C7FC]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <img 
                src="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/dd/85/68/dd856873-5ed1-e70e-750a-b826aaa80c64/AppIcon-0-1x_U007epad-0-1-0-P3-85-220-0.png/512x512bb.jpg" 
                alt="TestFlight Beta Testing"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            {/* Orbiting Logo 5: Database / CoreData (Bottom Left) */}
            <motion.div 
              animate={{ y: [0, -10, 0], x: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-8 left-4 w-18 h-18 rounded-[1.25rem] bg-muted/10 border border-[#AF52DE]/30 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <img 
                src="https://img.icons8.com/color/512/database.png" 
                alt="CoreData & SwiftData Database"
                className="w-10 h-10 transition-transform duration-300 group-hover:scale-110"
              />
            </motion.div>

            {/* Orbiting Logo 6: GitHub (Middle Left) */}
            <motion.div 
              animate={{ y: [0, 10, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-1/2 -translate-y-1/2 -left-8 w-18 h-18 rounded-[1.25rem] bg-muted/10 border border-border/50 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer"
            >
              <img 
                src="https://www.vectorlogo.zone/logos/github/github-icon.svg" 
                alt="GitHub Version Control"
                className="w-10 h-10 dark:invert opacity-90 transition-transform duration-300 group-hover:scale-110"
              />
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
