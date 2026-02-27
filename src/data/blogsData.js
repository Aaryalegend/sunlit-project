const STORAGE_KEY = 'sunlit_blog_posts';

const defaultFeaturedBlog = {
  id: 1,
  title: "The Future of Solar Energy in India: 2025 and Beyond",
  category: 'Solar Energy',
  date: 'January 15, 2025',
  author: 'Sun Lit Tech Team',
  excerpt:
    "India is rapidly becoming one of the world's largest solar energy markets. With ambitious government targets and declining costs, the future of solar energy in India looks brighter than ever. In this comprehensive guide, we explore the trends, policies, and technologies shaping India's solar revolution.",
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
