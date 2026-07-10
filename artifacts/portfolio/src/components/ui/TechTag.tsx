import React from 'react';
import { cn } from '@/lib/utils';

export function TechTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 border border-border text-xs font-mono text-muted-foreground bg-muted/20 whitespace-nowrap", className)}>
      {children}
    </span>
  );
}
