import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sanity Client setup
const client = createClient({
  projectId: 'wcmtfjdd',
  dataset: 'production',
  useCdn: true, // Use CDN for build-time fetching
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

async function prerender() {
  try {
    const distPath = path.resolve(__dirname, '../dist/public');
    const templatePath = path.join(distPath, 'index.html');

    if (!fs.existsSync(templatePath)) {
      console.error(`Template not found at: ${templatePath}. Please build the site first!`);
      process.exit(1);
    }

    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    console.log('Fetching articles from Sanity...');
    const posts = await client.fetch(
      `*[_type == "post"] {
        title,
        "slug": slug.current,
        excerpt,
        mainImage,
        seoTitle,
        seoDescription
      }`
    );

    console.log(`Found ${posts.length} articles to pre-render.`);

    for (const post of posts) {
      if (!post.slug) continue;

      const articleTitle = post.seoTitle || post.title;
      const articleDesc = post.seoDescription || post.excerpt || '';
      
      let articleImageUrl = '';
      if (post.mainImage) {
        // Sanity returns CDN image URLs which are absolute
        articleImageUrl = urlFor(post.mainImage).width(1200).height(630).fit('max').url();
      }

      let modifiedHtml = htmlTemplate;

      // 1. Replace document title
      modifiedHtml = modifiedHtml.replace(
        /<title>[^<]*<\/title>/,
        `<title>${articleTitle}</title>`
      );

      // 2. Strip existing description, OG, and Twitter tags
      modifiedHtml = modifiedHtml
        .replace(/<meta[^>]*name="description"[^>]*>/gi, '')
        .replace(/<meta[^>]*property="og:[^"]*"[^>]*>/gi, '')
        .replace(/<meta[^>]*name="twitter:[^"]*"[^>]*>/gi, '');

      // 3. Inject new SEO and Open Graph meta tags
      const metaTagsToInject = [
        `<meta name="description" content="${articleDesc.replace(/"/g, '&quot;')}" />`,
        `<meta property="og:title" content="${articleTitle.replace(/"/g, '&quot;')}" />`,
        `<meta property="og:description" content="${articleDesc.replace(/"/g, '&quot;')}" />`,
        `<meta property="og:type" content="article" />`,
        `<meta property="og:url" content="https://www.srinivasprayag.in/articles/${post.slug}" />`,
        articleImageUrl ? `<meta property="og:image" content="${articleImageUrl}" />` : '',
        articleImageUrl ? `<meta property="og:image:width" content="1200" />` : '',
        articleImageUrl ? `<meta property="og:image:height" content="630" />` : '',
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${articleTitle.replace(/"/g, '&quot;')}" />`,
        `<meta name="twitter:description" content="${articleDesc.replace(/"/g, '&quot;')}" />`,
        articleImageUrl ? `<meta name="twitter:image" content="${articleImageUrl}" />` : ''
      ].filter(Boolean).join('\n    ');

      modifiedHtml = modifiedHtml.replace('</head>', `${metaTagsToInject}\n</head>`);

      // 4. Create directory dist/public/articles/[slug] and write index.html
      const articleDir = path.join(distPath, 'articles', post.slug);
      fs.mkdirSync(articleDir, { recursive: true });
      fs.writeFileSync(path.join(articleDir, 'index.html'), modifiedHtml, 'utf8');

      console.log(`Pre-rendered article: /articles/${post.slug}`);
    }

    console.log('Pre-rendering completed successfully!');
  } catch (error) {
    console.error('Error pre-rendering articles:', error);
    process.exit(1);
  }
}

prerender();
