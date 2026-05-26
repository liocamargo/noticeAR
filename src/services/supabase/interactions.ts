import { supabase } from './client';
import type { NewsArticle, Interaction } from '@/types';

export async function saveInteraction(
  userId: string,
  article: NewsArticle,
  isFavorite: boolean = false
) {
  const articleId = generateArticleId(article.url);

  const { data, error } = await supabase
    .from('news_interactions')
    .upsert(
      {
        user_id: userId,
        article_id: articleId,
        article_data: article,
        is_favorite: isFavorite,
        liked_at: new Date().toISOString().split('T')[0],
      },
      { onConflict: 'user_id, article_id' }
    )
    .select();

  return { data, error };
}

export async function markAsSeen(userId: string, articleId: string) {
  const { error } = await supabase.from('news_seen').insert({
    user_id: userId,
    article_id: articleId,
  });

  return { error };
}

export async function getTodayInteractions(userId: string) {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('news_interactions')
    .select('*')
    .eq('user_id', userId)
    .eq('liked_at', today)
    .eq('is_favorite', false);

  return { data: data as Interaction[] | null, error };
}

export async function getFavorites(userId: string) {
  const { data, error } = await supabase
    .from('news_interactions')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('created_at', { ascending: false });

  return { data: data as Interaction[] | null, error };
}

export async function toggleFavorite(
  userId: string,
  articleId: string,
  isFavorite: boolean
) {
  const { error } = await supabase
    .from('news_interactions')
    .update({ is_favorite: isFavorite })
    .eq('user_id', userId)
    .eq('article_id', articleId);

  return { error };
}

export async function getSeenArticles(userId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('news_seen')
    .select('article_id')
    .eq('user_id', userId);

  if (error) return [];
  return (data || []).map((item) => item.article_id);
}

export function generateArticleId(url: string): string {
  return Buffer.from(url).toString('base64').substring(0, 50);
}
