import { XMLParser } from 'fast-xml-parser';
import type { NewsArticle, Category } from '@/types';
import { detectCategory } from './sources';

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  'media:content'?: { '@_url': string } | { '@_url': string }[];
  image?: { url: string };
  enclosure?: { '@_url': string };
}

interface RSSchannelWithItems {
  item: RSSItem | RSSItem[];
}

interface RSSRoot {
  rss?: { channel: RSSchannelWithItems };
  feed?: {
    entry: RSSItem | RSSItem[];
  };
}

async function fetchRSS(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.text();
}

export async function parseRSSFeed(
  feedUrl: string,
  sourceName: string
): Promise<NewsArticle[]> {
  try {
    const xml = await fetchRSS(feedUrl);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });
    const data = parser.parse(xml) as RSSRoot;

    const items = extractItems(data);
    if (!Array.isArray(items)) return [];

    return items.slice(0, 20).map((item) => ({
      id: Buffer.from(item.link || '').toString('base64').substring(0, 50),
      title: item.title || 'Sin título',
      description: stripHtml(item.description || ''),
      url: item.link || '',
      image: extractImage(item),
      source: sourceName,
      category: detectCategory(item.title || '', item.description || '') as Category,
      pubDate: new Date(item.pubDate || new Date()),
    }));
  } catch (error) {
    console.error(`Error parsing ${sourceName}:`, error);
    return [];
  }
}

function extractItems(data: RSSRoot): RSSItem[] {
  if (data.rss?.channel?.item) {
    return Array.isArray(data.rss.channel.item)
      ? data.rss.channel.item
      : [data.rss.channel.item];
  }
  if (data.feed?.entry) {
    return Array.isArray(data.feed.entry) ? data.feed.entry : [data.feed.entry];
  }
  return [];
}

function extractImage(item: RSSItem): string | null {
  if (item['media:content']) {
    const media = Array.isArray(item['media:content'])
      ? item['media:content'][0]
      : item['media:content'];
    return media['@_url'] || null;
  }

  if (item.image?.url) return item.image.url;
  if (item.enclosure?.['@_url']) return item.enclosure['@_url'];

  return null;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').substring(0, 200);
}
