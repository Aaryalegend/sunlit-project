import React, { useState } from 'react';

const Blogs = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Solar Energy', 'Technology', 'Sustainability', 'Industry News'];

  const featuredBlog = {
    id: 1,
    title: 'The Future of Solar Energy in India: 2025 and Beyond',
    category: 'Solar Energy',
    date: 'January 15, 2025',
    author: 'Sun Lit Tech Team',
    excerpt: 'India is rapidly becoming one of the world\'s largest solar energy markets. With ambitious government targets and declining costs, the future of solar energy in India looks brighter than ever. In this comprehensive guide, we explore the trends, policies, and technologies shaping India\'s solar revolution.',
    readTime: '8 min read',
    image: null
  };

  const blogs = [
    {
      id: 2,
      title: 'How Net Metering Works: A Complete Guide',
      category: 'Technology',
      date: 'January 10, 2025',
      author: 'Sun Lit Tech Team',
      excerpt: 'Net metering allows solar panel owners to sell excess electricity back to the grid. Learn how this system works and how it can maximize your savings.',
      readTime: '5 min read',
      image: null
    },
    {
      id: 3,
      title: '5 Benefits of Going Solar for Your Business',
      category: 'Solar Energy',
      date: 'January 5, 2025',
      author: 'Sun Lit Tech Team',
      excerpt: 'Discover how switching to solar energy can reduce operational costs, boost your brand image, and contribute to a sustainable future.',
      readTime: '4 min read',
      image: null
    },
    {
      id: 4,
      title: 'Understanding Solar Panel Efficiency in 2025',
      category: 'Technology',
      date: 'December 28, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'Solar panel technology has evolved significantly. Learn about the latest advancements in panel efficiency and what it means for your installation.',
      readTime: '6 min read',
      image: null
    },
    {
      id: 5,
      title: 'Government Subsidies for Solar Installation in Maharashtra',
      category: 'Industry News',
      date: 'December 20, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'Explore the latest government subsidies and incentives available for solar installations in Maharashtra. A comprehensive overview of PM Solar Scheme benefits.',
      readTime: '7 min read',
      image: null
    },
    {
      id: 6,
      title: 'Reducing Carbon Footprint with Solar Energy',
      category: 'Sustainability',
      date: 'December 15, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'Learn how solar energy directly reduces carbon emissions and contributes to a cleaner environment. Real data from our installations.',
      readTime: '5 min read',
      image: null
    },
    {
      id: 7,
      title: 'Solar Panel Maintenance: Tips and Best Practices',
      category: 'Technology',
      date: 'December 10, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'Proper maintenance can extend the life of your solar panels by decades. Here are expert tips for keeping your system running at peak performance.',
      readTime: '4 min read',
      image: null
    },
    {
      id: 8,
      title: 'India\'s Renewable Energy Targets for 2030',
      category: 'Industry News',
      date: 'December 5, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'An in-depth look at India\'s ambitious renewable energy targets and the role solar energy plays in achieving energy independence.',
      readTime: '6 min read',
      image: null
    },
    {
      id: 9,
      title: 'How Solar Energy Supports Rural Electrification',
      category: 'Sustainability',
      date: 'November 28, 2024',
      author: 'Sun Lit Tech Team',
      excerpt: 'Solar energy is transforming rural communities across India by providing reliable, affordable electricity where the grid doesn\'t reach.',
      readTime: '5 min read',
      image: null
    },
  ];

  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory);

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Solar Energy': return 'bg-yellow-100 text-yellow-800';
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Sustainability': return 'bg-green-100 text-green-800';
      case 'Industry News': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full h-[300px] md:h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]"></div>
        <div className="relative max-w-[1280px] mx-auto px-4 md:px-[90px] h-full flex flex-col justify-center">
          <h1 className="text-[32px] md:text-[64px] font-bold text-lightBlue leading-tight tracking-[0.05em]">
            Our Blog
          </h1>
          <p className="text-base md:text-2xl font-normal text-white mt-4 max-w-[634px] tracking-[0.05em]">
            Insights, news, and guides about solar energy and sustainability
          </p>
        </div>
      </section>

      {/* Featured Blog */}
      <section className="w-full py-10 md:py-16 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 bg-white rounded-[20px] shadow-card overflow-hidden">
            {/* Featured Image */}
            <div className="h-[250px] md:h-auto bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                </svg>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-yellow-400 text-dark px-4 py-1.5 rounded-full text-sm font-bold">
                  Featured
                </span>
              </div>
            </div>

            {/* Featured Content */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(featuredBlog.category)}`}>
                  {featuredBlog.category}
                </span>
                <span className="text-sm text-gray-500">{featuredBlog.readTime}</span>
              </div>
              <h2 className="text-[24px] md:text-[32px] font-bold text-dark mb-4 leading-tight">
                {featuredBlog.title}
              </h2>
              <p className="text-sm md:text-base font-normal text-dark leading-relaxed tracking-[0.05em] mb-6">
                {featuredBlog.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SL</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark">{featuredBlog.author}</p>
                    <p className="text-xs text-gray-500">{featuredBlog.date}</p>
                  </div>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="w-full px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-10 md:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 md:px-8 py-2 md:py-3 rounded-[19px] text-sm md:text-base font-bold tracking-[0.05em] transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-lightBlue text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="w-full pb-12 md:pb-20 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {filteredBlogs.map((blog) => (
              <div 
                key={blog.id}
                className="bg-white rounded-[20px] shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 overflow-hidden group cursor-pointer"
              >
                {/* Blog Image */}
                <div className="w-full h-[180px] md:h-[200px] bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                    </svg>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(blog.category)}`}>
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-xs font-normal text-dark">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Blog Content */}
                <div className="p-5 md:p-6">
                  <p className="text-xs text-gray-500 mb-2">{blog.date}</p>
                  <h4 className="text-lg md:text-xl font-bold text-dark mb-3 leading-tight group-hover:text-primary transition-colors">
                    {blog.title}
                  </h4>
                  <p className="text-sm font-normal text-dark leading-relaxed tracking-[0.05em] mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white font-bold text-xs">SL</span>
                      </div>
                      <span className="text-xs font-bold text-dark">{blog.author}</span>
                    </div>
                    <span className="text-primary font-bold text-sm group-hover:underline">Read →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="w-full bg-lightBlue py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-20 text-center">
          <h2 className="text-[28px] md:text-[48px] font-bold text-primary mb-4 leading-tight">
            Stay Updated
          </h2>
          <p className="text-base md:text-xl font-normal text-dark mb-8 max-w-[600px] mx-auto tracking-[0.05em]">
            Subscribe to our newsletter and get the latest solar energy insights delivered to your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-[600px] mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3.5 rounded-[19px] border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
            />
            <button className="bg-primary text-white px-8 py-3.5 rounded-[19px] text-base font-bold hover:bg-blue-700 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
