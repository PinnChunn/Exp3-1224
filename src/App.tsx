import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import EventCard from './components/EventCard';
import AuthModal from './components/AuthModal';
import SkillPaths from './components/SkillPaths';
import Footer from './components/Footer';
import PaymentModal from './components/PaymentModal';
import EventDetailPage from './components/EventDetailPage';
import { FEATURED_EVENT } from './constants/events';
import { useAuth } from './lib/supabase/hooks';

export default function App() {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleEventRegistration = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!isRegistered) {
      setIsPaymentModalOpen(true);
      return;
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    handleEventRegistration();
  };

  const handlePaymentSuccess = () => {
    setIsRegistered(true);
    setIsPaymentModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/events/:id" element={<EventDetailPage event={FEATURED_EVENT} />} />
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <Header 
                isAuthenticated={!!user}
                onLogin={() => setIsAuthModalOpen(true)}
                onLogout={() => setIsRegistered(false)}
              />

              <main className="pt-16">
                <Hero onConnect={() => setIsAuthModalOpen(true)} />
                <Benefits />

                <section id="events" className="py-20">
                  <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                      Featured Event
                    </h2>
                    <div className="max-w-2xl mx-auto">
                      <EventCard
                        {...FEATURED_EVENT}
                        onRegister={handleEventRegistration}
                        isAuthenticated={!!user}
                        isRegistered={isRegistered}
                      />
                    </div>
                  </div>
                </section>

                <SkillPaths />
              </main>

              <AuthModal 
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
              />

              <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSuccess={handlePaymentSuccess}
                price={FEATURED_EVENT.price}
                title={FEATURED_EVENT.title}
              />

              <Footer />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}