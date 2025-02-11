import { SitemapStream, streamToPromise } from "sitemap";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use an environment variable for the hostname if provided,
// otherwise default to the production URL.
const hostname = process.env.HOSTNAME || "https://ahmed-seif.me";

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

const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname });

  // Ensure the docs directory exists (this is where your generated files go)
  const docsDir = path.join(process.cwd(), "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  try {
    // Add each page to the sitemap stream
    pages.forEach((page) => stream.write(page));
    stream.end();

    // Use streamToPromise to wait for the stream to finish
    const data = await streamToPromise(stream);
    fs.writeFileSync(path.join(docsDir, "sitemap.xml"), data.toString());
    console.log("✅ Sitemap generated!");

    // Generate robots.txt using the same hostname
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${hostname}/sitemap.xml`;

    fs.writeFileSync(path.join(docsDir, "robots.txt"), robotsTxt);
    console.log("✅ Robots.txt generated!");
  } catch (error) {
    console.error("Error generating files:", error);
    process.exit(1);
  }
};

generateSitemap();
