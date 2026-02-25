import React from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import OurBrand from './components/OurBrand';
import Vision from './components/Vision';
import WhatWeDo from './components/WhatWeDo';
import WhyGoSolar from './components/WhyGoSolar';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-[67px] md:pt-[79px]">
        <Header />
        <StatsSection />
        <OurBrand />
        <Vision />
        <WhatWeDo />
        <WhyGoSolar />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}

export default App;
