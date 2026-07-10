import React from 'react';
import { motion } from 'framer-motion';
import { TechTag } from '@/components/ui/TechTag';
import { Smartphone } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: "Keka",
      subtitle: "Enterprise HRMS Platform",
      description: "Modularized Leave, Attendance & Payroll modules. Drove design-system adoption and UI/UX revamp. Reduced app hangs and memory leaks by 15%. Refactored legacy GCD network layer to async/await.",
      tags: ["Swift", "SwiftUI", "UIKit"],
      featured: true
    },
    {
      title: "Dealerware",
      subtitle: "Enterprise Car Dealership App",
      description: "Dealership staff app for inventory and customer data, improved data retrieval speed by ~20%. Built with live tracking and store pinning functionality.",
      tags: ["SwiftUI", "UIKit", "CoreBluetooth", "Core Data", "REST APIs", "Apple Maps"]
    },
    {
      title: "EveryParent (CSC)",
      subtitle: "Parenting & Child Development App",
      description: "Personalized recommendations and interactive features that increased engagement. Led a team of three engineers.",
      tags: ["SwiftUI", "SwiftData", "Redux", "Apple Maps", "Push Notifications"]
    },
    {
      title: "Easy Ride",
      subtitle: "Solar Battery Cycle App",
      description: "QR code-based checkpoint scanning to start rides and select destinations. Billing system based on distance and taxes.",
      tags: ["UIKit", "MVVM", "Core Maps"]
    }
  ];

  return (
    <section id="projects" className="py-32">
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
              {/* Abstract iPhone Mockup */}
              <div className="w-full sm:w-48 flex-shrink-0 aspect-[9/19] border-2 border-border rounded-3xl relative overflow-hidden bg-background/50 flex flex-col p-2 pt-6 items-center group-hover:border-primary/50 transition-colors duration-500">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-border rounded-full" />
                <div className="w-full h-full border border-border/50 rounded-xl bg-muted/10 relative overflow-hidden flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500">
                  <Smartphone className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/50 transition-colors duration-500" />
                  
                  {/* Decorative UI lines */}
                  <div className="absolute top-4 left-4 right-4 h-2 bg-border/30 rounded-sm" />
                  <div className="absolute top-8 left-4 right-12 h-2 bg-border/30 rounded-sm" />
                  
                  <div className="absolute bottom-4 left-4 right-4 h-16 bg-border/20 rounded-md" />
                </div>
              </div>

              <div className="flex flex-col flex-grow pt-4">
                <div className="flex items-baseline gap-4 mb-2">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
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
