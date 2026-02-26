import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import OurBrand from './components/OurBrand';
import Vision from './components/Vision';
import WhatWeDo from './components/WhatWeDo';
import WhyGoSolar from './components/WhyGoSolar';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';

function HomePage() {
  return (
    <>
      <Header />
      <StatsSection />
      <OurBrand />
      <Vision />
      <WhatWeDo />
      <WhyGoSolar />
      <CallToAction />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-[67px] md:pt-[79px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/calculator" element={<Calculator />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
