import React from 'react';
import { motion } from 'framer-motion';
import { TechTag } from '@/components/ui/TechTag';
import { Smartphone, ArrowUpRight } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "Keka",
      subtitle: "Enterprise HRMS Platform",
      description: "Modularized Leave, Attendance & Payroll modules. Drove design-system adoption and UI/UX revamp. Reduced app hangs and memory leaks by 15%. Refactored legacy GCD network layer to async/await.",
      tags: ["Swift", "SwiftUI", "UIKit"],
      featured: true,
      link: "https://apps.apple.com/in/app/keka-hr/id1448024119",
      iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/69/ed/4e/69ed4ebd-186a-c412-0ff6-cf71ac1a85e4/AppIcon-0-0-1x_U007epad-0-1-0-sRGB-85-220.png/512x512bb.jpg"
    },
    {
      title: "Dealerware",
      subtitle: "Enterprise Car Dealership App",
      description: "Dealership staff app for inventory and customer data, improved data retrieval speed by ~20%. Built with live tracking and store pinning functionality.",
      tags: ["SwiftUI", "UIKit", "CoreBluetooth", "Core Data", "REST APIs", "Apple Maps"],
      link: "https://apps.apple.com/in/app/dealerware/id1168703299",
      iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/e8/6b/7b/e86b7b49-ddc7-30e1-feb7-d5d60d8b235c/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg"
    },
    {
      title: "EveryParent (CSC)",
      subtitle: "Parenting & Child Development App",
      description: "Personalized recommendations and interactive features that increased engagement. Led a team of three engineers.",
      tags: ["SwiftUI", "SwiftData", "Redux", "Apple Maps", "Push Notifications"],
      link: "https://apps.apple.com/us/app/everyparent/id1230602242",
      iconUrl: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/14/98/2a/14982ace-0c5e-409b-86b0-e6a7c65afc83/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/512x512bb.jpg"
    },
    {
      title: "Easy Ride",
      subtitle: "Solar Battery Cycle App",
      description: "QR code-based checkpoint scanning to start rides and select destinations. Billing system based on distance and taxes.",
      tags: ["UIKit", "MVVM", "Core Maps"]
    }
  ];

  return (
    <section id="projects" className="py-32 border-t border-border/50 bg-muted/5">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A selection of complex consumer and enterprise applications built with modern iOS architectures.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col sm:flex-row gap-8 items-start"
            >
              {/* iPhone Mockup Frame */}
              {project.link ? (
                <a 
                  href={project.link}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-48 flex-shrink-0 aspect-[9/19] border-2 border-border rounded-3xl relative overflow-hidden bg-background/50 flex flex-col p-2 pt-6 items-center hover:border-primary/50 transition-colors duration-500 group/phone cursor-pointer"
                >
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-border rounded-full" />
                  <div className="w-full h-full border border-border/50 rounded-xl bg-muted/10 relative overflow-hidden flex flex-col items-center justify-center group-hover/phone:bg-primary/5 transition-colors duration-500">
                    <img 
                      src={project.iconUrl} 
                      alt={project.title}
                      className="w-16 h-16 rounded-2xl shadow-lg border border-white/10 group-hover/phone:scale-105 transition-transform duration-300 mb-3"
                    />
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2.5 py-1 rounded border border-border/50 uppercase tracking-wider group-hover/phone:text-primary group-hover/phone:border-primary/30 transition-all">
                      View App
                    </span>
                    
                    {/* Decorative lines */}
                    <div className="absolute top-4 left-4 right-4 h-2 bg-border/20 rounded-sm" />
                    <div className="absolute bottom-4 left-4 right-4 h-8 bg-border/10 rounded-sm flex items-center justify-center text-[9px] font-mono text-muted-foreground">
                      App Store
                    </div>
                  </div>
                </a>
              ) : (
                <div className="w-full sm:w-48 flex-shrink-0 aspect-[9/19] border-2 border-border rounded-3xl relative overflow-hidden bg-background/50 flex flex-col p-2 pt-6 items-center">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-border rounded-full" />
                  <div className="w-full h-full border border-border/50 rounded-xl bg-muted/10 relative overflow-hidden flex flex-col items-center justify-center">
                    <Smartphone className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <span className="text-[10px] font-mono text-muted-foreground bg-muted/30 px-2.5 py-1 rounded border border-border/50 uppercase tracking-wider">
                      Prototype
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 h-8 bg-border/10 rounded-sm flex items-center justify-center text-[9px] font-mono text-muted-foreground">
                      iOS Native
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-grow pt-4">
                <div className="flex items-center gap-3 mb-2">
                  {project.link ? (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-primary transition-colors flex items-center gap-1.5 group/title"
                    >
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <ArrowUpRight size={18} className="text-muted-foreground group-hover/title:text-primary group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                    </a>
                  ) : (
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  )}
                  {project.featured && (
                    <span className="text-[10px] font-mono text-primary uppercase tracking-widest px-2 py-0.5 border border-primary/30">
                      Featured
                    </span>
                  )}
                </div>
                <div className="font-mono text-sm text-muted-foreground mb-4">
                  {project.subtitle}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => (
                    <TechTag key={tag}>{tag}</TechTag>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
