import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/portfolio-button';
import { ArrowLeft, Download } from 'lucide-react';
import { TechTag } from '@/components/ui/TechTag';

export default function Resume() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Button href="/" variant="ghost" className="mb-6 px-0 hover:bg-transparent h-auto">
                <ArrowLeft size={16} className="mr-2" /> Back to Portfolio
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Curriculum Vitae</h1>
              <p className="text-primary font-mono tracking-widest uppercase">Srinivas Prayag Sahu</p>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 items-center text-sm font-mono text-muted-foreground">
              <a href="mailto:sprayagsahu@gmail.com" className="hover:text-primary transition-colors">sprayagsahu@gmail.com</a>
              <span className="hidden sm:inline">|</span>
              <span>+91 8917562556</span>
              <span className="hidden sm:inline">|</span>
              <span>Hyderabad</span>
            </div>
          </div>

          <div className="w-full h-px bg-border mb-16 relative">
            <div className="absolute left-0 top-0 w-1/4 h-full bg-primary" />
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-12">
              <section>
                <h2 className="font-mono text-lg border-b border-border pb-2 mb-6 uppercase tracking-wider">Education</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-sm mb-1">Master of Computer Applications (MCA)</h3>
                    <p className="text-muted-foreground text-xs mb-2">Indira Gandhi Institute of Technology, Dhenkanal</p>
                    <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5">2021</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">Bachelor of Science (B.Sc.)</h3>
                    <p className="text-muted-foreground text-xs mb-2">Vikram Dev Autonomous College, Jeypore</p>
                    <span className="font-mono text-[10px] text-primary border border-primary/30 px-2 py-0.5">2018</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="font-mono text-lg border-b border-border pb-2 mb-6 uppercase tracking-wider">Certifications</h2>
                <ul className="space-y-4">
                  {[
                    "iOS 15 Development Essential Training",
                    "Swift 5: Protocol-Oriented Programming",
                    "SwiftUI Essential Training",
                    "Xcode Developer Tools in iOS"
                  ].map((cert, i) => (
                    <li key={i} className="text-sm">
                      <div className="font-bold mb-1">{cert}</div>
                      <div className="text-xs text-muted-foreground font-mono">LinkedIn</div>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-mono text-lg border-b border-border pb-2 mb-6 uppercase tracking-wider">Core Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {["Swift", "SwiftUI", "UIKit", "Combine", "Architecture", "XCTest", "Instruments", "CI/CD"].map(skill => (
                    <TechTag key={skill}>{skill}</TechTag>
                  ))}
                </div>
              </section>
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-16">
              <section>
                <h2 className="font-mono text-lg border-b border-border pb-2 mb-8 uppercase tracking-wider">Experience</h2>
                
                <div className="space-y-12">
                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-xl font-bold text-primary">Senior iOS Developer</h3>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1 md:mt-0">Oct 2024 - Present</span>
                    </div>
                    <div className="text-sm font-mono mb-4 text-foreground/80">Keka Pvt Technologies Ltd | Hyderabad</div>
                    <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed list-disc list-outside ml-4">
                      <li>Led modularization of Leave and Payroll modules into independent reusable components.</li>
                      <li>Refactored legacy GCD-based network layer to Swift structured concurrency (async/await).</li>
                      <li>Drove adoption of a new design system and led a UI/UX revamp across HRMS workflows used by thousands of employees.</li>
                      <li>Reduced app hangs/memory leaks by ~15% via memory profiling.</li>
                      <li>Collaborated cross-functionally to ship Leave Management, Payroll, and Attendance features.</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-xl font-bold">iOS Developer</h3>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1 md:mt-0">Jul 2024 - Oct 2024</span>
                    </div>
                    <div className="text-sm font-mono mb-4 text-foreground/80">Webappclouds LLC | Remote</div>
                    <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed list-disc list-outside ml-4">
                      <li>Implemented new features in a fast-paced environment.</li>
                      <li>Led a team of three iOS developers using CircleCI and Jira.</li>
                      <li>Used Jenkins and Adobe XD for design-to-code handoff.</li>
                      <li>Implemented XCTest automated testing, reducing bug identification time.</li>
                    </ul>
                  </div>

                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-xl font-bold">iOS Developer</h3>
                      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest mt-1 md:mt-0">Mar 2022 - Jul 2024</span>
                    </div>
                    <div className="text-sm font-mono mb-4 text-foreground/80">Mutual Mobile | Remote</div>
                    <ul className="space-y-2 text-sm text-foreground/80 leading-relaxed list-disc list-outside ml-4">
                      <li>Spearheaded new iOS features across multiple client applications.</li>
                      <li>Managed crash tickets and resolved critical bugs.</li>
                      <li>Implemented XCTest-based automated tests.</li>
                      <li>Coordinated with a 24-member cross-functional team in agile setup.</li>
                      <li>Collaborated with design on custom animations/transitions.</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
