import { useEffect, useState } from 'react';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import YouTubeShowcase from './components/landing/YouTubeShowcase';
import UseCaseGrid from './components/landing/UseCaseGrid';
import WorkflowSection from './components/landing/WorkflowSection';
import ThreePillars from './components/landing/ThreePillars';
import ArchitectureSection from './components/landing/ArchitectureSection';
import RBACSection from './components/landing/RBACSection';
import ComparisonTable from './components/landing/ComparisonTable';
import StackReadout from './components/landing/StackReadout';
import SelfHostCE from './components/landing/SelfHostCE';
import { ChatPopup } from './components/ChatPopup';
import FeedbackModal from './components/FeedbackModal';
import DeveloperReviewModal from './components/DeveloperReviewModal';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

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
      <Header />

      <main className="flex-1">
        <YouTubeShowcase />
        <UseCaseGrid />
        <WorkflowSection />
        <ThreePillars />
        <ArchitectureSection />
        <RBACSection />
        <ComparisonTable />
        <StackReadout />
        <SelfHostCE />
      </main>

      <Footer onFeedback={() => setFeedbackOpen(true)} onReview={() => setReviewOpen(true)} />

      <ChatPopup />
      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} />
      <DeveloperReviewModal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} />
    </div>
  );
}
