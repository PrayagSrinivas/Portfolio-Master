import React from 'react';
import { motion } from 'framer-motion';
import { TechTag } from '@/components/ui/TechTag';

export function Skills() {
  const skillGroups = [
    {
      category: "Languages & Frameworks",
      skills: ["Swift", "SwiftUI", "UIKit", "Combine", "Objective-C", "CoreBluetooth", "Apple Maps"]
    },
    {
      category: "Architecture Patterns",
      skills: ["MVC", "MVVM", "Redux", "Modular Architecture", "VIPER", "Clean Architecture"]
    },
    {
      category: "Data & Storage",
      skills: ["Core Data", "Realm", "SwiftData"]
    },
    {
      category: "Quality & Performance",
      skills: ["XCTest", "Unit Testing", "Memory Profiling", "Leak Detection", "Performance Optimization", "Agile/Scrum"]
    },
    {
      category: "Development Tools",
      skills: ["Xcode", "Git/GitHub", "CircleCI", "Jenkins", "Jira", "SourceTree", "Proxyman", "Postman", "Figma", "Adobe XD"]
    },
    {
      category: "Analytics & Monitoring",
      skills: ["Firebase Analytics", "Firebase Crashlytics", "Gainsight"]
    }
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Technical Arsenal</h2>
            <p className="text-muted-foreground mb-8">
              A comprehensive toolkit honed over years of shipping production iOS applications.
            </p>
            
            <div className="w-full h-[1px] bg-border mb-8 relative">
              <div className="absolute top-0 left-0 h-full bg-primary w-1/3"></div>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {skillGroups.map((group, index) => (
              <motion.div 
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-mono text-sm text-foreground uppercase tracking-wider mb-4 pb-2 border-b border-border/50">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <TechTag key={skill}>{skill}</TechTag>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
