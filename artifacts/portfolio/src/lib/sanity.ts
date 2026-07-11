import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'wcmtfjdd',
  dataset: 'production',
  useCdn: false, // Set to false to disable caching and load new posts immediately upon publish
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface SanityPost {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  mainImage?: any;
  body: any[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

export async function getPosts(): Promise<SanityPost[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      mainImage,
      body,
      seoTitle,
      seoDescription,
      seoKeywords
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      mainImage,
      body,
      seoTitle,
      seoDescription,
      seoKeywords
    }`,
    { slug }
  );
}
