import { useEffect, useState } from 'react';
import Header from './components/landing/Header';
import Hero from './components/landing/Hero';
import LedgerRail from './components/landing/LedgerRail';
import HostSection from './components/landing/HostSection';
import PlatformSection from './components/landing/PlatformSection';
import ShipsWithSection from './components/landing/ShipsWithSection';
import SecuritySection from './components/landing/SecuritySection';
import CompareSection from './components/landing/CompareSection';
import WatchStrip from './components/landing/WatchStrip';
import InstallCta from './components/landing/InstallCta';
import Footer from './components/landing/Footer';
import { ChatPopup } from './components/ChatPopup';
import FeedbackModal from './components/FeedbackModal';
import DeveloperReviewModal from './components/DeveloperReviewModal';
import ConsultingModal from './components/ConsultingModal';
import { useReveal } from './hooks/useReveal';

// Variant A — "Editorial ledger". A numbered drill-down: the hero states the
// thesis, the ledger rail lists the four stops, each section takes one.
export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  // Tracks which CTA opened the consulting modal, so the enquiry record says where it came from.
  const [consultingSource, setConsultingSource] = useState<string | null>(null);

  useReveal();

  // Clean URL if version query param is present
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('version')) {
      url.searchParams.delete('version');
      const newUrl = url.pathname + (url.search || '') + url.hash;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onEnquire={() => setConsultingSource('header')} />

      <main className="flex-1">
        <Hero onEnquire={() => setConsultingSource('hero')} />
        <LedgerRail />
        <HostSection />
        <PlatformSection />
        <ShipsWithSection />
        <SecuritySection />
        <CompareSection />
        <WatchStrip />
        <InstallCta onEnquire={() => setConsultingSource('install_cta')} />
      </main>

      <Footer
        onFeedback={() => setFeedbackOpen(true)}
        onReview={() => setReviewOpen(true)}
        onEnquire={() => setConsultingSource('footer')}
      />

      <ChatPopup />
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <DeveloperReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
      <ConsultingModal
        isOpen={consultingSource !== null}
        onClose={() => setConsultingSource(null)}
        source={consultingSource ?? 'landing-page'}
      />
    </div>
  );
}
