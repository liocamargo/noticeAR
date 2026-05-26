'use client';

import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser } from '@/services/supabase/auth';
import * as interactions from '@/services/supabase/interactions';
import type { NewsArticle } from '@/types';

export function useInteractions() {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { user } = await getCurrentUser();
      setUserId(user?.id || null);
    };
    fetchUser();
  }, []);

  const { data: todayInteractions = [] } = useQuery({
    queryKey: ['todayInteractions', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await interactions.getTodayInteractions(userId);
      return data || [];
    },
    enabled: !!userId,
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await interactions.getFavorites(userId);
      return data || [];
    },
    enabled: !!userId,
  });

  const saveInteractionMutation = useMutation({
    mutationFn: (args: { article: NewsArticle; isFavorite?: boolean }) =>
      userId
        ? interactions.saveInteraction(userId, args.article, args.isFavorite)
        : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayInteractions', userId] });
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    },
  });

  const toggleFavoriteMutation = useMutation({
    mutationFn: (args: { articleId: string; isFavorite: boolean }) =>
      userId
        ? interactions.toggleFavorite(userId, args.articleId, args.isFavorite)
        : Promise.reject('No user'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todayInteractions', userId] });
      queryClient.invalidateQueries({ queryKey: ['favorites', userId] });
    },
  });

  const markAsSeenMutation = useMutation({
    mutationFn: (articleId: string) =>
      userId
        ? interactions.markAsSeen(userId, articleId)
        : Promise.reject('No user'),
  });

  return {
    userId,
    todayInteractions,
    favorites,
    saveInteraction: saveInteractionMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    markAsSeen: markAsSeenMutation.mutate,
    isLoading: saveInteractionMutation.isPending || toggleFavoriteMutation.isPending,
  };
}
