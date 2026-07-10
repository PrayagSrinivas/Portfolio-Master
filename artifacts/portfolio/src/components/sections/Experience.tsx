import React from 'react';
import { motion } from 'framer-motion';

export function Experience() {
  const experiences = [
    {
      role: "Senior iOS Developer",
      company: "Keka Pvt Technologies Ltd",
      location: "Hyderabad",
      period: "Oct 2024 - Present",
      achievements: [
        "Led modularization of Leave and Payroll modules into independent reusable components.",
        "Refactored legacy GCD-based network layer to Swift structured concurrency.",
        "Drove adoption of a new design system and led a UI/UX revamp across HRMS workflows used by thousands of employees.",
        "Reduced app hangs/memory leaks by ~15% via memory profiling.",
        "Collaborated cross-functionally to ship Leave Management, Payroll, and Attendance features."
      ]
    },
    {
      role: "iOS Developer",
      company: "Webappclouds LLC",
      location: "Remote",
      period: "Jul 2024 - Oct 2024",
      achievements: [
        "Implemented new features in a fast-paced environment.",
        "Led a team of three iOS developers using CircleCI and Jira.",
        "Used Jenkins and Adobe XD for design-to-code handoff.",
        "Implemented XCTest automated testing, reducing bug identification time."
      ]
    },
    {
      role: "iOS Developer",
      company: "Mutual Mobile",
      location: "Remote",
      period: "Mar 2022 - Jul 2024",
      achievements: [
        "Spearheaded new iOS features across multiple client applications.",
        "Managed crash tickets and resolved critical bugs.",
        "Implemented XCTest-based automated tests.",
        "Coordinated with a 24-member cross-functional team in agile setup.",
        "Collaborated with design on custom animations and transitions."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-muted/5 border-y border-border/50">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Professional Experience</h2>
        
        {/* Timeline container - kept padded on desktop to prevent collisions */}
        <div className="relative border-l border-border ml-4 md:ml-6 pl-8 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-default"
            >
              {/* Timeline diamond dot with hover rotate & glow micro-animation */}
              <div className="absolute w-3 h-3 bg-background border-2 border-primary rotate-45 -left-[38px] top-2.5 z-10 group-hover:rotate-[135deg] group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_12px_rgba(240,81,56,0.6)] transition-all duration-500 ease-out" />
              
              <div className="md:grid md:grid-cols-4 md:gap-8">
                {/* Duration Column - Left aligned on desktop with hover shift */}
                <div className="md:col-span-1 mb-4 md:mb-0 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <div className="font-mono text-sm text-primary mb-1 group-hover:text-primary/80 transition-colors duration-300">{exp.period}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{exp.location}</div>
                </div>
                
                {/* Description Column - Hover shift & color light-up */}
                <div className="md:col-span-3 transition-transform duration-300 ease-out group-hover:translate-x-1">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">{exp.role}</h3>
                  <div className="text-muted-foreground font-mono text-sm mb-6">{exp.company}</div>
                  
                  <ul className="space-y-3">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                        <span className="text-primary mt-1 flex-shrink-0">›</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
