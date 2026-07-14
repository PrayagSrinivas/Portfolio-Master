import React from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Eye, Smartphone, Monitor, ShieldAlert, Cpu } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useGetAnalyticsStats } from '@workspace/api-client-react';

export default function AnalyticsDashboard() {
  const { data: stats, isLoading, error } = useGetAnalyticsStats();

  const totalViews = stats?.totalViews ?? 0;
  const articlesList = stats?.articles ?? [];
  const devicesList = stats?.devices ?? [];
  const osList = stats?.os ?? [];

  // Sort lists
  const sortedArticles = [...articlesList].sort((a, b) => b.views - a.views);
  const topArticle = sortedArticles[0];

  // Calculate total claps across all articles
  const totalClaps = articlesList.reduce((acc, curr) => acc + (curr.claps || 0), 0);

  // Calculate percentages
  const devicePercentages = devicesList.map(d => ({
    ...d,
    percentage: totalViews > 0 ? Math.round((d.count / totalViews) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  const osPercentages = osList.map(o => ({
    ...o,
    percentage: totalViews > 0 ? Math.round((o.count / totalViews) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  // Icons mapper helper
  const getDeviceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={16} className="text-primary" />;
      case 'tablet':
        return <Smartphone size={16} className="rotate-90 text-primary" />;
      default:
        return <Monitor size={16} className="text-primary" />;
    }
  };

  const ClapIconSmall = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="w-3.5 h-3.5"
    >
      <path d="M12 2a4 4 0 0 0-4 4v6.5a1.5 1.5 0 0 0 3 0V6a1 1 0 0 1 2 0v7.5a1.5 1.5 0 0 0 3 0V9a3 3 0 0 0-6 0v4" />
      <path d="M8 12.5a3 3 0 0 0-3 3v2.5a4 4 0 0 0 4 4h4a7 7 0 0 0 7-7v-1.5" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
          </Link>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <BarChart3 className="text-primary w-10 h-10" />
              Reader Analytics
            </h1>
            <p className="text-muted-foreground max-w-xl">
              An overview of readership traffic, claps activity, device demographics, and top-performing technical articles.
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              <span className="font-mono text-xs text-muted-foreground">Aggregating analytics data...</span>
            </div>
          ) : error ? (
            <div className="border border-destructive/20 bg-destructive/5 rounded-lg p-8 text-center max-w-xl mx-auto my-12">
              <ShieldAlert className="w-12 h-12 text-destructive mx-auto mb-4 animate-pulse" />
              <h3 className="text-lg font-bold mb-2">Failed to load analytics</h3>
              <p className="text-muted-foreground text-sm font-mono mb-4">
                Ensure your Postgres database is provisioned and API Server is active.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Stat Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border border-border/50 rounded-lg p-6 bg-muted/5 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Article Views</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-bold tracking-tight">{totalViews}</span>
                    <Eye size={20} className="text-muted-foreground/50" />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="border border-border/50 rounded-lg p-6 bg-muted/5 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Total Reader Claps</span>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-bold tracking-tight">{totalClaps}</span>
                    <span className="text-muted-foreground/50 flex items-center">
                      <ClapIconSmall />
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="border border-border/50 rounded-lg p-6 bg-muted/5 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Top Performing Post</span>
                  <div className="mt-4">
                    <span className="text-lg font-bold line-clamp-1 capitalize">
                      {topArticle ? topArticle.slug.replace(/-/g, ' ') : 'None yet'}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground mt-1 block">
                      {topArticle ? `${topArticle.views} views • ${topArticle.claps} claps` : '0 views'}
                    </span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="border border-border/50 rounded-lg p-6 bg-muted/5 flex flex-col justify-between"
                >
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Primary Demographics</span>
                  <div className="flex items-center gap-3 mt-4">
                    <Cpu size={16} className="text-primary" />
                    <div>
                      <span className="text-xl font-bold capitalize">
                        {devicePercentages[0] ? devicePercentages[0].deviceType : 'Unknown'}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground block">
                        On {osPercentages[0] ? osPercentages[0].os : 'Unknown'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Main Graphs / Tables split layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Article list views */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="border border-border/50 rounded-lg p-6 bg-muted/5">
                    <h3 className="text-lg font-bold mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Views & Claps by Article</h3>
                    
                    {sortedArticles.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground text-sm font-mono">
                        No articles tracked yet. Read or clap articles to log metrics.
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {sortedArticles.map((art, idx) => {
                          const maxViews = Math.max(...sortedArticles.map(a => a.views), 1);
                          const widthPct = (art.views / maxViews) * 100;

                          return (
                            <div key={idx} className="space-y-2">
                              <div className="flex justify-between items-start gap-4">
                                <span className="text-sm font-bold capitalize truncate">
                                  {art.slug.replace(/-/g, ' ')}
                                </span>
                                <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground flex-shrink-0">
                                  <span className="flex items-center gap-1">
                                    <Eye size={12} />
                                    {art.views}
                                  </span>
                                  <span className="text-muted-foreground/30">•</span>
                                  <span className="flex items-center gap-1">
                                    <ClapIconSmall />
                                    {art.claps}
                                  </span>
                                </div>
                              </div>
                              <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${widthPct}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: OS and Device breakdown bars */}
                <div className="space-y-8">
                  {/* Device Breakdown */}
                  <div className="border border-border/50 rounded-lg p-6 bg-muted/5">
                    <h3 className="text-lg font-bold mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Device Distribution</h3>
                    
                    {devicePercentages.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm font-mono">
                        No devices tracked.
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {devicePercentages.map((dev, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="capitalize font-semibold flex items-center gap-1.5">
                                {getDeviceIcon(dev.deviceType)}
                                {dev.deviceType}
                              </span>
                              <span className="font-mono text-muted-foreground">
                                {dev.count} ({dev.percentage}%)
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${dev.percentage}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="h-full bg-primary rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* OS Breakdown */}
                  <div className="border border-border/50 rounded-lg p-6 bg-muted/5">
                    <h3 className="text-lg font-bold mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Platform / OS Distribution</h3>
                    
                    {osPercentages.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground text-sm font-mono">
                        No platform metrics yet.
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {osPercentages.map((os, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex justify-between items-center text-xs">
                              <span className="font-semibold">{os.os}</span>
                              <span className="font-mono text-muted-foreground">
                                {os.count} ({os.percentage}%)
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-muted/20 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${os.percentage}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="h-full bg-primary/80 rounded-full"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
