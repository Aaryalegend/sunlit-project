import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-darkFooter text-white py-16">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Top Section - Logo and Description */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-8">
            {/* Logo and Description */}
            <div className="max-w-[343px]">
              <div className="mb-6">
                <img 
                  src={require('../assets/logo-white.svg')} 
                  alt="Sun Lit Tech" 
                  className="h-[90px]"
                  onError={(e) => {
                    e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Sun Lit Tech</div>';
                  }}
                />
              </div>
              <p className="text-base text-lightBlue leading-relaxed">
                Leading solar energy and electrical infrastructure company in India, 
                delivering innovative and sustainable energy solutions since 2017
              </p>
            </div>
          </div>

          {/* Social Media */}
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-6">Socials</h4>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'linkedin', 'youtube'].map((social, index) => (
                <a 
                  key={index}
                  href={`#${social}`}
                  className="w-9 h-9 bg-primary rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <img 
                    src={require(`../assets/${social}-icon.svg`)} 
                    alt={social}
                    className="w-5 h-5"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-3 gap-12 mb-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#journey" className="text-base hover:text-primary transition-colors">Journey with Energy</a></li>
              <li><a href="#blogs" className="text-base hover:text-primary transition-colors">Blogs</a></li>
              <li><a href="#projects" className="text-base hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#gallery" className="text-base hover:text-primary transition-colors">Gallery</a></li>
              <li><a href="#calculator" className="text-base hover:text-primary transition-colors">Calculator</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><a href="#service" className="text-base hover:text-primary transition-colors">On-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-base hover:text-primary transition-colors">Off-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-base hover:text-primary transition-colors">Hybrid Solar Systems</a></li>
              <li><a href="#service" className="text-base hover:text-primary transition-colors">Ground-Mounted Solar</a></li>
              <li><a href="#service" className="text-base hover:text-primary transition-colors">O&M Services</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Contact Us</h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3">
                <img 
                  src={require('../assets/location-icon.svg')} 
                  alt="Location"
                  className="w-5 h-5 mt-1"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <p className="text-base leading-relaxed">
                  15C, B-Wing, 2nd Floor, Kanchanjunga Apt, Above SBI Bank, 
                  Magarpatta, Hadapsar, Pune-411028
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <img 
                  src={require('../assets/mail-icon.svg')} 
                  alt="Email"
                  className="w-5 h-5"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <a href="mailto:sunlittech5@gmail.com" className="text-base hover:text-primary transition-colors">
                  sunlittech5@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-center">
                <img 
                  src={require('../assets/phone-icon.svg')} 
                  alt="Phone"
                  className="w-5 h-5"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <a href="tel:8055142323" className="text-base hover:text-primary transition-colors">
                  8055142323 | 020-20890423
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 my-8"></div>

        {/* Bottom Section */}
        <div className="flex justify-between items-center">
          <p className="text-base">
            © 2026 Sun Lit Tech. All rights reserved.
          </p>
          <p className="text-base">
            ONE EARTH • ONE FAMILY • GREEN FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
