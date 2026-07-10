import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card } from '@/components/ui/portfolio-card';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { articles } from '@/data/articles';

export function Articles() {
  return (
    <section id="articles" className="py-24 bg-muted/5 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Articles & Insights</h2>
            <p className="text-muted-foreground">Thoughts on iOS engineering, architecture, and performance.</p>
          </div>
          <a 
            href="https://srinivasprayag.medium.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Visit Medium Blog
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={`/articles/${article.slug}`}
              className="block group cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full flex flex-col">
                  <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                    <BookOpen size={14} />
                    <span>{article.date}</span>
                    <span className="w-1 h-1 bg-border rounded-full" />
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-sm text-foreground/70 leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-xs font-mono font-bold uppercase tracking-widest text-primary">
                    Read Article <ArrowUpRight size={14} className="ml-1" />
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
