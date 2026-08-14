import { useEffect, useState } from 'react';
import Header from './components/landing/Header';
import Footer from './components/landing/Footer';
import YouTubeShowcase from './components/landing/YouTubeShowcase';
import UseCaseGrid from './components/landing/UseCaseGrid';
import WorkflowSection from './components/landing/WorkflowSection';
import ThreePillars from './components/landing/ThreePillars';
import ArchitectureSection from './components/landing/ArchitectureSection';
import RulesAsCodeSection from './components/landing/RulesAsCodeSection';
import RBACSection from './components/landing/RBACSection';
import ComparisonTable from './components/landing/ComparisonTable';
import StackReadout from './components/landing/StackReadout';
import AppCatalogSection from './components/landing/AppCatalogSection';
import SelfHostCE from './components/landing/SelfHostCE';
import ConsultingSection from './components/landing/ConsultingSection';
import { ChatPopup } from './components/ChatPopup';
import FeedbackModal from './components/FeedbackModal';
import DeveloperReviewModal from './components/DeveloperReviewModal';
import ConsultingModal from './components/ConsultingModal';
import { useReveal } from './hooks/useReveal';

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
        <YouTubeShowcase />
        <UseCaseGrid />
        <WorkflowSection />
        <ThreePillars />
        <ArchitectureSection />
        <RulesAsCodeSection />
        <RBACSection />
        <ComparisonTable />
        <StackReadout />
        <AppCatalogSection />
        <SelfHostCE />
        <ConsultingSection onEnquire={() => setConsultingSource('consulting_section')} />
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
