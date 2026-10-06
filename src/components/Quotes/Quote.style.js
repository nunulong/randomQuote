import styled, { keyframes, css } from 'styled-components';

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.8; }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const toastSlideUp = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 16px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1.25rem 2.5rem;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)'};
  transition: background 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow-x: hidden;

  /* Ambient glowing background shapes */
  &::before, &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
    opacity: 0.45;
  }

  &::before {
    top: -10%;
    left: -5%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
  }

  &::after {
    bottom: -10%;
    right: -5%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  }
`;

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 720px;
  position: relative;
  z-index: 2;
  margin: auto 0;
`;

export const HeaderBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.1rem;
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`;

export const Card = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(24px);
  border-radius: 28px;
  padding: 3rem 2.75rem 2.25rem;
  box-shadow:
    0 20px 45px -10px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.7) inset;
  position: relative;
  transition: all 0.4s ease;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem 1.75rem;
    border-radius: 22px;
  }
`;

export const QuoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const CategoryTag = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ $accent }) => $accent || '#4f46e5'};
  background: ${({ $accent }) => `${$accent}15` || 'rgba(79, 70, 229, 0.1)'};
  padding: 0.3rem 0.85rem;
  border-radius: 9999px;
  border: 1px solid ${({ $accent }) => `${$accent}30` || 'rgba(79, 70, 229, 0.2)'};
`;

export const SourceLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
`;

export const QuoteBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeInScale} 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  min-height: 140px;
  justify-content: center;
`;

export const QuoteTextWrapper = styled.div`
  position: relative;
  padding-left: 2rem;

  @media (max-width: 640px) {
    padding-left: 1.5rem;
  }
`;

export const QuoteIconBadge = styled.div`
  position: absolute;
  top: -4px;
  left: 0;
  color: ${({ $accent }) => $accent || '#4f46e5'};
  opacity: 0.4;
  transition: color 0.5s ease;
`;

export const QuoteText = styled.blockquote`
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.25rem, 3.2vw, 1.85rem);
  font-weight: 600;
  line-height: 1.48;
  color: #0f172a;
  letter-spacing: -0.01em;
  word-break: break-word;
`;

export const AuthorText = styled.cite`
  display: block;
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-style: normal;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  text-align: right;
  margin-top: 0.5rem;

  &::before {
    content: '— ';
    color: ${({ $accent }) => $accent || '#4f46e5'};
    font-weight: 700;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #f1f5f9;
  margin: 2rem 0 1.5rem;
`;

export const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    gap: 1.25rem;
    align-items: stretch;
  }
`;

export const UtilityButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;

  @media (max-width: 520px) {
    justify-content: space-between;
  }
`;

export const IconButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    color: ${({ $accent }) => $accent || '#4f46e5'};
    background: #ffffff;
    border-color: ${({ $accent }) => `${$accent}40` || '#cbd5e1'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ $accent }) => $accent || '#4f46e5'};
    outline-offset: 2px;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.85rem 1.85rem;
  background: ${({ $accent }) => $accent || '#4f46e5'};
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px ${({ $glow }) => $glow || 'rgba(79, 70, 229, 0.35)'};

  &:hover {
    background: ${({ $hoverBg }) => $hoverBg || '#4338ca'};
    transform: translateY(-2px);
    box-shadow: 0 10px 24px ${({ $glow }) => $glow || 'rgba(79, 70, 229, 0.45)'};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    transition: transform 0.3s ease;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(1.15); }
  }
`;

export const FooterContainer = styled.footer`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 2;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.24);
      transform: translateY(-1px);
      color: #ffffff;
    }
  }
`;

export const ToastNotification = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: #0f172a;
  color: #ffffff;
  padding: 0.75rem 1.4rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 100;
  animation: ${toastSlideUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

export const ModalBox = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 540px;
  max-height: 80vh;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${fadeInScale} 0.3s ease;
`;

export const ModalHeader = styled.div`
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;

  h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
  }
`;

export const ModalBody = styled.div`
  padding: 1.25rem 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SavedQuoteItem = styled.div`
  padding: 1rem;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    color: #1e293b;
    line-height: 1.45;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: #64748b;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #94a3b8;
  font-size: 0.95rem;
`;