const STORAGE_KEY = 'sunlit_blog_posts';

const defaultFeaturedBlog = {
  id: 1,
  title: "The Future of Solar Energy in India: 2025 and Beyond",
  category: 'Solar Energy',
  date: 'January 15, 2025',
  author: 'Sun Lit Tech Team',
  excerpt:
    "India is rapidly becoming one of the world's largest solar energy markets. With ambitious government targets and declining costs, the future of solar energy in India looks brighter than ever. In this comprehensive guide, we explore the trends, policies, and technologies shaping India's solar revolution.",
  content: "India is rapidly becoming one of the world's largest solar energy markets. With ambitious government targets and declining costs, the future of solar energy in India looks brighter than ever.\n\nThe Indian government has set a target of achieving 500 GW of non-fossil fuel energy capacity by 2030, with solar energy playing a pivotal role. As of 2025, India has already installed over 80 GW of solar capacity, making it one of the top five solar markets globally.\n\nKey trends shaping the future include:\n\n1. Declining Costs: Solar panel costs have dropped by over 90% in the last decade, making solar energy cheaper than coal in many parts of India.\n\n2. Government Policies: The PM-KUSUM scheme, rooftop solar subsidies, and net metering policies are driving adoption across residential, commercial, and agricultural sectors.\n\n3. Technology Advancements: Bifacial panels, battery storage integration, and AI-driven monitoring systems are improving efficiency and reliability.\n\n4. Corporate Adoption: Major corporations are committing to renewable energy targets, driving large-scale solar installations.\n\n5. Rural Electrification: Solar microgrids and standalone systems are bringing electricity to remote villages for the first time.\n\nAt Sun Lit Tech, we are proud to be at the forefront of this revolution, delivering high-quality solar solutions that help homes and businesses transition to clean energy.",
  readTime: '8 min read',
  featured: true,
  image: null,
};

const defaultBlogs = [
  defaultFeaturedBlog,
  {
    id: 2,
    title: 'How Net Metering Works: A Complete Guide',
    category: 'Technology',
    date: 'January 10, 2025',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Net metering allows solar panel owners to sell excess electricity back to the grid. Learn how this system works and how it can maximize your savings.',
    content: 'Net metering is a billing mechanism that allows solar panel owners to sell excess electricity back to the grid in exchange for credits on their electricity bill.\n\nHow does it work? When your solar panels produce more electricity than you consume, the excess power is fed back into the grid. Your electricity meter runs backward, giving you credits. During times when your panels aren\'t producing enough (like at night), you draw power from the grid and use those credits.\n\nBenefits of net metering:\n\n1. Reduced Electricity Bills: You only pay for the net electricity consumed, significantly lowering monthly bills.\n\n2. Quick ROI: Net metering can reduce the payback period of your solar investment by 2-3 years.\n\n3. No Battery Required: The grid acts as a virtual battery, eliminating the need for expensive battery storage.\n\n4. Environmental Impact: By feeding clean energy into the grid, you help reduce the overall carbon footprint of the electricity network.\n\nIn Maharashtra, the net metering policy allows residential consumers with rooftop solar systems up to 1 MW to avail this benefit. Contact Sun Lit Tech to learn how you can start saving with net metering.',
    readTime: '5 min read',
    featured: false,
    image: null,
  },
  {
    id: 3,
    title: '5 Benefits of Going Solar for Your Business',
    category: 'Solar Energy',
    date: 'January 5, 2025',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Discover how switching to solar energy can reduce operational costs, boost your brand image, and contribute to a sustainable future.',
    content: 'Solar energy is no longer just an environmental choice — it\'s a smart business decision. Here are five compelling benefits of going solar for your business:\n\n1. Significant Cost Savings: Commercial solar installations can reduce electricity bills by 50-90%. With rising grid electricity costs, solar provides long-term price stability.\n\n2. Tax Benefits & Incentives: Businesses can claim accelerated depreciation of 40% on solar assets, along with GST input credits and various state-level incentives.\n\n3. Enhanced Brand Image: Consumers increasingly prefer businesses committed to sustainability. A visible solar installation demonstrates your commitment to a greener future.\n\n4. Energy Independence: Reduce dependence on unreliable grid power. Solar with battery backup ensures uninterrupted operations during power outages.\n\n5. Increased Property Value: Commercial properties with solar installations see an increase in property value, making it a dual investment.\n\nSun Lit Tech specializes in commercial and industrial solar solutions. Our team handles everything from design to installation and maintenance, ensuring maximum returns on your solar investment.',
    readTime: '4 min read',
    featured: false,
    image: null,
  },
  {
    id: 4,
    title: 'Understanding Solar Panel Efficiency in 2025',
    category: 'Technology',
    date: 'December 28, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Solar panel technology has evolved significantly. Learn about the latest advancements in panel efficiency and what it means for your installation.',
    content: 'Solar panel efficiency has improved dramatically over the years. In 2025, commercial panels regularly achieve 22-24% efficiency, with premium models reaching up to 25%.\n\nKey advancements in solar panel technology:\n\n1. PERC Technology: Passivated Emitter Rear Contact cells add a reflective layer behind the cells, capturing more light and improving efficiency by 1-2%.\n\n2. Bifacial Panels: These panels capture sunlight from both sides, generating up to 30% more energy than traditional monofacial panels.\n\n3. Half-Cut Cells: By cutting cells in half, resistance losses are reduced, improving overall panel performance, especially in partial shading conditions.\n\n4. TOPCon & HJT: Next-generation cell technologies pushing efficiency boundaries beyond 26%.\n\nWhat this means for you: Higher efficiency panels require less roof space to generate the same amount of energy. A 5kW system that once needed 35 square meters can now fit in just 25 square meters. This is especially important for urban installations where space is limited.\n\nAt Sun Lit Tech, we use only Tier-1 panels from leading manufacturers to ensure maximum efficiency and longevity for every installation.',
    readTime: '6 min read',
    featured: false,
    image: null,
  },
  {
    id: 5,
    title: 'Government Subsidies for Solar Installation in Maharashtra',
    category: 'Industry News',
    date: 'December 20, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Explore the latest government subsidies and incentives available for solar installations in Maharashtra. A comprehensive overview of PM Solar Scheme benefits.',
    content: 'The Government of India and the State of Maharashtra offer several subsidies and incentives to promote solar energy adoption. Here\'s a comprehensive guide:\n\n1. PM Surya Ghar Yojana: The central government provides subsidies of up to ₹78,000 for systems up to 3kW, making residential solar extremely affordable.\n\n2. MSEDCL Net Metering: Maharashtra State Electricity Distribution Company allows residential and commercial consumers to install rooftop solar systems and avail net metering benefits.\n\n3. Accelerated Depreciation: Commercial and industrial consumers can claim 40% accelerated depreciation on solar assets in the first year.\n\n4. GST Benefits: Solar panels and related equipment attract only 5% GST, compared to 18-28% for most goods.\n\n5. Green Energy Open Access: Large commercial consumers can procure solar power through open access at rates lower than grid tariffs.\n\nHow to apply: Sun Lit Tech handles the complete subsidy application process for our customers. From documentation to MSEDCL coordination, we ensure you receive all applicable benefits without any hassle.\n\nContact us today for a free consultation and subsidy eligibility assessment.',
    readTime: '7 min read',
    featured: false,
    image: null,
  },
  {
    id: 6,
    title: 'Reducing Carbon Footprint with Solar Energy',
    category: 'Sustainability',
    date: 'December 15, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Learn how solar energy directly reduces carbon emissions and contributes to a cleaner environment. Real data from our installations.',
    content: 'Solar energy is one of the most effective ways to reduce your carbon footprint. Here\'s how it makes a difference:\n\nThe Numbers: Every 1 kW of solar capacity installed prevents approximately 1.5 tonnes of CO₂ emissions per year. A typical 5kW residential system saves about 7.5 tonnes of CO₂ annually — equivalent to planting 350 trees.\n\nReal Data from Sun Lit Tech Installations:\n\n- Our 200+ projects have collectively offset over 2,000 tonnes of CO₂ annually.\n- A single commercial installation of 100kW saves approximately 150 tonnes of CO₂ per year.\n- Our residential customers save an average of 6-8 tonnes of CO₂ each year.\n\nBeyond Carbon:\n\n1. Water Conservation: Solar energy requires virtually no water to generate electricity, unlike thermal power plants.\n\n2. Air Quality: Reduced dependence on fossil fuels means fewer harmful pollutants in the air.\n\n3. Land Use: Rooftop solar utilizes existing structures, requiring no additional land.\n\nEvery solar panel installed is a step toward a cleaner, healthier environment. Join the solar revolution with Sun Lit Tech and make your contribution to fighting climate change.',
    readTime: '5 min read',
    featured: false,
    image: null,
  },
  {
    id: 7,
    title: 'Solar Panel Maintenance: Tips and Best Practices',
    category: 'Technology',
    date: 'December 10, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      'Proper maintenance can extend the life of your solar panels by decades. Here are expert tips for keeping your system running at peak performance.',
    content: 'Solar panels are designed to last 25-30 years with minimal maintenance. However, regular upkeep ensures optimal performance throughout their lifespan.\n\nEssential Maintenance Tips:\n\n1. Regular Cleaning: Dust, bird droppings, and debris can reduce panel efficiency by 10-25%. Clean your panels every 2-3 months, or more frequently in dusty areas.\n\n2. Visual Inspections: Check for physical damage, loose connections, or discoloration monthly. Look for cracks, hot spots, or water ingress.\n\n3. Inverter Monitoring: Check inverter displays regularly for error messages. Modern inverters have apps that let you monitor performance remotely.\n\n4. Shade Management: Trim trees or remove objects that may cast shadows on your panels. Even partial shading can significantly reduce output.\n\n5. Professional Servicing: Schedule annual professional inspections. Technicians can identify issues like micro-cracks, degraded connections, or inverter problems that aren\'t visible to the naked eye.\n\nSun Lit Tech O&M Services: We offer comprehensive operation and maintenance packages that include regular cleaning, performance monitoring, preventive maintenance, and emergency support. Our AMC plans start at just ₹2,000 per kW per year.',
    readTime: '4 min read',
    featured: false,
    image: null,
  },
  {
    id: 8,
    title: "India's Renewable Energy Targets for 2030",
    category: 'Industry News',
    date: 'December 5, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      "An in-depth look at India's ambitious renewable energy targets and the role solar energy plays in achieving energy independence.",
    content: "India has set ambitious renewable energy targets that will reshape the country's energy landscape by 2030.\n\nKey Targets:\n\n1. 500 GW Non-Fossil Fuel Capacity: India aims to have 500 GW of installed renewable energy capacity by 2030, with solar contributing the lion's share at 280 GW.\n\n2. 50% Renewable Energy Mix: By 2030, India targets 50% of its electricity generation from renewable sources.\n\n3. Net Zero by 2070: India's long-term goal is to achieve net-zero carbon emissions by 2070.\n\nProgress So Far:\n\n- Solar capacity has grown from 2.6 GW in 2014 to over 80 GW in 2025.\n- India is now the 4th largest solar market globally.\n- Solar tariffs have fallen to as low as ₹2.00 per unit — cheaper than coal.\n\nChallenges:\n\n- Grid integration and energy storage remain key challenges.\n- Land acquisition for large-scale projects needs streamlining.\n- Manufacturing capacity for solar cells and modules needs significant expansion under the PLI scheme.\n\nThe opportunity is immense. India's solar revolution is creating millions of jobs, reducing import dependence on fossil fuels, and positioning the country as a global clean energy leader.",
    readTime: '6 min read',
    featured: false,
    image: null,
  },
  {
    id: 9,
    title: 'How Solar Energy Supports Rural Electrification',
    category: 'Sustainability',
    date: 'November 28, 2024',
    author: 'Sun Lit Tech Team',
    excerpt:
      "Solar energy is transforming rural communities across India by providing reliable, affordable electricity where the grid doesn't reach.",
    content: "Solar energy is transforming rural communities across India by providing reliable, affordable electricity where the grid doesn't reach.\n\nThe Challenge: Despite significant progress, over 30 million rural households in India still lack reliable electricity access. Grid extension to remote areas is expensive and often unreliable.\n\nSolar Solutions for Rural India:\n\n1. Solar Microgrids: Community-scale solar systems with battery storage can power entire villages. A typical 10kW microgrid can serve 50-80 households with basic electricity needs.\n\n2. Solar Home Systems: Individual solar kits with 2-4 panels, a battery, and LED lights can transform a household's quality of life at minimal cost.\n\n3. Solar Water Pumps: PM-KUSUM scheme promotes solar pumps for irrigation, replacing expensive diesel pumps and reducing farming costs significantly.\n\n4. Solar Cold Storage: Solar-powered cold storage units help farmers preserve produce, reducing post-harvest losses and improving income.\n\nImpact Stories:\n\n- In Vidarbha, Maharashtra, solar pumps have reduced irrigation costs by 80% for over 10,000 farmers.\n- Solar microgrids in tribal areas of Gadchiroli have brought electricity to 200+ villages for the first time.\n\nSun Lit Tech is committed to rural solar development. We work with government agencies, NGOs, and communities to bring sustainable energy solutions to underserved areas.",
    readTime: '5 min read',
    featured: false,
    image: null,
  },
];

export const categoryOptions = ['Solar Energy', 'Technology', 'Sustainability', 'Industry News'];

export const readTimeOptions = [
  '2 min read',
  '3 min read',
  '4 min read',
  '5 min read',
  '6 min read',
  '7 min read',
  '8 min read',
  '10 min read',
  '12 min read',
  '15 min read',
];

export function getBlogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
  return [...defaultBlogs];
}

export function saveBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs;
}

export function addBlog(blog) {
  const blogs = getBlogs();
  const newId = blogs.length > 0 ? Math.max(...blogs.map((b) => b.id)) + 1 : 1;
  const newBlog = { id: newId, featured: false, image: null, ...blog };
  blogs.unshift(newBlog); // newest first
  saveBlogs(blogs);
  return blogs;
}

export function removeBlog(id) {
  let blogs = getBlogs();
  blogs = blogs.filter((b) => b.id !== id);
  saveBlogs(blogs);
  return blogs;
}

export function updateBlog(id, updates) {
  const blogs = getBlogs();
  const index = blogs.findIndex((b) => b.id === id);
  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...updates };
  }
  saveBlogs(blogs);
  return blogs;
}

export function setFeatured(id) {
  const blogs = getBlogs();
  blogs.forEach((b) => (b.featured = b.id === id));
  saveBlogs(blogs);
  return blogs;
}

export function resetBlogs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogs));
  return [...defaultBlogs];
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
