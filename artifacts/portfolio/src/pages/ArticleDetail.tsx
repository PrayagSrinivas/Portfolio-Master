import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { articles } from '@/data/articles';

interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

export default function ArticleDetail({ params }: ArticleDetailProps) {
  const article = articles.find((a) => a.slug === params.slug);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you are looking for doesn't exist.</p>
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
              <ArrowLeft size={16} /> Back to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>

          <article>
            <header className="mb-12">
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                <BookOpen size={14} />
                <span>{article.date}</span>
                <span className="w-1 h-1 bg-border rounded-full" />
                <span>{article.readTime}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {article.title}
              </h1>
              <div className="h-[1px] bg-border/50 w-full" />
            </header>

            <div 
              className="prose prose-neutral dark:prose-invert max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:leading-relaxed prose-p:mb-6 prose-p:text-foreground/80
                prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:p-4 prose-pre:rounded-sm
                prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
