export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string; // Markdown / HTML content
}

// Vite utility to dynamically import all article JSON files at build time
const articleModules = import.meta.glob('./articles/*.json', { eager: true });

export const articles: Article[] = Object.values(articleModules).map(
  (module: any) => module.default as Article
);
