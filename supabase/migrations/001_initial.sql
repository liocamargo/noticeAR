-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- news_interactions table
CREATE TABLE public.news_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id TEXT NOT NULL,
  article_data JSONB NOT NULL,
  is_favorite BOOLEAN DEFAULT FALSE,
  liked_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, article_id)
);

-- news_seen table
CREATE TABLE public.news_seen (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id TEXT NOT NULL,
  seen_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, article_id)
);

-- Enable Row Level Security
ALTER TABLE public.news_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_seen ENABLE ROW LEVEL SECURITY;

-- RLS Policies for news_interactions
CREATE POLICY "Users can view their own interactions" ON public.news_interactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interactions" ON public.news_interactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interactions" ON public.news_interactions
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions" ON public.news_interactions
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for news_seen
CREATE POLICY "Users can view their own seen articles" ON public.news_seen
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own seen articles" ON public.news_seen
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own seen articles" ON public.news_seen
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_news_interactions_user_id ON public.news_interactions(user_id);
CREATE INDEX idx_news_interactions_liked_at ON public.news_interactions(liked_at);
CREATE INDEX idx_news_interactions_is_favorite ON public.news_interactions(is_favorite);
CREATE INDEX idx_news_seen_user_id ON public.news_seen(user_id);
