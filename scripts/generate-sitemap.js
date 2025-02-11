import { SitemapStream } from "sitemap";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of static pages
const pages = [
  { url: "/", changefreq: "daily", priority: 1.0 },
  { url: "/about", changefreq: "weekly", priority: 0.8 },
  { url: "/projects", changefreq: "weekly", priority: 0.8 },
  { url: "/articles", changefreq: "weekly", priority: 0.8 },
  { url: "/github", changefreq: "weekly", priority: 0.7 },
  { url: "/contact", changefreq: "monthly", priority: 0.7 },
  { url: "/certifications", changefreq: "monthly", priority: 0.7 },
];

// Generate sitemap
const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: "https://ahmed-seif.me" });

  try {
    // Ensure the docs directory exists
    const docsDir = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Generate sitemap.xml
    const sitemapData = [];
    for (const page of pages) {
      stream.write(page);
    }
    stream.end();

    const data = await new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', chunk => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks).toString()));
      stream.on('error', reject);
    });

    fs.writeFileSync(path.join(docsDir, 'sitemap.xml'), data);
    console.log("✅ Sitemap generated!");

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://ahmed-seif.me/sitemap.xml`;

    fs.writeFileSync(path.join(docsDir, 'robots.txt'), robotsTxt);
    console.log("✅ Robots.txt generated!");
  } catch (error) {
    console.error("Error generating files:", error);
    process.exit(1);
  }
};

generateSitemap();
