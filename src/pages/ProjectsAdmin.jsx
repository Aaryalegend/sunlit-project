import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  getProjects,
  addProject,
  removeProject,
  updateProject,
  resetProjects,
  categoryOptions,
  fileToBase64,
} from '../data/projectsData';

const emptyProject = {
  title: '',
  category: 'Residential',
  capacity: '10 kW',
  location: '',
  description: '',
  image: null,
};

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [newItem, setNewItem] = useState({ ...emptyProject });
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    setProjects(getProjects());
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
      const base64 = await fileToBase64(file);
      if (target === 'new') setNewItem((prev) => ({ ...prev, image: base64 }));
      else if (target === 'edit' && editingItem) setEditingItem((prev) => ({ ...prev, image: base64 }));
    } catch {
      showToast('Failed to process image', 'error');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.location.trim() || !newItem.description.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = addProject(newItem);
    setProjects(updated);
    setNewItem({ ...emptyProject });
    setShowAddForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Project added successfully!');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setShowAddForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingItem.title.trim() || !editingItem.location.trim() || !editingItem.description.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = updateProject(editingItem.id, editingItem);
    setProjects(updated);
    setEditingItem(null);
    showToast('Project updated successfully!');
  };

  const handleDelete = (id) => {
    const updated = removeProject(id);
    setProjects(updated);
    setDeleteConfirm(null);
    showToast('Project removed successfully!');
  };

  const handleReset = () => {
    const updated = resetProjects();
    setProjects(updated);
    setResetConfirm(false);
    showToast('Projects reset to defaults');
  };

  const filteredProjects =
    filterCategory === 'All' ? projects : projects.filter((p) => p.category === filterCategory);

  // --- Form renderer ---
  const renderForm = (data, setData, target, onSubmit, submitLabel) => (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Project Title *</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          required
          placeholder="e.g., Residential Solar Installation"
          className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
        />
      </div>

      {/* Row: Category, Capacity, Location */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Category *</label>
          <select
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Capacity *</label>
          <input
            type="text"
            value={data.capacity}
            onChange={(e) => setData({ ...data, capacity: e.target.value })}
            required
            placeholder="e.g., 10 kW"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Location *</label>
          <input
            type="text"
            value={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            required
            placeholder="e.g., Pune, Maharashtra"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Description *</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
          rows={3}
          placeholder="Describe the project..."
          className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 resize-none"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Project Image (optional, max 5MB)</label>
        <input
          ref={target === 'new' ? fileInputRef : editFileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, target)}
          className="w-full px-4 py-2.5 rounded-[12px] border border-gray-200 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary file:text-white hover:file:bg-blue-700 file:cursor-pointer"
        />
        {data.image && (
          <div className="mt-2 relative inline-block">
            <img src={data.image} alt="Preview" className="w-24 h-16 object-cover rounded-lg" />
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
                <Link to="/projects" className="text-lightBlue hover:text-white text-sm underline">
                  ← Back to Projects
                </Link>
              </div>
              <h1 className="text-[28px] md:text-[48px] font-bold text-white leading-tight tracking-[0.05em]">
                Projects Manager
              </h1>
              <p className="text-base md:text-xl font-normal text-lightBlue mt-2 tracking-[0.05em]">
                Add, edit, or remove project showcases
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
                Add New Project
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
            <span className="text-2xl font-bold text-primary">{projects.length}</span>
            <span className="text-sm text-dark">Total Projects</span>
          </div>
          {categoryOptions.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-lg font-bold text-dark">
                {projects.filter((p) => p.category === cat).length}
              </span>
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
              <h2 className="text-xl md:text-2xl font-bold text-dark">Add New Project</h2>
              <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-dark transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(newItem, setNewItem, 'new', handleAdd, 'Add Project')}
          </div>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Edit Project</h2>
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
              {cat} {cat !== 'All' && `(${projects.filter((p) => p.category === cat).length})`}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center shadow-card">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
              </svg>
              <p className="text-lg font-bold text-dark mb-2">No projects found</p>
              <p className="text-sm text-gray-500">Add new projects using the button above.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-[200px] h-[140px] sm:h-auto flex-shrink-0 relative bg-gradient-to-br from-[#1976D2] to-[#0d47a1]">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-white opacity-20" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-primary bg-lightBlue px-3 py-0.5 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-xs font-bold text-white bg-primary px-3 py-0.5 rounded-full">
                          {project.capacity}
                        </span>
                        <span className="text-xs text-gray-400">ID: {project.id}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-dark">{project.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                        {project.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                      {/* <div className="mt-2 flex items-center gap-4 text-xs">
                        {project.image && <span className="text-gray-400">Has image</span>}
                      </div> */}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(project)}
                        className="bg-lightBlue text-primary px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(project.id)}
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
              <h3 className="text-xl font-bold text-dark mb-2">Delete Project?</h3>
              <p className="text-sm text-gray-500 mb-6">This action cannot be undone. The project will be permanently removed.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => handleDelete(deleteConfirm)} className="bg-red-500 text-white px-6 py-2.5 rounded-[12px] text-sm font-bold hover:bg-red-600 transition-colors">
                  Yes, Delete
                </button>
                <button onClick={() => setDeleteConfirm(null)} className="bg-gray-100 text-dark px-6 py-2.5 rounded-[12px] text-sm font-normal hover:bg-gray-200 transition-colors">
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
              <h3 className="text-xl font-bold text-dark mb-2">Reset All Projects?</h3>
              <p className="text-sm text-gray-500 mb-6">This will remove all custom projects and restore the defaults. This action cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button onClick={handleReset} className="bg-yellow-500 text-white px-6 py-2.5 rounded-[12px] text-sm font-bold hover:bg-yellow-600 transition-colors">
                  Yes, Reset
                </button>
                <button onClick={() => setResetConfirm(false)} className="bg-gray-100 text-dark px-6 py-2.5 rounded-[12px] text-sm font-normal hover:bg-gray-200 transition-colors">
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

export default ProjectsAdmin;
