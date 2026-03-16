import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getBlogs } from '../data/blogsData';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const loadBlog = async () => {
      const allBlogs = await getBlogs();
      const found = allBlogs.find((b) => b.id === parseInt(id, 10));
      if (!found) {
        navigate('/blogs');
        return;
      }
      setBlog(found);
      setRelatedBlogs(
        allBlogs
          .filter((b) => b.id !== found.id && b.category === found.category)
          .slice(0, 3)
      );
      window.scrollTo(0, 0);
    };
    loadBlog();
  }, [id, navigate]);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Solar Energy': return 'bg-yellow-100 text-yellow-800';
      case 'Technology': return 'bg-blue-100 text-blue-800';
      case 'Sustainability': return 'bg-green-100 text-green-800';
      case 'Industry News': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const paragraphs = (blog.content || blog.excerpt).split('\n\n');

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative w-full h-[300px] md:h-[450px]">
        {blog.image ? (
          <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-[#02203E] to-[#1976D2]" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-[900px] mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(blog.category)}`}>
              {blog.category}
            </span>
            <span className="text-white/80 text-sm">{blog.readTime}</span>
          </div>
          <h1 className="text-[28px] md:text-[48px] font-bold text-white leading-tight tracking-[0.05em] mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">SL</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">{blog.author}</p>
              <p className="text-white/60 text-xs">{blog.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-[900px] mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-primary transition-colors">Blogs</Link>
          <span>/</span>
          <span className="text-dark font-medium truncate max-w-[200px]">{blog.title}</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[900px] mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((para, idx) => {
            // Check if it's a numbered list item
            if (/^\d+\./.test(para.trim())) {
              return (
                <p key={idx} className="text-base md:text-lg font-normal text-dark leading-relaxed tracking-[0.05em] mb-4 pl-4 border-l-3 border-primary/20">
                  {para}
                </p>
              );
            }
            // Check if it looks like a heading (short text ending with colon)
            if (para.trim().endsWith(':') && para.trim().length < 80) {
              return (
                <h3 key={idx} className="text-xl md:text-2xl font-bold text-dark mt-8 mb-4">
                  {para.replace(/:$/, '')}
                </h3>
              );
            }
            // Regular paragraph
            return (
              <p key={idx} className="text-base md:text-lg font-normal text-dark leading-relaxed tracking-[0.05em] mb-5">
                {para}
              </p>
            );
          })}
        </div>

        {/* Tags / Footer */}
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">SL</span>
              </div>
              <div>
                <p className="font-bold text-dark">{blog.author}</p>
                <p className="text-sm text-gray-500">Published on {blog.date}</p>
              </div>
            </div>
            <Link
              to="/blogs"
              className="bg-primary text-white px-6 py-2.5 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors"
            >
              ← Back to All Blogs
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="w-full bg-lightBlue py-12 md:py-16 px-4 md:px-20">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-[28px] md:text-[36px] font-bold text-primary mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((rb) => (
                <Link
                  key={rb.id}
                  to={`/blogs/${rb.id}`}
                  className="bg-white rounded-[20px] shadow-card hover:shadow-xl transition-all hover:-translate-y-2 duration-300 overflow-hidden group"
                >
                  <div className="w-full h-[180px] bg-gradient-to-br from-[#1976D2] to-[#0d47a1] relative overflow-hidden">
                    {rb.image ? (
                      <img src={rb.image} alt={rb.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-12 h-12 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-500 mb-2">{rb.date}</p>
                    <h4 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors leading-tight">
                      {rb.title}
                    </h4>
                    <span className="text-primary font-bold text-sm">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetail;
