# 🌟 InspireMe — Random Quote Machine

A beautifully crafted, modern Random Quote Machine built with React and Styled Components. Experience timeless wisdom and inspiration paired with sleek glassmorphism design, fluid dynamic gradient transitions, audio narration, and instant sharing.

🔗 **[Live Demo](https://nunulong.github.io/randomQuote/)** | 👨‍💻 **Author: [Ting Wang](https://nunulong.github.io/portfolios/#/)**

---

## ✨ Features

- 🎯 **Resilient Multi-Source Quotes**:
  - Integrated with **[DummyJSON Quotes API](https://dummyjson.com/quotes/random)** (1,450+ quotes, open CORS, high availability).
  - Secondary fallback to **[Motivational Spark API](https://motivational-spark-api.vercel.app/api/quotes/random)** & built-in curated classics for 100% reliability and zero downtime.
- 🎨 **Dynamic Aesthetic Themes**:
  - Curated designer gradients (Sunset Radiance, Emerald Aurora, Cosmic Violet, Ocean Azure, Velvet Slate, and more).
  - Smooth fluid background color transitions.
- 🔊 **Text-to-Speech (Audio Narration)**:
  - Listen to quotes spoken aloud using the Web Speech Synthesis API.
- 📋 **One-Click Clipboard Copy**:
  - Instant quote copying with animated toast feedback.
- 🐦 **Social Sharing**:
  - Share directly to Twitter/X with formatted text and hashtags.
- ❤️ **Favorites & Bookmark System**:
  - Save your favorite quotes to local storage and revisit them anytime via the favorites drawer.
- 🏷️ **Category Filtering**:
  - Filter quotes across Inspiration, Philosophy, Wisdom, Success, and Life.
- 📱 **Fully Responsive & Accessible**:
  - Fluid typography and responsive design optimized for smartphones, tablets, and 4K displays.
  - WCAG-compliant contrast and keyboard accessibility.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Styling**: [Styled-Components](https://styled-components.com/)
- **Typography**: Plus Jakarta Sans & Playfair Display
- **Deployment**: GitHub Pages (`gh-pages`)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v16+) and npm installed.

### Installation

```bash
# Clone repository
git clone https://github.com/nunulong/randomQuote.git

# Enter project directory
cd randomQuote

# Install dependencies
npm install

# Start development server
npm start
```

Runs the app in development mode at `http://localhost:3000/randomQuote`.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deploying to GitHub Pages

```bash
npm run deploy
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Special thanks to [DummyJSON](https://dummyjson.com/) and [Motivational Spark](https://motivational-spark-api.vercel.app/) for providing free and open quote APIs.
