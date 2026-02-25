import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#171D27] text-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-0 py-8 md:py-0 md:h-[628px] relative">
        {/* Logos - Flex Container */}
        <div className="mb-6 md:mb-0 md:absolute md:left-0 md:right-0 md:top-[38px] flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div>
            <img 
              src={require('../assets/logo.png')} 
              alt="Sun Lit Tech" 
              className="h-[60px] md:h-[90px] md:w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Sun Lit Tech</div>';
              }}
            />
          </div>
              
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <img 
              src={require('../assets/jal-hai.png')} 
              alt="Jal Hai Toh Kal Hai" 
              className="h-[60px] md:h-[90px] md:w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Jal Hai</div>';
              }}
            />
          </div>

          <div className="md:ml-auto">
            <img 
              src={require('../assets/save-girl.png')} 
              alt="Save Girl Child" 
              className="h-[30px] md:h-[45px] md:w-auto object-contain"
              onError={(e) => {
                e.target.outerHTML = '<div style="color: white; font-size: 24px; font-weight: bold;">Save Girl</div>';
              }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 md:mb-0 md:absolute md:left-[28px] md:top-[208px] md:w-[343px]">
          <p className="text-base md:text-xl font-normal text-[#E6F2FF] leading-[1.226] tracking-[0.05em]">
            Leading solar energy and electrical infrastructure company in India, 
            delivering innovative and sustainable energy solutions since 2017
          </p>
        </div>

        {/* Social Media */}
        <div className="mb-12 md:mb-0 md:absolute md:left-[30px] md:top-[384px]">
          <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 tracking-[0.05em]">Socials</h4>
          <div className="flex gap-4 md:gap-8">
            <a 
              href="#facebook"
              className="w-9 h-9 hover:opacity-80 transition-opacity"
            >
              <img 
                src={require('../assets/facebook-icon.svg')} 
                alt="Facebook"
                className="w-9 h-9"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            <a 
              href="#instagram"
              className="w-9 h-9 hover:opacity-80 transition-opacity"
            >
              <img 
                src={require('../assets/instagram-icon.svg')} 
                alt="Instagram"
                className="w-9 h-9"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            <a 
              href="#linkedin"
              className="w-9 h-9 hover:opacity-80 transition-opacity"
            >
              <img 
                src={require('../assets/linkedin-icon.svg')} 
                alt="LinkedIn"
                className="w-9 h-9"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
            <a 
              href="#youtube"
              className="w-9 h-9 hover:opacity-80 transition-opacity"
            >
              <img 
                src={require('../assets/youtube-icon.svg')} 
                alt="YouTube"
                className="w-9 h-9"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </a>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 md:mb-0">
          {/* Quick Links */}
          <div className="md:absolute md:left-[417px] md:top-[187px] md:w-[170px]">
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-[25px] tracking-[0.05em]">Quick Links</h4>
            <ul className="space-y-2 md:space-y-[9px]">
              <li><a href="#journey" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Journey with Energy</a></li>
              <li><a href="#blogs" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Blogs</a></li>
              <li><a href="#projects" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Projects</a></li>
              <li><a href="#gallery" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Gallery</a></li>
              <li><a href="#calculator" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Calculator</a></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="md:absolute md:left-[660px] md:top-[187px] md:w-[194px]">
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-[20px] tracking-[0.05em]">Our Services</h4>
            <ul className="space-y-2 md:space-y-[14px]">
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">On-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Off-Grid Solar Solutions</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Hybrid Solar Systems</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">Ground-Mounted Solar</a></li>
              <li><a href="#service" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">O&M Services</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="md:absolute md:left-[953px] md:top-[187px] md:w-[270px]">
            <h4 className="text-xl md:text-2xl font-bold mb-4 md:mb-[29px] tracking-[0.05em]">Contact Us</h4>
            <div className="space-y-4 md:space-y-[13px]">
              {/* Address */}
              <div className="flex gap-2 md:gap-[11px] items-start">
                <img 
                  src={require('../assets/location-icon.svg')} 
                  alt="Location"
                  className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] mt-0.5 flex-shrink-0"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <p className="text-sm md:text-base leading-[1.226] tracking-[0.05em]">
                  15C, B-Wing, 2nd Floor, Kanchanjunga Apt, Above SBI Bank, 
                  Magarpatta, Hadapsar, Pune-411028
                </p>
              </div>

              {/* Email */}
              <div className="flex gap-2 md:gap-[11px] items-center">
                <img 
                  src={require('../assets/mail-icon.svg')} 
                  alt="Email"
                  className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] flex-shrink-0"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <a href="mailto:sunlittech5@gmail.com" className="text-sm md:text-base hover:text-[#1976D2] transition-colors break-all leading-[1.226] tracking-[0.05em]">
                  sunlittech5@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex gap-2 md:gap-[17px] items-center">
                <img 
                  src={require('../assets/phone-icon.svg')} 
                  alt="Phone"
                  className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] flex-shrink-0"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <a href="tel:8055142323" className="text-sm md:text-base hover:text-[#1976D2] transition-colors leading-[1.226] tracking-[0.05em]">
                  8055142323 | 020-20890423
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-50 my-6 md:my-0 md:absolute md:left-[90px] md:right-[89px] md:top-[508px]" style={{ borderWidth: '0.5px' }}></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-center md:text-left md:absolute md:left-[27px] md:right-[79px] md:top-[548px]">
          <p className="text-sm md:text-base leading-[1.226] tracking-[0.05em]">
            © 2026 Sun Lit Tech. All rights reserved.
          </p>
          <p className="text-sm md:text-base leading-[1.226] tracking-[0.05em]">
            ONE EARTH • ONE FAMILY • GREEN FUTURE
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;