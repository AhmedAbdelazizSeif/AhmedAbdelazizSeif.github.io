const { SitemapStream, streamToPromise } = require("sitemap");
const fs = require("fs");
const path = require("path");

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
  const stream = new SitemapStream({ hostname: "https://ahmed-seif.me" }); // Replace with your actual domain

  try {
    // Ensure the docs directory exists
    const docsDir = path.join(process.cwd(), 'docs');
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    // Generate sitemap.xml
    const data = await streamToPromise(
      pages.map(page => stream.write(page))
    );
    fs.writeFileSync(path.join(docsDir, 'sitemap.xml'), data.toString());
    console.log("✅ Sitemap generated!");

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: https://ahmed-seif.me/sitemap.xml`; // Replace with your actual domain

    fs.writeFileSync(path.join(docsDir, 'robots.txt'), robotsTxt);
    console.log("✅ Robots.txt generated!");
  } catch (error) {
    console.error("Error generating files:", error);
    process.exit(1);
  } finally {
    stream.end();
  }
};

generateSitemap();
