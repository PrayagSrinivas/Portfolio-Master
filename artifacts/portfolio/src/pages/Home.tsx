import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Summary } from '@/components/sections/Summary';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Articles } from '@/components/sections/Articles';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Summary />
        <Skills />
        <Experience />
        <Projects />
        <Articles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
