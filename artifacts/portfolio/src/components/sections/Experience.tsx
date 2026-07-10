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
        
        <div className="relative border-l border-border ml-4 md:ml-0 md:pl-0 pl-8 space-y-16">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute w-3 h-3 bg-background border-2 border-primary rotate-45 -left-[38px] md:-left-[6px] top-2 z-10" />
              
              <div className="md:grid md:grid-cols-4 md:gap-8">
                <div className="md:col-span-1 mb-4 md:mb-0 md:text-right md:pr-8">
                  <div className="font-mono text-sm text-primary mb-1">{exp.period}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">{exp.location}</div>
                </div>
                
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
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
