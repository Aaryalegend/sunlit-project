import React, { useState } from 'react';
import { addMessage } from '../data/messagesData';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    service: ''
  });
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addMessage(formData);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', service: '' });
      setToast({ message: 'Thank you for your message! We will get back to you soon.', type: 'success' });
    } catch (err) {
      setToast({ message: 'Failed to send message. Please try again later.', type: 'error' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      ),
      title: 'Visit Us',
      details: ['15C, B-Wing, 2nd Floor,', 'Kanchanjunga Apt, Above SBI Bank,', 'Magarpatta, Hadapsar, Pune-411028']
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      ),
      title: 'Email Us',
      details: ['sunlittech5@gmail.com'],
      link: 'mailto:sunlittech5@gmail.com'
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
      ),
      title: 'Call Us',
      details: ['8055142323', '020-20890423'],
      link: 'tel:8055142323'
    },
    {
      icon: (
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      title: 'Working Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed']
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-24 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Contact Us
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[634px] tracking-[0.05em]">
            Get in touch with us for a free consultation and solar energy assessment
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="w-full py-10 md:py-16 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-[20px] p-6 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 text-center"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-lightBlue flex items-center justify-center mx-auto mb-4 text-primary">
                  {info.icon}
                </div>
                <h4 className="text-lg font-bold text-dark mb-3">{info.title}</h4>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-sm font-normal text-dark leading-relaxed tracking-[0.05em]">
                    {info.link && idx === 0 ? (
                      <a href={info.link} className="hover:text-primary transition-colors">{detail}</a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="w-full bg-lightBlue py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
              Send Us a Message
            </h2>
            <p className="text-base md:text-xl font-normal text-dark tracking-[0.05em]">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-[20px] p-6 md:p-10 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Full Name *</label>
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Email Address *</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Phone Number *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 XXXXXXXXXX"
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-dark mb-2">Service Interested In</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="on-grid">On-Grid Solar Solutions</option>
                      <option value="off-grid">Off-Grid Solar Solutions</option>
                      <option value="hybrid">Hybrid Solar Systems</option>
                      <option value="ground-mounted">Ground-Mounted Solar</option>
                      <option value="rooftop">Solar Rooftop Systems</option>
                      <option value="onm">O&M Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Subject *</label>
                  <input 
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Message *</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 transition-all resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-3.5 rounded-[19px] text-base font-bold hover:bg-blue-700 transition-colors tracking-[0.05em] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>

            {/* Map */}
            {/* Map */}
            <div className="rounded-[20px] overflow-hidden shadow-card h-[400px] md:h-auto">
              <iframe
                title="Sunlit Tech Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4724.521043060316!2d73.9279766!3d18.5036679!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1f0fabff25b%3A0xbf21f25dd543962e!2sSunlit%20Tech!5e1!3m2!1sen!2sin!4v1774005036146!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="w-full bg-primary py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-center">
          <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-4">
            Ready to Start Your Solar Journey?
          </h2>
          <p className="text-base md:text-xl font-normal text-lightBlue mb-8 max-w-[600px] mx-auto tracking-[0.05em]">
            Call us now for a free consultation and site assessment
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="tel:8055142323"
              className="bg-white text-primary px-8 py-3.5 rounded-[19px] text-base md:text-lg font-bold hover:bg-lightBlue transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              8055142323
            </a>
            <a 
              href="mailto:sunlittech5@gmail.com"
              className="bg-transparent border-[1.5px] border-white text-white px-8 py-3.5 rounded-[19px] text-base md:text-lg font-normal hover:bg-white hover:text-primary transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              sunlittech5@gmail.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
