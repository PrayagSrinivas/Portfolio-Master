import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowUpRight, BookOpen, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPosts, urlFor } from '@/lib/sanity';

export function Articles() {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <section id="articles" className="py-24 bg-muted/5 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Articles & Insights</h2>
            <p className="text-muted-foreground">Thoughts on iOS engineering, architecture, and performance.</p>
          </div>
          <div className="flex flex-wrap gap-4 sm:gap-6 items-center">
            <Link 
              href="/articles" 
              className="group flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              View All Articles
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <span className="hidden sm:inline text-muted-foreground/30 font-mono text-sm">/</span>
            <a 
              href="https://srinivasprayag.medium.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Visit Medium Blog
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-muted-foreground font-mono text-sm">
            Failed to load articles. Make sure your Sanity configuration is active.
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground font-mono text-sm border border-dashed border-border p-8 bg-muted/5">
            No articles published yet. Visit <Link href="/studio" className="text-primary hover:underline font-bold">/studio</Link> to write your first post!
          </div>
        ) : (
          <div className="space-y-6 md:space-y-10">
            {articles.map((article, index) => (
              <Link
                key={index}
                href={`/articles/${article.slug}`}
                className="block group border-b border-border/30 pb-6 md:pb-8 last:border-0 last:pb-0"
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-4 sm:gap-6 md:gap-8 items-start justify-between"
                >
                  <div className="flex-grow space-y-1.5 md:space-y-3">
                    <div className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono text-muted-foreground">
                      <BookOpen size={12} className="md:w-3.5 md:h-3.5" />
                      <span>
                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                      </span>
                      <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-muted-foreground/30 rounded-full" />
                      <span>{article.readTime}</span>
                    </div>
                    
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold group-hover:text-primary transition-colors tracking-tight leading-snug">
                      {article.title}
                    </h3>
                    
                    <p className="hidden md:block text-sm md:text-base text-muted-foreground leading-relaxed max-w-3xl line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="hidden sm:flex pt-1 md:pt-2 items-center text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-primary">
                      Read Article <ArrowUpRight size={12} className="ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {article.mainImage && (
                    <div className="w-20 h-20 sm:w-44 sm:h-28 md:w-56 md:h-36 rounded-lg overflow-hidden border border-border/40 bg-muted/20 flex-shrink-0">
                      <img 
                        src={urlFor(article.mainImage).width(600).height(400).url()} 
                        alt={article.title}
                        className="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
