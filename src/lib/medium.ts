import Parser from "rss-parser";
import type { ResearchPost } from "@/types";

const FEED_URL = "https://medium.com/feed/blockchain-at-usc";
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 hours

type MediumItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  isoDate?: string;
  categories?: string[];
  creator?: string;
  "content:encoded"?: string;
  contentEncoded?: string;
};

const parser: Parser<unknown, MediumItem> = new Parser({
  customFields: {
    item: [["content:encoded", "contentEncoded"]],
  },
});

function extractExcerpt(item: MediumItem): string {
  const html = item.contentEncoded || item["content:encoded"] || "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .replace(/Photo by .+? on Unsplash\.?/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= 200) return text;
  return text.slice(0, 200).replace(/\s+\S*$/, "") + "…";
}

function slugFromLink(link: string, title: string): string {
  const m = link.match(/\/([a-z0-9-]+-[0-9a-f]{6,})/i);
  if (m) return m[1];
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export async function getMediumPosts(): Promise<ResearchPost[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { "User-Agent": "BlockchainUSC-Site/1.0" },
    });
    if (!res.ok) {
      console.warn(`[medium] feed returned ${res.status}`);
      return [];
    }
    const xml = await res.text();
    const feed = await parser.parseString(xml);

    return feed.items.map((item) => {
      const title = (item.title || "").trim();
      const link = (item.link || "").split("?")[0];
      const date = item.isoDate || item.pubDate || "";
      return {
        slug: slugFromLink(link, title),
        title,
        date,
        tags: (item.categories || []).slice(0, 3),
        excerpt: extractExcerpt(item),
        url: link,
      } satisfies ResearchPost;
    });
  } catch (err) {
    console.warn("[medium] fetch failed:", err instanceof Error ? err.message : err);
    return [];
  }
}
