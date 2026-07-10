import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { useQuery } from '@tanstack/react-query';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPostBySlug, urlFor } from '@/lib/sanity';

interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 overflow-hidden rounded-sm border border-border">
        <img 
          src={urlFor(value).width(800).url()} 
          alt={value.alt || 'Article Image'} 
          className="w-full object-cover"
        />
        {value.alt && (
          <div className="bg-muted/30 p-2.5 text-center text-xs text-muted-foreground font-mono border-t border-border">
            {value.alt}
          </div>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold tracking-tight mt-10 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold tracking-tight mt-8 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-medium text-foreground/90 mt-6 mb-2">{children}</h4>,
    normal: ({ children }: any) => <p className="leading-relaxed mb-6 text-foreground/85">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-foreground/80">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-foreground/80">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          target={target}
          className="text-primary hover:underline font-semibold decoration-primary/30"
        >
          {children}
        </a>
      );
    },
  },
};

export default function ArticleDetail({ params }: ArticleDetailProps) {
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['post', params.slug],
    queryFn: () => getPostBySlug(params.slug),
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="font-mono text-xs text-muted-foreground">Loading article...</span>
            </div>
          ) : error || !article ? (
            <div className="text-center py-24">
              <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
              <p className="text-muted-foreground mb-6">
                {error ? 'Failed to fetch article from database.' : "The article you are looking for doesn't exist."}
              </p>
              <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:underline">
                <ArrowLeft size={16} /> Back to Home
              </Link>
            </div>
          ) : (
            <article>
              <header className="mb-12">
                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                  <BookOpen size={14} />
                  <span>
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                  </span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span>{article.readTime}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                  {article.title}
                </h1>
                
                {article.mainImage && (
                  <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-border bg-muted/20 my-8">
                    <img 
                      src={urlFor(article.mainImage).width(800).url()} 
                      alt={article.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
                
                <div className="h-[1px] bg-border/50 w-full" />
              </header>

              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <PortableText value={article.body} components={portableTextComponents} />
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
