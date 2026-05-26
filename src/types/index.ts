export type Category = 'Política' | 'Economía' | 'Deportes' | 'Cultura' | 'Tecnología';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  category: Category;
  pubDate: Date;
}

export interface Interaction {
  id: string;
  user_id: string;
  article_id: string;
  article_data: NewsArticle;
  is_favorite: boolean;
  liked_at: string;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
}
