import React, { useState } from 'react';

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const benefits = [
    { icon: '🌱', title: 'Growth Opportunities', description: 'Continuous learning and career development programs' },
    { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
    { icon: '🏥', title: 'Health Insurance', description: 'Comprehensive health coverage for you and your family' },
    { icon: '🏖️', title: 'Work-Life Balance', description: 'Flexible hours and generous paid time off' },
    { icon: '🎓', title: 'Training Programs', description: 'Regular skill development and certification support' },
    { icon: '🌍', title: 'Meaningful Work', description: 'Contribute to a sustainable and greener future' },
  ];

  const openPositions = [
    {
      id: 1,
      title: 'Solar Design Engineer',
      department: 'Engineering',
      location: 'Pune, Maharashtra',
      type: 'Full Time',
      experience: '2-4 Years',
      description: 'We are looking for a skilled Solar Design Engineer to join our team. You will be responsible for designing solar PV systems, performing site assessments, and creating detailed engineering drawings.',
      requirements: [
        'B.E./B.Tech in Electrical/Electronics Engineering',
        '2-4 years of experience in solar PV system design',
        'Proficiency in AutoCAD, PVsyst, and SketchUp',
        'Knowledge of IS/IEC standards for solar installations',
        'Excellent analytical and problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Project Manager - Solar EPC',
      department: 'Project Management',
      location: 'Pune, Maharashtra',
      type: 'Full Time',
      experience: '5-8 Years',
      description: 'Lead and manage solar EPC projects from inception to completion. Coordinate with clients, vendors, and internal teams to ensure timely delivery and quality standards.',
      requirements: [
        'B.E./B.Tech in Electrical/Civil/Mechanical Engineering',
        '5-8 years of experience in solar EPC projects',
        'PMP certification preferred',
        'Strong project management and leadership skills',
        'Experience managing projects of 100kW+ capacity'
      ]
    },
    {
      id: 3,
      title: 'Sales Executive - Solar',
      department: 'Sales & Marketing',
      location: 'Mumbai / Pune',
      type: 'Full Time',
      experience: '1-3 Years',
      description: 'Drive solar energy solution sales in residential and commercial segments. Build and maintain client relationships while achieving sales targets.',
      requirements: [
        'Graduate in any discipline',
        '1-3 years of sales experience (solar industry preferred)',
        'Excellent communication and negotiation skills',
        'Valid driving license and own vehicle',
        'Knowledge of solar products and net metering policies'
      ]
    },
    {
      id: 4,
      title: 'Electrical Site Engineer',
      department: 'Engineering',
      location: 'Pune, Maharashtra',
      type: 'Full Time',
      experience: '2-5 Years',
      description: 'Oversee electrical installation work at solar project sites. Ensure safety compliance, quality control, and timely project execution.',
      requirements: [
        'Diploma / B.E. in Electrical Engineering',
        '2-5 years of experience in electrical installation',
        'Knowledge of HT/LT systems and solar inverters',
        'Willingness to travel to project sites',
        'Safety certification preferred'
      ]
    },
    {
      id: 5,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Pune (Hybrid)',
      type: 'Full Time',
      experience: '2-4 Years',
      description: 'Plan and execute digital marketing campaigns to generate leads and build brand awareness for Sun Lit Tech in the renewable energy space.',
      requirements: [
        'Bachelor\'s degree in Marketing/Communications',
        '2-4 years of digital marketing experience',
        'Proficiency in Google Ads, Meta Ads, and SEO tools',
        'Experience with content creation and social media management',
        'Knowledge of renewable energy industry is a plus'
      ]
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[450px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Join Our Team
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[700px] tracking-[0.05em]">
            Build your career while building a sustainable future. Be part of India's solar energy revolution.
          </p>
          <a 
            href="#positions"
            className="mt-8 bg-white text-primary px-8 py-3.5 rounded-[19px] text-base md:text-lg font-bold hover:bg-lightBlue transition-colors inline-block w-fit"
          >
            View Open Positions
          </a>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="w-full py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
              Why Work With Us
            </h2>
            <h3 className="text-[20px] md:text-[32px] font-normal text-dark">
              Benefits & Perks
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-[20px] p-6 md:p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 text-center"
              >
                <div className="text-4xl md:text-5xl mb-4">{benefit.icon}</div>
                <h4 className="text-lg md:text-xl font-bold text-dark mb-2">{benefit.title}</h4>
                <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="w-full bg-lightBlue py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-[28px] md:text-[48px] font-bold text-primary mb-4 md:mb-6 leading-tight">
                Our Culture
              </h2>
              <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em] mb-4">
                At Sun Lit Tech, we believe in fostering an environment of innovation, collaboration, 
                and purpose. Our team is united by a shared passion for renewable energy and a 
                commitment to making a positive impact on the environment.
              </p>
              <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em] mb-4">
                We encourage creative problem-solving, support continuous learning, and celebrate 
                every milestone together. Whether you're in the field installing panels or in the 
                office designing systems, your contribution matters.
              </p>
              <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                Join a team where your work directly contributes to a cleaner, greener future 
                for India and the world.
              </p>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-[20px] overflow-hidden shadow-card bg-gradient-to-br from-[#1976D2] to-[#0d47a1]">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="w-full py-12 md:py-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[48px] font-bold text-primary mb-2 md:mb-4">
              Open Positions
            </h2>
            <h3 className="text-[20px] md:text-[32px] font-normal text-dark">
              Current Openings at Sun Lit Tech
            </h3>
          </div>

          <div className="space-y-4 md:space-y-6">
            {openPositions.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Job Header */}
                <div 
                  className="p-5 md:p-8 cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold text-dark mb-2">{job.title}</h4>
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        <span className="bg-lightBlue text-primary px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                          {job.department}
                        </span>
                        <span className="bg-lightBlue text-primary px-3 py-1 rounded-full text-xs md:text-sm font-normal flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          </svg>
                          {job.location}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs md:text-sm font-normal">
                          {job.type}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs md:text-sm font-normal">
                          {job.experience}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg 
                        className={`w-6 h-6 text-primary transition-transform duration-300 ${expandedJob === job.id ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                {expandedJob === job.id && (
                  <div className="px-5 md:px-8 pb-5 md:pb-8 border-t border-gray-100 pt-5 md:pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                      <div>
                        <h5 className="text-base md:text-lg font-bold text-dark mb-3">Job Description</h5>
                        <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                          {job.description}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-base md:text-lg font-bold text-dark mb-3">Requirements</h5>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em]">
                              <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 md:mt-8 flex flex-col md:flex-row gap-4">
                      <button className="bg-primary text-white px-8 py-3 rounded-[19px] text-base font-bold hover:bg-blue-700 transition-colors">
                        Apply Now
                      </button>
                      <button className="bg-transparent border-[1.5px] border-primary text-primary px-8 py-3 rounded-[19px] text-base font-normal hover:bg-primary hover:text-white transition-colors">
                        Share Position
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* General Application CTA */}
          <div className="mt-12 md:mt-16 bg-lightBlue rounded-[20px] p-6 md:p-12 text-center">
            <h3 className="text-[24px] md:text-[32px] font-bold text-primary mb-3">
              Don't See a Fit?
            </h3>
            <p className="text-base md:text-lg font-normal text-dark mb-6 max-w-[600px] mx-auto tracking-[0.05em]">
              We're always looking for talented people. Send us your resume and we'll reach out when a suitable position opens up.
            </p>
            <button className="bg-primary text-white px-8 py-3.5 rounded-[19px] text-base md:text-lg font-bold hover:bg-blue-700 transition-colors">
              Send General Application
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
