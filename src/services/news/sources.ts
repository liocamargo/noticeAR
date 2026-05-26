export const RSS_SOURCES = [
  {
    name: 'Infobae',
    url: 'https://www.infobae.com/feed/',
    icon: '🔵',
  },
  {
    name: 'La Nación',
    url: 'https://www.lanacion.com.ar/arc/outboundfeeds/rss/',
    icon: '🔴',
  },
  {
    name: 'La Voz',
    url: 'https://www.lavoz.com.ar/arc/outboundfeeds/rss/',
    icon: '🟢',
  },
  {
    name: 'Clarín',
    url: 'https://www.clarin.com/feed/',
    icon: '🟡',
  },
  {
    name: 'Ámbito',
    url: 'https://www.ambito.com/feed/',
    icon: '🟠',
  },
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  Política: ['política', 'gobierno', 'senado', 'diputados', 'congreso', 'elecciones', 'ministro'],
  Economía: ['economía', 'bolsa', 'dólar', 'banco', 'inversión', 'finanzas', 'comercio'],
  Deportes: ['deporte', 'fútbol', 'tenis', 'rugby', 'basketball', 'olympic'],
  Cultura: ['cultura', 'arte', 'cine', 'música', 'teatro', 'literatura'],
  Tecnología: ['tecnología', 'tech', 'software', 'inteligencia artificial', 'ia', 'app', 'digital'],
};

export function detectCategory(title: string, description: string): string {
  const text = (title + ' ' + description).toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return category;
    }
  }

  return 'Política';
}
