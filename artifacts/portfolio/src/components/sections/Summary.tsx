import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/portfolio-card';
import { Layers, Zap, Bug, Users } from 'lucide-react';

export function Summary() {
  const highlights = [
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      title: "Modular Architecture",
      description: "Led modularization of core HRMS modules, migrating legacy codebases to new design systems and isolated components."
    },
    {
      icon: <Zap className="w-5 h-5 text-primary" />,
      title: "Performance & Concurrency",
      description: "Refactored legacy network layers to Swift structured concurrency (async/await) and resolved critical app hangs."
    },
    {
      icon: <Bug className="w-5 h-5 text-primary" />,
      title: "Quality & Profiling",
      description: "Drives quality via XCTest automation, memory profiling, and leak detection, reducing crashes by 15%."
    },
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      title: "Cross-functional Leadership",
      description: "Collaborates closely with product, design, and QA. Led small teams and managed agile design-to-code handoffs."
    }
  ];

  return (
    <section id="summary" className="py-24 bg-muted/5 border-y border-border/50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Engineering Philosophy</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            I believe that great apps are built at the intersection of rigid architecture and fluid user experience. I design end-to-end features, integrate REST APIs and cloud services, and build resilient systems that scale.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} delay={index * 0.1} className="flex flex-col">
              <div className="w-10 h-10 border border-border bg-background flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
