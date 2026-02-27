import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getPositions,
  addPosition,
  removePosition,
  updatePosition,
  resetPositions,
  departmentOptions,
  typeOptions,
  experienceOptions,
} from '../data/careersData';

const emptyPosition = {
  title: '',
  department: 'Engineering',
  location: '',
  type: 'Full Time',
  experience: '2-4 Years',
  description: '',
  requirements: [''],
};

const CareersAdmin = () => {
  const [positions, setPositions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterDept, setFilterDept] = useState('All');
  const [newItem, setNewItem] = useState({ ...emptyPosition });

  useEffect(() => {
    setPositions(getPositions());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // --- Requirement helpers ---
  const addRequirement = (target) => {
    if (target === 'new') {
      setNewItem((prev) => ({ ...prev, requirements: [...prev.requirements, ''] }));
    } else {
      setEditingItem((prev) => ({ ...prev, requirements: [...prev.requirements, ''] }));
    }
  };

  const updateRequirement = (target, index, value) => {
    if (target === 'new') {
      const reqs = [...newItem.requirements];
      reqs[index] = value;
      setNewItem((prev) => ({ ...prev, requirements: reqs }));
    } else {
      const reqs = [...editingItem.requirements];
      reqs[index] = value;
      setEditingItem((prev) => ({ ...prev, requirements: reqs }));
    }
  };

  const removeRequirement = (target, index) => {
    if (target === 'new') {
      const reqs = newItem.requirements.filter((_, i) => i !== index);
      setNewItem((prev) => ({ ...prev, requirements: reqs.length ? reqs : [''] }));
    } else {
      const reqs = editingItem.requirements.filter((_, i) => i !== index);
      setEditingItem((prev) => ({ ...prev, requirements: reqs.length ? reqs : [''] }));
    }
  };

  // --- CRUD ---
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.location.trim() || !newItem.description.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const cleanReqs = newItem.requirements.filter((r) => r.trim() !== '');
    if (cleanReqs.length === 0) {
      showToast('Add at least one requirement', 'error');
      return;
    }
    const updated = addPosition({ ...newItem, requirements: cleanReqs });
    setPositions(updated);
    setNewItem({ ...emptyPosition, requirements: [''] });
    setShowAddForm(false);
    showToast('Position added successfully!');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item, requirements: [...item.requirements] });
    setShowAddForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingItem.title.trim() || !editingItem.location.trim() || !editingItem.description.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const cleanReqs = editingItem.requirements.filter((r) => r.trim() !== '');
    if (cleanReqs.length === 0) {
      showToast('Add at least one requirement', 'error');
      return;
    }
    const updated = updatePosition(editingItem.id, { ...editingItem, requirements: cleanReqs });
    setPositions(updated);
    setEditingItem(null);
    showToast('Position updated successfully!');
  };

  const handleDelete = (id) => {
    const updated = removePosition(id);
    setPositions(updated);
    setDeleteConfirm(null);
    showToast('Position removed successfully!');
  };

  const handleReset = () => {
    const updated = resetPositions();
    setPositions(updated);
    setResetConfirm(false);
    showToast('Positions reset to defaults');
  };

  const departments = [...new Set(positions.map((p) => p.department))];
  const filteredPositions =
    filterDept === 'All' ? positions : positions.filter((p) => p.department === filterDept);

  // --- Shared form renderer ---
  const renderForm = (data, setData, target, onSubmit, submitLabel) => (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Job Title *</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            required
            placeholder="e.g., Solar Design Engineer"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Department *</label>
          <select
            value={data.department}
            onChange={(e) => setData({ ...data, department: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {departmentOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Job Type *</label>
          <select
            value={data.type}
            onChange={(e) => setData({ ...data, type: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Experience *</label>
          <select
            value={data.experience}
            onChange={(e) => setData({ ...data, experience: e.target.value })}
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 bg-white"
          >
            {experienceOptions.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Job Description *</label>
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          required
          rows={3}
          placeholder="Describe the role and responsibilities..."
          className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20 resize-none"
        />
      </div>

      {/* Requirements */}
      <div>
        <label className="block text-sm font-bold text-dark mb-2">Requirements *</label>
        <div className="space-y-2">
          {data.requirements.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-5 text-center flex-shrink-0">{idx + 1}.</span>
              <input
                type="text"
                value={req}
                onChange={(e) => updateRequirement(target, idx, e.target.value)}
                placeholder="e.g., B.E./B.Tech in Electrical Engineering"
                className="flex-1 px-4 py-2.5 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
              />
              <button
                type="button"
                onClick={() => removeRequirement(target, idx)}
                className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors flex-shrink-0"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => addRequirement(target)}
          className="mt-2 text-sm text-primary font-bold hover:underline flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Requirement
        </button>
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
                <Link to="/careers" className="text-lightBlue hover:text-white text-sm underline">
                  ← Back to Careers
                </Link>
              </div>
              <h1 className="text-[28px] md:text-[48px] font-bold text-white leading-tight tracking-[0.05em]">
                Careers Manager
              </h1>
              <p className="text-base md:text-xl font-normal text-lightBlue mt-2 tracking-[0.05em]">
                Add, edit, or remove open job positions
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
                Add New Position
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
            <span className="text-2xl font-bold text-primary">{positions.length}</span>
            <span className="text-sm text-dark">Total Positions</span>
          </div>
          {departments.map((dept) => (
            <div key={dept} className="flex items-center gap-2">
              <span className="text-lg font-bold text-dark">
                {positions.filter((p) => p.department === dept).length}
              </span>
              <span className="text-xs text-gray-500">{dept}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-20 py-8 md:py-12">
        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Add New Position</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-dark transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(newItem, setNewItem, 'new', handleAdd, 'Add Position')}
          </div>
        )}

        {/* Edit Form */}
        {editingItem && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Edit Position</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-dark transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(editingItem, setEditingItem, 'edit', handleUpdate, 'Save Changes')}
          </div>
        )}

        {/* Department Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {['All', ...departments].map((dept) => (
            <button
              key={dept}
              onClick={() => setFilterDept(dept)}
              className={`px-5 py-2 rounded-[19px] text-sm font-bold tracking-[0.05em] transition-all ${
                filterDept === dept
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border border-gray-200 hover:bg-lightBlue'
              }`}
            >
              {dept}{' '}
              {dept !== 'All' && `(${positions.filter((p) => p.department === dept).length})`}
            </button>
          ))}
        </div>

        {/* Positions List */}
        <div className="space-y-4">
          {filteredPositions.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center shadow-card">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
              <p className="text-lg font-bold text-dark mb-2">No positions found</p>
              <p className="text-sm text-gray-500">
                Add new job openings using the button above.
              </p>
            </div>
          ) : (
            filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Left color bar */}
                  <div className="w-full sm:w-2 bg-primary flex-shrink-0" />

                  {/* Content */}
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs font-bold text-primary bg-lightBlue px-3 py-0.5 rounded-full">
                            {job.department}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-3 py-0.5 rounded-full">
                            {job.type}
                          </span>
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-3 py-0.5 rounded-full">
                            {job.experience}
                          </span>
                          <span className="text-xs text-gray-400">ID: {job.id}</span>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-dark">{job.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                          </svg>
                          {job.location}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{job.description}</p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {job.requirements.slice(0, 3).map((r, i) => (
                            <span
                              key={i}
                              className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full truncate max-w-[200px]"
                            >
                              {r}
                            </span>
                          ))}
                          {job.requirements.length > 3 && (
                            <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              +{job.requirements.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(job)}
                          className="bg-lightBlue text-primary px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-primary hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                          onClick={() => setDeleteConfirm(job.id)}
                          className="bg-red-50 text-red-600 px-5 py-2 rounded-[12px] text-sm font-bold hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1.5"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Delete Position?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The job listing will be permanently removed.
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
                <svg
                  className="w-8 h-8 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark mb-2">Reset Positions?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This will remove all custom positions and restore the defaults. This action cannot be
                undone.
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

export default CareersAdmin;
