import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  getTeamMembers,
  addTeamMember,
  removeTeamMember,
  updateTeamMember,
  resetTeamMembers,
} from '../data/teamData';
import { uploadToCloudinary } from '../data/cloudinaryUpload';

const emptyMember = {
  name: '',
  role: '',
  image: null,
};

const getInitials = (name) => {
  if (!name) return 'SL';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((p) => p.charAt(0).toUpperCase()).join('');
  return initials || 'SL';
};

const TeamAdmin = () => {
  const [members, setMembers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  const [newItem, setNewItem] = useState({ ...emptyMember });
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  useEffect(() => {
    setMembers(getTeamMembers());
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
      if (target === 'edit' && editingItem) {
        setEditingItem((prev) => ({ ...prev, image: imageUrl }));
      }
    } catch {
      showToast('Failed to upload image', 'error');
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.role.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = addTeamMember(newItem);
    setMembers(updated);
    setNewItem({ ...emptyMember });
    setShowAddForm(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    showToast('Team member added successfully!');
  };

  const handleEdit = (item) => {
    setEditingItem({ ...item });
    setShowAddForm(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editingItem.name.trim() || !editingItem.role.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    const updated = updateTeamMember(editingItem.id, editingItem);
    setMembers(updated);
    setEditingItem(null);
    showToast('Team member updated successfully!');
  };

  const handleDelete = (id) => {
    const updated = removeTeamMember(id);
    setMembers(updated);
    setDeleteConfirm(null);
    showToast('Team member removed successfully!');
  };

  const handleReset = () => {
    const updated = resetTeamMembers();
    setMembers(updated);
    setResetConfirm(false);
    showToast('Team reset to defaults');
  };

  const renderForm = (data, setData, target, onSubmit, submitLabel, fileRef) => (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Name *</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            placeholder="e.g., Aarav Mehta"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-dark mb-2">Role / Position *</label>
          <input
            type="text"
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
            required
            placeholder="e.g., Head of Engineering"
            className="w-full px-4 py-3 rounded-[12px] border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-dark mb-2">Profile Image</label>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="w-20 h-20 rounded-full bg-lightBlue flex items-center justify-center text-primary font-bold text-lg overflow-hidden">
            {data.image ? (
              <img src={data.image} alt={data.name || 'Team member'} className="w-full h-full object-cover" />
            ) : (
              getInitials(data.name)
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, target)}
              className="text-sm"
            />
            {data.image && (
              <button
                type="button"
                onClick={() => setData({ ...data, image: null })}
                className="text-sm text-red-600 font-bold hover:underline"
              >
                Remove Image
              </button>
            )}
          </div>
        </div>
      </div>

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
      {toast && (
        <div
          className={`fixed top-24 right-6 z-[70] px-6 py-3 rounded-[12px] shadow-xl text-white font-bold text-sm transition-all animate-pulse ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {toast.message}
        </div>
      )}

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
                Team Manager
              </h1>
              <p className="text-base md:text-xl font-normal text-lightBlue mt-2 tracking-[0.05em]">
                Add, edit, or remove team members
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
                Add Team Member
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

      <section className="w-full bg-white border-b py-4 px-4 md:px-20">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{members.length}</span>
            <span className="text-sm text-dark">Total Members</span>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-4 md:px-20 py-8 md:py-12">
        {showAddForm && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Add Team Member</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-dark transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(newItem, setNewItem, 'new', handleAdd, 'Add Member', fileInputRef)}
          </div>
        )}

        {editingItem && (
          <div className="bg-white rounded-[20px] shadow-card p-6 md:p-8 mb-8 border-2 border-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-dark">Edit Member</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-gray-400 hover:text-dark transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {renderForm(editingItem, setEditingItem, 'edit', handleUpdate, 'Save Changes', editFileInputRef)}
          </div>
        )}

        <div className="space-y-4">
          {members.length === 0 ? (
            <div className="bg-white rounded-[20px] p-12 text-center shadow-card">
              <svg
                className="w-16 h-16 text-gray-300 mx-auto mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <p className="text-lg font-bold text-dark mb-2">No team members found</p>
              <p className="text-sm text-gray-500">Add a team member using the button above.</p>
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-[20px] shadow-card overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-2 bg-primary flex-shrink-0" />
                  <div className="flex-1 p-4 md:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-lightBlue text-primary font-bold text-lg flex items-center justify-center overflow-hidden">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            getInitials(member.name)
                          )}
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-bold text-dark">{member.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{member.role}</p>
                          <p className="text-xs text-gray-400 mt-1">ID: {member.id}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(member)}
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
                          onClick={() => setDeleteConfirm(member.id)}
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
              </div>
            ))
          )}
        </div>
      </div>

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
              <h3 className="text-xl font-bold text-dark mb-2">Delete Member?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This action cannot be undone. The team member will be permanently removed.
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
              <h3 className="text-xl font-bold text-dark mb-2">Reset Team?</h3>
              <p className="text-sm text-gray-500 mb-6">
                This will remove all custom entries and restore the defaults. This action cannot be
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

export default TeamAdmin;
