export const FALLBACK_QUOTES = [
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "Wisdom"
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Inspiration"
  },
  {
    quote: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: "Inspiration"
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: "Perseverance"
  },
  {
    quote: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "Philosophy"
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
    category: "Wisdom"
  },
  {
    quote: "We become what we think about.",
    author: "Earl Nightingale",
    category: "Mindset"
  },
  {
    quote: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "Philosophy"
  },
  {
    quote: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey",
    category: "Inspiration"
  },
  {
    quote: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    category: "Philosophy"
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Wisdom"
  },
  {
    quote: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Inspiration"
  },
  {
    quote: "Nothing in life is to be feared, it is only to be understood.",
    author: "Marie Curie",
    category: "Science"
  },
  {
    quote: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: "Courage"
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "Action"
  },
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Life"
  },
  {
    quote: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Mindset"
  },
  {
    quote: "It always seems impossible until it is done.",
    author: "Nelson Mandela",
    category: "Perseverance"
  },
  {
    quote: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.",
    author: "Buddha",
    category: "Mindfulness"
  },
  {
    quote: "Knowing others is intelligence; knowing yourself is true wisdom.",
    author: "Lao Tzu",
    category: "Wisdom"
  },
  {
    quote: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    category: "Philosophy"
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Perseverance"
  },
  {
    quote: "Creativity is intelligence having fun.",
    author: "Albert Einstein",
    category: "Inspiration"
  },
  {
    quote: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington",
    category: "Wisdom"
  }
];

export const getRandomFallbackQuote = () => {
  const index = Math.floor(Math.random() * FALLBACK_QUOTES.length);
  return FALLBACK_QUOTES[index];
};
