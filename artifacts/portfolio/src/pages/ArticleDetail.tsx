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
  const [copied, setCopied] = React.useState(false);

  if (!value) return null;
  const codeText = value.code || '';
  const language = value.language || 'javascript';
  const filename = value.filename;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  let highlightedCode = codeText;
  try {
    const grammar = Prism.languages[language] || Prism.languages.javascript;
    highlightedCode = Prism.highlight(codeText, grammar, language);
  } catch (err) {
    console.warn("Prism failed to highlight language:", language, err);
  }

  return (
    <div className="relative my-8 rounded-lg overflow-hidden border border-border/40 bg-black/60 shadow-lg font-mono text-sm leading-relaxed">
      <div className="bg-muted/15 px-4 py-2.5 border-b border-border/30 text-xs text-muted-foreground flex justify-between items-center select-none">
        <span className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          {filename && <span className="ml-2 text-foreground/80 font-semibold">{filename}</span>}
        </span>
        <div className="flex items-center gap-4">
          <span className="uppercase text-[10px] tracking-widest font-bold text-primary/70">{language}</span>
          <button 
            onClick={handleCopy} 
            className="hover:text-primary transition-colors text-[11px] flex items-center gap-1 cursor-pointer font-sans"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <pre className="p-4 overflow-x-auto text-foreground/90 font-mono scrollbar-thin scrollbar-thumb-border">
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
              <div className="relative flex flex-col items-center justify-center my-16 py-8 border-t border-b border-border/20">
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  Liked this article? Clap to show your support.
                </p>
                
                <div className="relative">
                  {/* Floating Bubbles */}
                  <AnimatePresence>
                    {floatingClaps.map(fc => (
                      <motion.div
                        key={fc.id}
                        initial={{ opacity: 1, y: 0, scale: 0.8 }}
                        animate={{ opacity: 0, y: -80, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-background font-mono text-xs font-bold px-2.5 py-1 rounded-full shadow-lg pointer-events-none z-50"
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
                    className={`w-16 h-16 rounded-full border flex items-center justify-center shadow-md transition-colors ${
                      localUserClaps >= 50 
                        ? 'bg-muted/10 border-border/30 text-muted-foreground cursor-not-allowed' 
                        : localUserClaps > 0
                          ? 'bg-primary border-primary text-background hover:bg-primary/90'
                          : 'bg-background border-border hover:border-primary text-foreground'
                    }`}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={localUserClaps > 0 ? "currentColor" : "none"} 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 transition-all duration-300"
                    >
                      <path d="M12 2a4 4 0 0 0-4 4v6.5a1.5 1.5 0 0 0 3 0V6a1 1 0 0 1 2 0v7.5a1.5 1.5 0 0 0 3 0V9a3 3 0 0 0-6 0v4" />
                      <path d="M8 12.5a3 3 0 0 0-3 3v2.5a4 4 0 0 0 4 4h4a7 7 0 0 0 7-7v-1.5" />
                      {localUserClaps > 0 && (
                        <path d="M2 10s2-1 2-3M6 5s1-2 3-2M18 3s2 1 3 2M22 10s-2-1-3-3" className="text-primary animate-pulse" />
                      )}
                    </svg>
                  </motion.button>
                </div>

                <div className="mt-3 text-center">
                  <span className="font-mono text-sm font-bold block text-foreground">
                    {clapsLoading ? '...' : `${clapsData?.count ?? 0} claps`}
                  </span>
                  {localUserClaps > 0 && (
                    <span className="font-mono text-[10px] text-muted-foreground mt-0.5 block">
                      You clapped {localUserClaps} {localUserClaps === 50 && "(Limit reached)"}
                    </span>
                  )}
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
