import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="w-full bg-[#082757] text-white relative">
      <div className="w-full px-4 md:px-12 py-8 md:py-16 flex flex-col gap-12">
        {/* Logos - Flex Container */}
        <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center w-full">
          <div>
            <img 
              src={require('../assets/logo.png')} 
              alt="Sun Lit Tech" 
              className="h-[60px] md:h-[90px] w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Sun Lit Tech</div>';
              }}
            />
          </div>
              
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <img 
              src={require('../assets/jal-hai.png')} 
              alt="Jal Hai Toh Kal Hai" 
              className="h-[60px] md:h-[90px] w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Jal Hai</div>';
              }}
            />
          </div>

          <div>
            <img 
              src={require('../assets/save-girl.png')} 
              alt="Save Girl Child" 
              className="h-[30px] md:h-[45px] w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Save Girl</div>';
              }}
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 w-full">
          {/* Description & Socials */}
          <div className="flex flex-col gap-8">
            <p className="text-base md:text-xl font-normal text-[#E6F2FF] leading-[1.226] tracking-[0.05em]">
              Leading solar energy and electrical infrastructure company in India, 
              delivering innovative and sustainable energy solutions since 2017
            </p>

            <div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-[0.05em]">Socials</h4>
              <div className="flex gap-4">
                <a href="#facebook" className="w-9 h-9 hover:opacity-80 transition-opacity bg-white/10 rounded-full flex items-center justify-center">
                  <img src={require('../assets/facebook-icon.svg').default || require('../assets/facebook-icon.svg')} alt="Facebook" className="w-5 h-5" onError={(e) => e.target.style.display = 'none'} />
                </a>
                <a href="#instagram" className="w-9 h-9 hover:opacity-80 transition-opacity bg-white/10 rounded-full flex items-center justify-center">
                  <img src={require('../assets/instagram-icon.svg').default || require('../assets/instagram-icon.svg')} alt="Instagram" className="w-5 h-5" onError={(e) => e.target.style.display = 'none'} />
                </a>
                <a href="#linkedin" className="w-9 h-9 hover:opacity-80 transition-opacity bg-white/10 rounded-full flex items-center justify-center">
                  <img src={require('../assets/linkedin-icon.svg').default || require('../assets/linkedin-icon.svg')} alt="LinkedIn" className="w-5 h-5" onError={(e) => e.target.style.display = 'none'} />
                </a>
                <a href="#youtube" className="w-9 h-9 hover:opacity-80 transition-opacity bg-white/10 rounded-full flex items-center justify-center">
                  <img src={require('../assets/youtube-icon.svg').default || require('../assets/youtube-icon.svg')} alt="YouTube" className="w-5 h-5" onError={(e) => e.target.style.display = 'none'} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-[0.05em]">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Journey with Energy</Link></li>
              <li><Link to="/careers" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Careers</Link></li>
              <li><Link to="/blogs" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Blogs</Link></li>
              <li><Link to="/projects" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Projects</Link></li>
              <li><Link to="/gallery" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Gallery</Link></li>
              <li><Link to="/calculator" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Calculator</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-[0.05em]">Our Services</h4>
            <ul className="space-y-4">
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">On-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Off-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Hybrid Solar Systems</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Ground-Mounted Solar</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">O&M Services</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-xl md:text-2xl font-bold mb-4 tracking-[0.05em]">Contact Us</h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3 items-start">
                <img src={require('../assets/location-icon.svg')} alt="Location" className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] mt-1 flex-shrink-0" onError={(e) => e.target.style.display = 'none'} />
                <p className="text-sm md:text-base leading-[1.4] tracking-[0.05em]">
                  15C, B-Wing, 2nd Floor, Kanchanjunga Apt, Above SBI Bank, 
                  Magarpatta, Hadapsar, Pune-411028
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <img src={require('../assets/mail-icon.svg')} alt="Email" className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] flex-shrink-0" onError={(e) => e.target.style.display = 'none'} />
                <a href="mailto:sunlittech5@gmail.com" className="text-sm md:text-base hover:text-[#1976D2] transition-colors break-all leading-[1.226] tracking-[0.05em]">
                  sunlittech5@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center">
                <img src={require('../assets/phone-icon.svg')} alt="Phone" className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] flex-shrink-0" onError={(e) => e.target.style.display = 'none'} />
                <a href="tel:8055142323" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">
                  8055142323 | 020-20890423
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-50 w-full" style={{ borderWidth: '0.5px' }}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left w-full relative">
          <p className="text-sm md:text-base leading-[1.226] tracking-[0.05em] flex-1">
            © 2026 Sun Lit Tech. All rights reserved.
          </p>
          <p className="text-sm md:text-base leading-[1.226] tracking-[0.05em] flex-1 text-center font-bold">
            ONE EARTH • ONE FAMILY • GREEN FUTURE
          </p>
          <div className="flex-1 flex justify-center md:justify-end">
            <button 
              onClick={scrollToTop}
              className="bg-[#1976D2] hover:bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1 shadow-lg"
              title="Scroll to Top"
              aria-label="Scroll to Top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;