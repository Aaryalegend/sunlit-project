import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getApplications,
  updateApplicationStatus,
  removeApplication,
  clearAllApplications,
  statusOptions,
} from '../data/applicationsData';

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedApp, setExpandedApp] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id, status) => {
    const updated = updateApplicationStatus(id, status);
    setApplications(updated);
    showToast(`Application marked as ${status}`);
  };

  const handleDelete = (id) => {
    const updated = removeApplication(id);
    setApplications(updated);
    setDeleteConfirm(null);
    setExpandedApp(null);
    showToast('Application deleted');
  };

  const handleClearAll = () => {
    const updated = clearAllApplications();
    setApplications(updated);
    setClearConfirm(false);
    showToast('All applications cleared');
  };

  const filtered = filterStatus === 'All'
    ? applications
    : applications.filter((a) => a.status === filterStatus);

  const statusCounts = {
    All: applications.length,
    new: applications.filter((a) => a.status === 'new').length,
    reviewed: applications.filter((a) => a.status === 'reviewed').length,
    shortlisted: applications.filter((a) => a.status === 'shortlisted').length,
    rejected: applications.filter((a) => a.status === 'rejected').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-[20px] p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                Job Applications
              </h1>
              <span className="bg-yellow-400 text-dark px-3 py-1 rounded-full text-xs font-bold">ADMIN</span>
            </div>
            <p className="text-white/80 text-sm">Review and manage job applications from candidates</p>
          </div>
          <div className="flex items-center gap-3">
            {applications.length > 0 && (
              <button
                onClick={() => setClearConfirm(true)}
                className="bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-4 py-2 rounded-[19px] transition-colors"
              >
                Clear All
              </button>
            )}
            <Link
              to="/admin"
              className="bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-4 py-2 rounded-[19px] transition-colors"
            >
              ← Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {['All', ...statusOptions].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all capitalize ${
              filterStatus === status
                ? 'bg-primary text-white shadow-card'
                : 'bg-white text-gray-600 shadow-card hover:bg-lightBlue'
            }`}
          >
            {status} ({statusCounts[status] || 0})
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[20px] shadow-card p-12 text-center">
          <p className="text-5xl mb-4">📭</p>
          <h3 className="text-xl font-bold text-dark mb-2">No Applications</h3>
          <p className="text-gray-500 text-sm">
            {filterStatus === 'All'
              ? 'No applications have been submitted yet.'
              : `No ${filterStatus} applications found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <div key={app.id} className="bg-white rounded-[20px] shadow-card overflow-hidden">
              {/* App Header */}
              <div
                className="p-5 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedApp(expandedApp === app.id ? null : app.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-dark">{app.name}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-primary">{app.position}</span>
                      {app.department !== 'General' && <span> · {app.department}</span>}
                      <span> · {app.submittedAt}</span>
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedApp === app.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedApp === app.id && (
                <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-gray-100 pt-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                        <a href={`mailto:${app.email}`} className="text-sm text-primary hover:underline">{app.email}</a>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                        <a href={`tel:${app.phone}`} className="text-sm text-primary hover:underline">{app.phone}</a>
                      </div>
                      {app.experience && (
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Experience</p>
                          <p className="text-sm text-dark">{app.experience}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Cover Letter / Message</p>
                      <p className="text-sm text-dark leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">
                        {app.coverLetter}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 mr-2">Set Status:</span>
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(app.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                          app.status === s
                            ? getStatusColor(s)
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                    <div className="flex-1" />
                    <button
                      onClick={() => setDeleteConfirm(app.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-dark mb-2">Delete Application?</h3>
            <p className="text-sm text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 rounded-[19px] text-sm">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-[19px] text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Clear All Confirm Modal */}
      {clearConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-dark mb-2">Clear All Applications?</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently delete all {applications.length} applications.</p>
            <div className="flex gap-3">
              <button onClick={() => setClearConfirm(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 rounded-[19px] text-sm">Cancel</button>
              <button onClick={handleClearAll} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-[19px] text-sm">Clear All</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsAdmin;
