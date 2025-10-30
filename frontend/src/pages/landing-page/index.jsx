import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProcessSection from './components/ProcessSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
// Import other landing page components here as they are created

const LandingPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-vh-100 bg-background">
      {/* Navbar is rendered in App.js */}
      <main className="position-relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Benefits Section */}
        <BenefitsSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* CTASection */}
        <CTASection />

        {/* Other landing page sections will go here */}

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn btn-primary-button rounded-circle shadow-lg position-fixed bottom-0 end-0 me-3 mb-3 text-white"
          aria-label="Scroll to top"
          style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <i className="bi bi-arrow-up fs-5"></i>
        </button>
      </main>
      {/* Footer will go here later */}
      <Footer />
    </div>
  );
};

export default LandingPage;
