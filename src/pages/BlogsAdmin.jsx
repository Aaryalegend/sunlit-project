import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  getBlogs,
  addBlog,
  removeBlog,
  updateBlog,
  setFeatured,
  resetBlogs,
  categoryOptions,
  readTimeOptions,
} from '../data/blogsData';
import { uploadToCloudinary } from '../data/cloudinaryUpload';

const emptyBlog = {
  title: '',
  category: 'Solar Energy',
  date: '',
  author: 'Sun Lit Tech Team',
  excerpt: '',
  readTime: '5 min read',
  image: null,
};

const getCategoryColor = (category) => {
  switch (category) {
    case 'Solar Energy':
      return 'bg-yellow-100 text-yellow-800';
    case 'Technology':
      return 'bg-blue-100 text-blue-800';
    case 'Sustainability':
      return 'bg-green-100 text-green-800';
    case 'Industry News':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const BlogsAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [newItem, setNewItem] = useState({ ...emptyBlog });
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    loadBlogs();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleImageUpload = async (e, target = 'new') => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5MB', 'error');
      return;
    }
    try {
      const imageUrl = await uploadToCloudinary(file, 'image');
      if (target === 'new') setNewItem((prev) => ({ ...prev, image: imageUrl }));
      else if (target === 'edit' && editingItem) setEditingItem((prev) => ({ ...prev, image: imageUrl }));
    } catch {
      showToast('Failed to upload image', 'error');
    }
  };

  const todayFormatted = () => {
    const d = new Date();
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.excerpt.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const blog = { ...newItem, date: newItem.date || todayFormatted() };
    const updated = await addBlog(blog);
    setBlogs(updated);
    setNewItem({ ...emptyBlog });
    setShowAddForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Blog post added successfully!');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setShowAddForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingItem.title.trim() || !editingItem.excerpt.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = await updateBlog(editingItem.id, editingItem);
    setBlogs(updated);
    setEditingItem(null);
    showToast('Blog post updated successfully!');
  };

  const handleDelete = async (id) => {
    const updated = await removeBlog(id);
    setBlogs(updated);
    setDeleteConfirm(null);
    showToast('Blog post removed successfully!');
  };

  const handleSetFeatured = async (id) => {
    const updated = await setFeatured(id);
    setBlogs(updated);
    showToast('Featured blog updated!');
  };

  const handleReset = async () => {
    const updated = await resetBlogs();
    setBlogs(updated);
    setResetConfirm(false);
    showToast('Blog posts reset to defaults');
  };

  const filteredBlogs =
    filterCategory === 'All' ? blogs : blogs.filter((b) => b.category === filterCategory);

  // --- Form renderer ---
  const renderForm = (data, setData, target, onSubmit, submitLabel) => (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Blog Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
          placeholder="e.g., The Future of Solar Energy in India"
          className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
        />
      </div>

      {/* Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Category *</label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Read Time</label>
          <select
            value={data.readTime}
            onChange={(e) => setData({ ...data, readTime: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {readTimeOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Author</label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
            placeholder="Author name"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
      </div>

      {/* Date & Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">
            Publish Date <span className="font-normal text-gray-400">(leave blank for today)</span>
          </label>
          <input
            type="text"
            value={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            placeholder="e.g., February 27, 2026"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Cover Image (optional, max 5MB)</label>
          <input
            ref={target === 'new' ? fileInputRef : editFileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, target)}
            className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-700 file:cursor-pointer"
          />
          {data.image && (
            <div className="mt-2 relative inline-block">
              <img src={data.image} alt="Preview" className="w-20 h-14 object-cover rounded-lg" />
              <button
                type="button"
                onClick={() => {
                  setData({ ...data, image: null });
                  const ref = target === 'new' ? fileInputRef : editFileInputRef;
                  if (ref.current) ref.current.value = '';
                }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Excerpt / Summary *</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => setData({ ...data, excerpt: e.target.value })}
          required
          rows={4}
          placeholder="Write a brief summary of the blog post..."
          className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 resize-none"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          {submitLabel}
        </button>
        <button
          type="button"
          onClick={() => (target === 'new' ? setShowAddForm(false) : setEditingItem(null))}
          className="bg-gray-100 text-dark px-8 py-3 rounded-[19px] text-sm font-normal hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-24 right-6 z-[70] px-6 py-3 rounded-[12px] shadow-xl text-white font-bold text-sm transition-all animate-pulse ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <section className="relative w-full bg-gradient-to-r from-[#02203E] to-[#1976D2] py-10 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-[90px]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-yellow-400 text-dark px-3 py-1 rounded-full text-xs font-bold">ADMIN</span>
                <Link to="/blogs" className="text-lightBlue hover:text-white text-sm underline">
                  ← Back to Blogs
                </Link>
              </div>
              <h1 className="text-[28px] md:text-[48px] font-bold text-white leading-tight tracking-[0.05em]">
                Blog Manager
              </h1>
              <p className="text-base md:text-xl font-normal text-lightBlue mt-2 tracking-[0.05em]">
                Add, edit, or remove blog posts
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingItem(null);
                }}
                className="bg-white text-primary px-6 py-3 rounded-[19px] text-sm font-bold hover:bg-lightBlue transition-colors flex items-center gap-2 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Post
              </button>
              <button
                onClick={() => setResetConfirm(true)}
                className="bg-transparent border-[1.5px] border-white text-white px-6 py-3 rounded-[19px] text-sm font-normal hover:bg-white hover:text-primary transition-colors"
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="w-full bg-white border-b py-4 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{blogs.length}</span>
            <span className="text-sm text-dark">Total Posts</span>
          </div>
          {categoryOptions.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-lg font-bold text-dark">
                {blogs.filter((b) => b.category === cat).length}
              </span>
              <span className="text-xs text-gray-500">{cat}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-yellow-600">
              {blogs.filter((b) => b.featured).length}
            </span>
            <span className="text-xs text-gray-500">Featured</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-20 py-8 md:py-12">
        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Add New Blog Post</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-dark transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(newItem, setNewItem, 'new', handleAdd, 'Publish Post')}
          </div>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Edit Blog Post</h2>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-dark transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(editingItem, setEditingItem, 'edit', handleUpdate, 'Save Changes')}
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['All', ...categoryOptions].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-5 py-2 rounded-[19px] text-sm font-bold tracking-[0.05em] transition-all ${
                filterCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-gray-200 hover:bg-lightBlue'
              }`}
            >
              {cat} {cat !== 'All' && `(${blogs.filter((b) => b.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Blog Posts List */}
        <div className="space-y-4">
          {filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center shadow-card">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
              </svg>
              <p className="text-lg font-bold text-dark mb-2">No blog posts found</p>
              <p className="text-sm text-gray-500">Add new posts using the button above.</p>
            </div>
          ) : (
            filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-[200px] h-[140px] sm:h-auto flex-shrink-0 relative bg-gradient-to-br from-[#1976D2] to-[#0d47a1]">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
                        </svg>
                      </div>
                    )}
                    {blog.featured && (
                      <div className="absolute top-2 left-2">
                        <span className="bg-yellow-400 text-dark px-2 py-0.5 rounded-full text-[10px] font-bold">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${getCategoryColor(blog.category)}`}>
                          {blog.category}
                        </span>
                        <span className="text-xs text-gray-400">{blog.readTime}</span>
                        <span className="text-xs text-gray-400">ID: {blog.id}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-dark leading-tight">{blog.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.excerpt}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span>{blog.date}</span>
                        {blog.image && (
                          <>
                            <span>•</span>
                            <span className="text-green-600">Has cover image</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                      {!blog.featured && (
                        <button
                          onClick={() => handleSetFeatured(blog.id)}
                          className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-[12px] text-sm font-bold hover:bg-yellow-400 hover:text-dark transition-colors flex items-center gap-1.5"
                          title="Set as Featured"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          Feature
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(blog)}
                        className="bg-lightBlue text-primary px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(blog.id)}
                        className="bg-red-50 text-red-600 px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-white rounded-[20px] p-6 md:p-8 max-w-[400px] w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Delete Blog Post?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The blog post will be permanently removed.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="bg-red-500 text-white px-6 py-2.5 rounded-[12px] text-sm font-bold hover:bg-red-600 transition-colors"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="bg-gray-100 text-dark px-6 py-2.5 rounded-[12px] text-sm font-normal hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4"
          onClick={() => setResetConfirm(false)}
        >
          <div
            className="bg-white rounded-[20px] p-6 md:p-8 max-w-[400px] w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Reset All Blog Posts?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This will remove all custom posts and restore the defaults. This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="bg-yellow-500 text-white px-6 py-2.5 rounded-[12px] text-sm font-bold hover:bg-yellow-600 transition-colors"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setResetConfirm(false)}
                  className="bg-gray-100 text-dark px-6 py-2.5 rounded-[12px] text-sm font-normal hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsAdmin;
