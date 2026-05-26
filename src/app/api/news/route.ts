import { fetchAllNews } from '@/services/news';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const news = await fetchAllNews();
    return NextResponse.json(news, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}
