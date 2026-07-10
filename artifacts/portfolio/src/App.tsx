import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from 'next-themes';
import Home from './pages/Home';
import Resume from './pages/Resume';
import ArticleDetail from './pages/ArticleDetail';

const StudioPage = React.lazy(() => import('./pages/StudioPage'));

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/resume" component={Resume} />
      <Route path="/articles/:slug" component={ArticleDetail} />
      <Route path="/studio">
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center font-mono text-sm bg-background text-foreground">Loading Studio...</div>}>
          <StudioPage />
        </Suspense>
      </Route>
      <Route path="/studio/:path*">
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center font-mono text-sm bg-background text-foreground">Loading Studio...</div>}>
          <StudioPage />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
