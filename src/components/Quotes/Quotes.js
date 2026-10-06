import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  PageWrapper,
  MainContent,
  HeaderBadge,
  Card,
  QuoteHeader,
  CategoryTag,
  SourceLabel,
  QuoteBody,
  QuoteTextWrapper,
  QuoteIconBadge,
  QuoteText,
  AuthorText,
  Divider,
  ActionBar,
  UtilityButtonGroup,
  IconButton,
  PrimaryButton,
  FooterContainer,
  ToastNotification,
  ModalBackdrop,
  ModalBox,
  ModalHeader,
  ModalBody,
  SavedQuoteItem,
  EmptyState
} from './Quote.style';
import {
  QuoteLeftIcon,
  RefreshIcon,
  CopyIcon,
  CheckIcon,
  TwitterIcon,
  VolumeIcon,
  HeartIcon,
  BookmarkListIcon,
  GithubIcon,
  CloseIcon,
  TrashIcon
} from './Icons';
import { PALETTES, getRandomPalette } from '../../themes/palettes';
import { fetchRandomQuote } from '../../services/quoteService';

const FAVORITES_STORAGE_KEY = 'inspire_me_saved_quotes_v1';

function Quotes() {
  const [quoteData, setQuoteData] = useState({
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: "Wisdom",
    source: "Classic"
  });

  const [currentPalette, setCurrentPalette] = useState(() => getRandomPalette().palette);
  const [paletteIndex, setPaletteIndex] = useState(() => currentPalette?.hue ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toastTimeoutRef = useRef(null);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleNextQuote = useCallback(async () => {
    if (isLoading) return;

    // Cancel any ongoing speech
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setIsLoading(true);

    try {
      const newQuote = await fetchRandomQuote();
      const { palette, index } = getRandomPalette(paletteIndex);

      setQuoteData(newQuote);
      setCurrentPalette(palette);
      setPaletteIndex(index);
    } catch (err) {
      console.error('Error fetching quote:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, paletteIndex]);

  // Initial fetch on mount
  useEffect(() => {
    handleNextQuote();
  }, []);

  const handleCopyQuote = () => {
    const textToCopy = `"${quoteData.quote}" — ${quoteData.author}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
      toastTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2400);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  };

  const handleTweetQuote = () => {
    const tweetText = encodeURIComponent(`"${quoteData.quote}" — ${quoteData.author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?hashtags=Quote,DailyInspiration&text=${tweetText}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      `${quoteData.quote}. By ${quoteData.author}`
    );
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const isCurrentFavorited = favorites.some(
    item => item.quote === quoteData.quote && item.author === quoteData.author
  );

  const handleToggleFavorite = () => {
    if (isCurrentFavorited) {
      setFavorites(prev =>
        prev.filter(
          item => !(item.quote === quoteData.quote && item.author === quoteData.author)
        )
      );
    } else {
      setFavorites(prev => [
        {
          quote: quoteData.quote,
          author: quoteData.author,
          category: quoteData.category || 'Wisdom',
          date: new Date().toLocaleDateString()
        },
        ...prev
      ]);
    }
  };

  const handleRemoveFavorite = (quoteToRemove) => {
    setFavorites(prev =>
      prev.filter(item => item.quote !== quoteToRemove.quote)
    );
  };

  return (
    <PageWrapper $gradient={currentPalette.gradient}>
      <MainContent>
        <HeaderBadge>
          <span>✨ Daily Inspiration</span>
        </HeaderBadge>

        <Card>
          <QuoteHeader>
            <CategoryTag $accent={currentPalette.accent}>
              {quoteData.category || 'Wisdom'}
            </CategoryTag>
            <SourceLabel>Source: {quoteData.source || 'Inspiration'}</SourceLabel>
          </QuoteHeader>

          <QuoteBody key={quoteData.quote}>
            <QuoteTextWrapper>
              <QuoteIconBadge $accent={currentPalette.accent}>
                <QuoteLeftIcon size={24} />
              </QuoteIconBadge>
              <QuoteText id="text">
                {quoteData.quote}
              </QuoteText>
            </QuoteTextWrapper>

            <AuthorText id="author" $accent={currentPalette.accent}>
              {quoteData.author}
            </AuthorText>
          </QuoteBody>

          <Divider />

          <ActionBar>
            <UtilityButtonGroup>
              <IconButton
                id="copy-quote"
                $accent={currentPalette.accent}
                onClick={handleCopyQuote}
                title="Copy quote"
                aria-label="Copy quote to clipboard"
              >
                {isCopied ? <CheckIcon color="#10b981" /> : <CopyIcon />}
              </IconButton>

              <IconButton
                id="tweet-quote"
                $accent={currentPalette.accent}
                onClick={handleTweetQuote}
                title="Share on X (Twitter)"
                aria-label="Share quote on Twitter"
              >
                <TwitterIcon />
              </IconButton>

              <IconButton
                id="speak-quote"
                $accent={currentPalette.accent}
                onClick={handleToggleSpeech}
                title={isSpeaking ? "Stop listening" : "Listen to quote"}
                aria-label="Read quote aloud"
              >
                <VolumeIcon active={isSpeaking} />
              </IconButton>

              <IconButton
                id="save-quote"
                $accent={currentPalette.accent}
                onClick={handleToggleFavorite}
                title={isCurrentFavorited ? "Remove from favorites" : "Save to favorites"}
                aria-label="Bookmark quote"
              >
                <HeartIcon filled={isCurrentFavorited} />
              </IconButton>

              <IconButton
                id="view-favorites"
                $accent={currentPalette.accent}
                onClick={() => setShowFavoritesModal(true)}
                title={`Saved quotes (${favorites.length})`}
                aria-label="View saved quotes"
              >
                <BookmarkListIcon />
              </IconButton>
            </UtilityButtonGroup>

            <PrimaryButton
              id="new-quote"
              $accent={currentPalette.accent}
              $hoverBg={currentPalette.accentHover}
              $glow={currentPalette.cardGlow}
              onClick={handleNextQuote}
              disabled={isLoading}
              aria-label="Get a new quote"
            >
              <RefreshIcon spinning={isLoading} />
              <span>{isLoading ? 'Fetching...' : 'New Quote'}</span>
            </PrimaryButton>
          </ActionBar>
        </Card>

        <FooterContainer>
          <a
            href="https://nunulong.github.io/portfolios/#/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>👨‍💻 Created by Ting Wang</span>
          </a>
          <a
            href="https://github.com/nunulong/randomQuote"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>
        </FooterContainer>
      </MainContent>

      {/* Toast Notification */}
      {isCopied && (
        <ToastNotification role="status">
          <CheckIcon size={18} />
          <span>Quote copied to clipboard!</span>
        </ToastNotification>
      )}

      {/* Favorites Modal */}
      {showFavoritesModal && (
        <ModalBackdrop onClick={() => setShowFavoritesModal(false)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Saved Favorites ({favorites.length})</h3>
              <IconButton
                onClick={() => setShowFavoritesModal(false)}
                title="Close"
                aria-label="Close modal"
              >
                <CloseIcon />
              </IconButton>
            </ModalHeader>
            <ModalBody>
              {favorites.length === 0 ? (
                <EmptyState>
                  <p>No quotes saved yet.</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Click the ❤️ heart icon to save quotes here!
                  </p>
                </EmptyState>
              ) : (
                favorites.map((fav, i) => (
                  <SavedQuoteItem key={`${fav.quote}-${i}`}>
                    <p>“{fav.quote}”</p>
                    <div>
                      <span>— {fav.author}</span>
                      <IconButton
                        style={{ width: '32px', height: '32px', border: 'none' }}
                        onClick={() => handleRemoveFavorite(fav)}
                        title="Delete quote"
                        aria-label="Delete quote"
                      >
                        <TrashIcon size={16} />
                      </IconButton>
                    </div>
                  </SavedQuoteItem>
                ))
              )}
            </ModalBody>
          </ModalBox>
        </ModalBackdrop>
      )}
    </PageWrapper>
  );
}

export default Quotes;
