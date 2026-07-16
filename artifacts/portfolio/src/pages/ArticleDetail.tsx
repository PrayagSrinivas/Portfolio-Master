import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, BookOpen, Eye, Loader2 } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { getPostBySlug, urlFor } from '@/lib/sanity';
import { 
  useTrackArticleView, 
  useGetArticleViews,
  useTrackArticleClap,
  useGetArticleClaps 
} from '@workspace/api-client-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

interface ArticleDetailProps {
  params: {
    slug: string;
  };
}

const CodeBlock = ({ value }: { value: any }) => {
  if (!value) return null;
  const codeText = value.code || '';
  const language = value.language || 'swift';

  let highlightedCode = codeText;
  try {
    const grammar = Prism.languages[language] || Prism.languages.swift || Prism.languages.javascript;
    highlightedCode = Prism.highlight(codeText, grammar, language);
  } catch (err) {
    console.warn("Prism failed to highlight language:", language, err);
  }

  return (
    <div className="relative my-8 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 bg-[#fafafa] dark:bg-zinc-900/40 p-6 md:p-8 font-mono text-sm leading-relaxed antialiased">
      <pre className="overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
        <code 
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
};

function calculateReadingTime(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return '1 min read';
  
  let wordCount = 0;
  blocks.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) {
          wordCount += child.text.trim().split(/\s+/).filter(Boolean).length;
        }
      });
    }
  });
  
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function getBrowserInfo() {
  const ua = typeof window !== 'undefined' ? navigator.userAgent : '';
  let deviceType = 'desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    deviceType = 'tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
    deviceType = 'mobile';
  }

  let os = 'Unknown';
  if (/Windows/i.test(ua)) os = 'Windows';
  else if (/Macintosh|Mac OS X/i.test(ua)) os = 'macOS';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Linux/i.test(ua)) os = 'Linux';
  
  return { deviceType, os, userAgent: ua };
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
    code: ({ value }: any) => <CodeBlock value={value} />,
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

  const { mutate: trackView } = useTrackArticleView();
  const { data: viewsData, isLoading: viewsCountLoading, refetch: refetchViews } = useGetArticleViews(params.slug);

  const { mutate: sendClap } = useTrackArticleClap();
  const { data: clapsData, isLoading: clapsLoading, refetch: refetchClaps } = useGetArticleClaps(params.slug);

  const [localUserClaps, setLocalUserClaps] = React.useState(0);
  const [floatingClaps, setFloatingClaps] = React.useState<{ id: number; y: number }[]>([]);
  const [clapId, setClapId] = React.useState(0);

  // Track view once when article loading succeeds
  useEffect(() => {
    if (article) {
      const browserInfo = getBrowserInfo();
      trackView(
        { slug: params.slug, data: browserInfo },
        {
          onSuccess: () => {
            refetchViews();
          }
        }
      );
    }
  }, [article, params.slug, trackView, refetchViews]);

  // Load user's local claps from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`claps_${params.slug}`);
    if (stored) {
      setLocalUserClaps(parseInt(stored, 10) || 0);
    }
  }, [params.slug]);

  // Synchronize local user claps with the server database value
  useEffect(() => {
    if (clapsData && typeof clapsData.userClaps === 'number') {
      setLocalUserClaps(clapsData.userClaps);
      localStorage.setItem(`claps_${params.slug}`, clapsData.userClaps.toString());
    }
  }, [clapsData, params.slug]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  // Update dynamic SEO metadata in head
  useEffect(() => {
    if (!article) return;

    // Store original document values
    const originalTitle = document.title;
    const originalDescMeta = document.querySelector('meta[name="description"]');
    const originalDesc = originalDescMeta?.getAttribute('content') || '';
    const originalKeywordsMeta = document.querySelector('meta[name="keywords"]');
    const originalKeywords = originalKeywordsMeta?.getAttribute('content') || '';

    // 1. Update Title: prioritize seoTitle, fallback to post title
    document.title = article.seoTitle || article.title;

    // 2. Update Description Meta Tag
    let descMeta = originalDescMeta;
    if (!descMeta) {
      descMeta = document.createElement('meta');
      descMeta.setAttribute('name', 'description');
      document.head.appendChild(descMeta);
    }
    descMeta.setAttribute('content', article.seoDescription || article.excerpt || '');

    // 3. Update Keywords Meta Tag
    let keywordsMeta = originalKeywordsMeta;
    if (article.seoKeywords) {
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', article.seoKeywords);
    }

    // Clean up to restore original head tags when page unmounts/changes
    return () => {
      document.title = originalTitle;
      if (originalDescMeta) {
        originalDescMeta.setAttribute('content', originalDesc);
      } else if (descMeta && descMeta.parentNode) {
        descMeta.parentNode.removeChild(descMeta);
      }
      if (keywordsMeta) {
        if (originalKeywords) {
          keywordsMeta.setAttribute('content', originalKeywords);
        } else if (keywordsMeta.parentNode) {
          keywordsMeta.parentNode.removeChild(keywordsMeta);
        }
      }
    };
  }, [article]);

  const handleClapClick = () => {
    if (localUserClaps >= 50) return;

    const newClaps = localUserClaps + 1;
    setLocalUserClaps(newClaps);
    localStorage.setItem(`claps_${params.slug}`, newClaps.toString());

    const id = clapId;
    setClapId(prev => prev + 1);
    setFloatingClaps(prev => [...prev, { id, y: 0 }]);

    sendClap(
      { slug: params.slug, data: { count: 1 } },
      {
        onSuccess: () => {
          refetchClaps();
        }
      }
    );

    setTimeout(() => {
      setFloatingClaps(prev => prev.filter(c => c.id !== id));
    }, 1000);
  };

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
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <BookOpen size={13} />
                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Draft'}
                  </span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span>{article.readTime || calculateReadingTime(article.body)}</span>
                  <span className="w-1 h-1 bg-border rounded-full" />
                  <span className="flex items-center gap-1">
                    <Eye size={13} />
                    {viewsCountLoading ? '...' : `${viewsData?.count ?? 0} views`}
                  </span>
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

              {/* Clap widget section */}
              <div className="relative flex flex-row items-center justify-start my-12 py-6 border-t border-b border-zinc-200/50 dark:border-zinc-800/50 gap-4">
                <div className="relative">
                  {/* Floating Bubbles */}
                  <AnimatePresence>
                    {floatingClaps.map(fc => (
                      <motion.div
                        key={fc.id}
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -45, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md pointer-events-none z-50"
                      >
                        +1
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClapClick}
                    disabled={localUserClaps >= 50}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                      localUserClaps >= 50 
                        ? 'bg-zinc-100/50 border-zinc-200 text-zinc-400 dark:bg-zinc-800/20 dark:border-zinc-800 dark:text-zinc-500 cursor-not-allowed' 
                        : localUserClaps > 0
                          ? 'bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                          : 'bg-transparent border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-zinc-100 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 256 256" 
                      fill="currentColor"
                      className="w-5 h-5 transition-all duration-300"
                    >
                      <path d="M168,24V8a8,8,0,0,1,16,0V24a8,8,0,0,1-16,0ZM203.83,41A7.9,7.9,0,0,0,208,42.13a8,8,0,0,0,6.84-3.83l8-13.11a8,8,0,1,0-13.66-8.33l-8,13.1A8,8,0,0,0,203.83,41Zm47.44,12.59a8,8,0,0,0-10.07-5.16l-15,4.85a8,8,0,0,0,2.45,15.62,8.15,8.15,0,0,0,2.46-.39l15-4.85A8,8,0,0,0,251.27,53.55Zm-30,39.94A79.71,79.71,0,0,1,208.68,190,80,80,0,0,1,62.49,208l-35-60.63A26,26,0,0,1,46.67,108.6l-4-6.94A26,26,0,0,1,61,63,26,26,0,0,1,72.4,31.63a26.05,26.05,0,0,1,30.81,3.58A26,26,0,0,1,147.09,37l12,20.79a26,26,0,0,1,43.18,2.78ZM115.92,55h0l5.93,10.27a25.87,25.87,0,0,1,5,6.24l12,20.75a26.2,26.2,0,0,1,16-9.78L133.24,45a10,10,0,0,0-13.66-3.66A10,10,0,0,0,115.92,55ZM76.74,59.15l5.93,10.28.32.29A25.93,25.93,0,0,1,99.71,58.94l-5.65-9.79a10,10,0,0,0-18.32,2.41A9.92,9.92,0,0,0,76.74,59.15ZM193.59,184.57a63.61,63.61,0,0,0-6.4-48.57l-19-32.91a10,10,0,0,0-17.74,9.18L161.87,132A8,8,0,1,1,148,140L113,79.53A10,10,0,0,0,95.63,89.4L120.26,132a8,8,0,1,1-13.85,8L73.84,83.66a10,10,0,1,0-17.32,10l36,62.36a8,8,0,1,1-13.86,8l-20-34.64a10,10,0,0,0-17.32,10l35,60.63a64,64,0,0,0,117.25-15.44Zm13.82-83.08-19-32.91a10,10,0,0,0-17.32,10h0L177,88.83a26.06,26.06,0,0,1,5,6.26l19,32.91a80.13,80.13,0,0,1,10.13,30A63.82,63.82,0,0,0,207.41,101.49Z" />
                    </svg>
                  </motion.button>
                </div>

                <div className="flex flex-col text-left">
                  <p className="text-sm font-medium text-foreground">
                    Did you love the post? Give it a clap.
                  </p>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground select-none">
                    <span className="font-semibold text-foreground">
                      {clapsLoading ? '...' : `${clapsData?.count ?? 0} claps`}
                    </span>
                    {localUserClaps > 0 && (
                      <span>
                        • You clapped {localUserClaps} {localUserClaps === 50 ? "(Limit reached)" : "times"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
