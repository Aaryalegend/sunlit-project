import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-white px-4 md:px-7 py-4 md:py-6 shadow-md z-50">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div className="w-[100px] h-[35px] md:w-[133px] md:h-[47px]">
          <Link to="/">
            <img 
              src={require('../assets/logo.png')} 
              alt="Sun Lit Tech Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="133" height="47"><rect width="133" height="47" fill="%231976D2"/><text x="50%" y="50%" fill="white" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12">Sun Lit Tech</text></svg>';
              }}
            />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-dark"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-base ml-auto">
          <Link to="/" className={`${isActive('/') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors whitespace-nowrap`}>
            Journey with Energy
          </Link>
          <Link to="/projects" className={`${isActive('/projects') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            projects
          </Link>
          <Link to="/blogs" className={`${isActive('/blogs') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            blogs
          </Link>
          <Link to="/gallery" className={`${isActive('/gallery') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            gallery
          </Link>
          <Link to="/careers" className={`${isActive('/careers') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            careers
          </Link>
          <Link to="/contact" className={`${isActive('/contact') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            contact
          </Link>
          <Link to="/calculator" className={`${isActive('/calculator') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors`}>
            calculator
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-[67px] left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col py-4 px-4 space-y-3 font-bold text-base">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={`${isActive('/') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                Journey with Energy
              </Link>
              <Link to="/projects" onClick={() => setIsMenuOpen(false)} className={`${isActive('/projects') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                projects
              </Link>
              <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className={`${isActive('/blogs') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                blogs
              </Link>
              <Link to="/gallery" onClick={() => setIsMenuOpen(false)} className={`${isActive('/gallery') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                gallery
              </Link>
              <Link to="/careers" onClick={() => setIsMenuOpen(false)} className={`${isActive('/careers') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                careers
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={`${isActive('/contact') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                contact
              </Link>
              <Link to="/calculator" onClick={() => setIsMenuOpen(false)} className={`${isActive('/calculator') ? 'text-primary' : 'text-dark'} hover:text-primary transition-colors py-2`}>
                calculator
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;