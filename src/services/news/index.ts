import { RSS_SOURCES } from './sources';
import { parseRSSFeed } from './rss';
import type { NewsArticle } from '@/types';

export async function fetchAllNews(): Promise<NewsArticle[]> {
  const allFeeds = await Promise.allSettled(
    RSS_SOURCES.map((source) => parseRSSFeed(source.url, source.name))
  );

  const articles: NewsArticle[] = [];

  for (const result of allFeeds) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  return articles.sort(() => Math.random() - 0.5);
}

export { RSS_SOURCES };
