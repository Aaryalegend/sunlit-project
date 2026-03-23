import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  getGalleryItems,
  addGalleryItem,
  removeGalleryItem,
  updateGalleryItem,
  resetGalleryItems,
  gradientOptions,
  categoryOptions,
} from '../data/galleryData';
import { uploadToCloudinary } from '../data/cloudinaryUpload';

const GalleryAdmin = () => {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Installations',
    gradient: 'from-blue-400 to-blue-700',
    image: null,
  });

  useEffect(() => {
    const loadItems = async () => {
      const data = await getGalleryItems();
      setItems(data);
    };
    loadItems();
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
      if (target === 'new') {
        setNewItem(prev => ({ ...prev, image: imageUrl }));
      } else if (target === 'edit' && editingItem) {
        setEditingItem(prev => ({ ...prev, image: imageUrl }));
      }
    } catch {
      showToast('Failed to upload image', 'error');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.title.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = await addGalleryItem(newItem);
    setItems(updated);
    setNewItem({ title: '', category: 'Installations', gradient: 'from-blue-400 to-blue-700', image: null });
    setShowAddForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Gallery item added successfully!');
  };

  const handleDelete = async (id) => {
    const updated = await removeGalleryItem(id);
    setItems(updated);
    setDeleteConfirm(null);
    showToast('Gallery item removed successfully!');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setShowAddForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingItem.title.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = await updateGalleryItem(editingItem.id, editingItem);
    setItems(updated);
    setEditingItem(null);
    showToast('Gallery item updated successfully!');
  };

  const handleReset = async () => {
    const updated = await resetGalleryItems();
    setItems(updated);
    setResetConfirm(false);
    showToast('Gallery reset to default items');
  };

  const filteredItems = filterCategory === 'All'
    ? items
    : items.filter(item => item.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-24 right-6 z-[70] px-6 py-3 rounded-[12px] shadow-xl text-white font-bold text-sm transition-all animate-pulse ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
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
                <Link to="/gallery" className="text-lightBlue hover:text-white text-sm underline">
                  ← Back to Gallery
                </Link>
              </div>
              <h1 className="text-[28px] md:text-[48px] font-bold text-white leading-tight tracking-[0.05em]">
                Gallery Manager
              </h1>
              <p className="text-base md:text-xl font-normal text-lightBlue mt-2 tracking-[0.05em]">
                Add, edit, or remove gallery images
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setShowAddForm(true); setEditingItem(null); }}
                className="bg-white text-primary px-6 py-3 rounded-[19px] text-sm font-bold hover:bg-lightBlue transition-colors flex items-center gap-2 justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Image
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

      {/* Summary Stats */}
      <section className="w-full bg-white border-b py-4 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{items.length}</span>
            <span className="text-sm text-dark">Total Items</span>
          </div>
          {categoryOptions.map(cat => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-lg font-bold text-dark">{items.filter(i => i.category === cat).length}</span>
              <span className="text-xs text-gray-500">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-20 py-8 md:py-12">

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Add New Gallery Image</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-dark transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Title *</label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    required
                    placeholder="e.g., Solar Installation - Pune"
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Category *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Upload Image (optional, max 5MB)</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'new')}
                    className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                  />
                  {newItem.image && (
                    <div className="mt-2 relative inline-block">
                      <img src={newItem.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => { setNewItem({ ...newItem, image: null }); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                      >×</button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Fallback Color Theme</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {gradientOptions.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, gradient: g.value })}
                        className={`w-full h-10 rounded-lg bg-gradient-to-br ${g.value} transition-all ${
                          newItem.gradient === g.value ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                        }`}
                        title={g.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Add to Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-100 text-dark px-8 py-3 rounded-[19px] text-sm font-normal hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Edit Gallery Image</h2>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-dark transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Title *</label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Category *</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Upload Image (optional, max 5MB)</label>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'edit')}
                    className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                  />
                  {editingItem.image && (
                    <div className="mt-2 relative inline-block">
                      <img src={editingItem.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => { setEditingItem({ ...editingItem, image: null }); if (editFileInputRef.current) editFileInputRef.current.value = ''; }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs"
                      >×</button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark mb-2">Fallback Color Theme</label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {gradientOptions.map((g) => (
                      <button
                        key={g.value}
                        type="button"
                        onClick={() => setEditingItem({ ...editingItem, gradient: g.value })}
                        className={`w-full h-10 rounded-lg bg-gradient-to-br ${g.value} transition-all ${
                          editingItem.gradient === g.value ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-105'
                        }`}
                        title={g.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-primary text-white px-8 py-3 rounded-[19px] text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-gray-100 text-dark px-8 py-3 rounded-[19px] text-sm font-normal hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
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
              {cat} {cat !== 'All' && `(${items.filter(i => i.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Gallery Items Table/Grid */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center shadow-card">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <p className="text-lg font-bold text-dark mb-2">No items found</p>
              <p className="text-sm text-gray-500">Add new images to your gallery using the button above.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <div className={`w-full sm:w-[180px] h-[140px] sm:h-auto flex-shrink-0 relative ${!item.image ? `bg-gradient-to-br ${item.gradient}` : ''}`}>
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                        <svg className="w-10 h-10 text-white opacity-30" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-primary bg-lightBlue px-3 py-0.5 rounded-full">{item.category}</span>
                        <span className="text-xs text-gray-400">ID: {item.id}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-dark truncate">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <div className={`w-6 h-6 rounded bg-gradient-to-br ${item.gradient}`}></div>
                        <span className="text-xs text-gray-400">{item.image ? 'Has image' : 'Gradient only'}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-lightBlue text-primary px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="bg-red-50 text-red-600 px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-white rounded-[20px] p-6 md:p-8 max-w-[400px] w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Delete Image?</h3>
              <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The image will be permanently removed from the gallery.</p>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] flex items-center justify-center p-4" onClick={() => setResetConfirm(false)}>
          <div className="bg-white rounded-[20px] p-6 md:p-8 max-w-[400px] w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Reset Gallery?</h3>
              <p className="text-sm text-gray-500 mb-6">This will remove all custom images and restore the default gallery items. This action cannot be undone.</p>
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

export default GalleryAdmin;
