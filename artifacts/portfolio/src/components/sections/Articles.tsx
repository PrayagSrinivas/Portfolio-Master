import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Card } from '@/components/ui/portfolio-card';
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
                  <Card className="h-full flex flex-col overflow-hidden hover:border-primary/30 transition-colors">
                    {article.mainImage && (
                      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-muted/20">
                        <img 
                          src={urlFor(article.mainImage).width(600).height(337).url()} 
                          alt={article.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                        <BookOpen size={14} />
                        <span>
                          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Draft'}
                        </span>
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
                    </div>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
