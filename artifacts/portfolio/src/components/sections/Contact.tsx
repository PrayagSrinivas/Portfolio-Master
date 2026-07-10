import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/portfolio-button';

export function Contact() {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)] opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto border border-border bg-background/50 backdrop-blur-md p-8 md:p-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-primary/10 border border-primary text-primary mx-auto flex items-center justify-center rotate-45 mb-10">
              <MessageSquare size={24} className="-rotate-45" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something.</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
              I'm always open to discussing new opportunities, complex technical challenges, or iOS architecture patterns.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
              <a href="mailto:sprayagsahu@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span className="font-mono text-sm">sprayagsahu@gmail.com</span>
              </a>
              <div className="hidden md:block w-1 h-1 bg-border rotate-45" />
              <a href="tel:+918917562556" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span className="font-mono text-sm">+91 8917562556</span>
              </a>
              <div className="hidden md:block w-1 h-1 bg-border rotate-45" />
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span className="font-mono text-sm">Hyderabad, India</span>
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button href="https://linkedin.com/in/srinivas-prayagsahu" variant="primary">
                <Linkedin size={18} className="mr-2" /> LinkedIn Profile
              </Button>
              <Button href="https://srinivasprayag.medium.com" variant="outline">
                Medium Blog
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
