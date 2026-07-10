import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'wouter';

export function Button({
  children,
  className,
  variant = 'primary',
  href,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  onClick?: () => void;
  [key: string]: any;
}) {
  const [location, setLocation] = useLocation();

  const baseStyles = "inline-flex items-center justify-center font-mono text-sm uppercase tracking-wider transition-all duration-300 ease-out h-12 px-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]",
    outline: "bg-transparent text-foreground border border-border hover:border-primary hover:text-primary",
    ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50"
  };

  const isAnchor = href?.startsWith('#');

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) onClick();
    if (isAnchor && href) {
      e.preventDefault();
      if (location !== '/') {
        setLocation('/');
        // Need a slight delay for render if navigating from another page
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const Component = motion.button;

  const content = (
    <Component
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      onClick={href && isAnchor ? handleClick : onClick}
      {...props}
    >
      {children}
    </Component>
  );

  if (href && !isAnchor) {
    if (href.startsWith('http') || href.startsWith('mailto')) {
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-block">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
