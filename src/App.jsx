import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Header from './components/Header';
import StatsSection from './components/StatsSection';
import OurBrand from './components/OurBrand';
import Vision from './components/Vision';
import WhatWeDo from './components/WhatWeDo';
import WhyGoSolar from './components/WhyGoSolar';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Gallery from './pages/Gallery';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Calculator from './pages/Calculator';
import AdminDashboard from './pages/AdminDashboard';
import GalleryAdmin from './pages/GalleryAdmin';
import CareersAdmin from './pages/CareersAdmin';
import BlogsAdmin from './pages/BlogsAdmin';
import ProjectsAdmin from './pages/ProjectsAdmin';

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

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {!isAdmin && <Navigation />}
      <div className={!isAdmin ? 'pt-[67px] md:pt-[79px]' : ''}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />

          {/* Admin Routes — wrapped with auth gate */}
          <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/gallery" element={<AdminLayout><GalleryAdmin /></AdminLayout>} />
          <Route path="/admin/careers" element={<AdminLayout><CareersAdmin /></AdminLayout>} />
          <Route path="/admin/blogs" element={<AdminLayout><BlogsAdmin /></AdminLayout>} />
          <Route path="/admin/projects" element={<AdminLayout><ProjectsAdmin /></AdminLayout>} />
        </Routes>
        {!isAdmin && <Footer />}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
