import React from 'react';

const Navigation = () => {
  return (
    <nav className="w-full bg-white px-7 py-6">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-[133px] h-[47px]">
          <img 
            src={require('../assets/logo.svg')} 
            alt="Sun Lit Tech Logo" 
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="133" height="47"><rect width="133" height="47" fill="%231976D2"/><text x="50%" y="50%" fill="white" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12">Sun Lit Tech</text></svg>';
            }}
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 font-bold text-base">
          <a href="#journey" className="text-primary hover:text-blue-700 transition-colors">
            Journey with Energy
          </a>
          <a href="#projects" className="text-dark hover:text-primary transition-colors">
            projects
          </a>
          <a href="#blogs" className="text-dark hover:text-primary transition-colors">
            blogs
          </a>
          <a href="#gallery" className="text-dark hover:text-primary transition-colors">
            gallery
          </a>
          <a href="#careers" className="text-dark hover:text-primary transition-colors">
            careers
          </a>
          <a href="#contact" className="text-dark hover:text-primary transition-colors">
            contact
          </a>
          <a href="#calculator" className="text-dark hover:text-primary transition-colors">
            calculator
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
