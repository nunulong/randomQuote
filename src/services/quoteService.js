import { getRandomFallbackQuote } from '../data/fallbackQuotes';

/**
 * 100% Free Quotes Service (No Auth, Full CORS Support):
 * 1. Primary: DummyJSON Quotes API (1,450+ quotes, fast Cloudflare edge CDN, open CORS)
 * 2. Secondary: Motivational Spark API (inspirational quotes, open CORS)
 * 3. Offline Fallback: Curated internal quote library (zero failure rate)
 */

const DUMMYJSON_API_URL = 'https://dummyjson.com/quotes/random';
const MOTIVATIONAL_API_URL = 'https://motivational-spark-api.vercel.app/api/quotes/random';

const fetchWithTimeout = async (url, options = {}, timeoutMs = 4000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const fetchRandomQuote = async () => {
  // 1. Primary: DummyJSON Quotes API
  try {
    const response = await fetchWithTimeout(DUMMYJSON_API_URL, {}, 3500);
    if (response.ok) {
      const data = await response.json();
      if (data && data.quote) {
        return {
          quote: data.quote.trim(),
          author: (data.author && data.author.trim()) || 'Anonymous',
          category: 'Wisdom',
          source: 'DummyJSON'
        };
      }
    }
  } catch (err) {
    console.info('DummyJSON unavailable, switching to secondary motivational API...');
  }

  // 2. Secondary: Motivational Spark API
  try {
    const response = await fetchWithTimeout(MOTIVATIONAL_API_URL, {}, 3500);
    if (response.ok) {
      const data = await response.json();
      if (data && data.quote) {
        return {
          quote: data.quote.trim(),
          author: (data.author && data.author.trim()) || 'Anonymous',
          category: 'Motivation',
          source: 'Motivational Spark'
        };
      }
    }
  } catch (err) {
    console.info('Secondary API unavailable, utilizing curated offline collection...');
  }

  // 3. Guaranteed reliable fallback
  const fallback = getRandomFallbackQuote();
  return {
    quote: fallback.quote,
    author: fallback.author,
    category: fallback.category,
    source: 'Curated Classics'
  };
};
