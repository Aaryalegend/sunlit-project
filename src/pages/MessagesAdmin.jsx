import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getMessages,
  updateMessageStatus,
  removeMessage,
  clearAllMessages,
  statusOptions,
} from '../data/messagesData';

const MessagesAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedMsg, setExpandedMsg] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [clearConfirm, setClearConfirm] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setMessages(getMessages());
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = (id, status) => {
    const updated = updateMessageStatus(id, status);
    setMessages(updated);
    showToast(`Message marked as ${status}`);
  };

  const handleDelete = (id) => {
    const updated = removeMessage(id);
    setMessages(updated);
    setDeleteConfirm(null);
    setExpandedMsg(null);
    showToast('Message deleted');
  };

  const handleClearAll = () => {
    const updated = clearAllMessages();
    setMessages(updated);
    setClearConfirm(false);
    showToast('All messages cleared');
  };

  const filtered = filterStatus === 'All'
    ? messages
    : messages.filter((m) => m.status === filterStatus);

  const statusCounts = {
    All: messages.length,
    unread: messages.filter((m) => m.status === 'unread').length,
    read: messages.filter((m) => m.status === 'read').length,
    replied: messages.filter((m) => m.status === 'replied').length,
    archived: messages.filter((m) => m.status === 'archived').length,
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread': return 'bg-blue-100 text-blue-800';
      case 'read': return 'bg-yellow-100 text-yellow-800';
      case 'replied': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-200 text-gray-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleExpand = (id) => {
    if (expandedMsg !== id) {
      const msg = messages.find((m) => m.id === id);
      if (msg && msg.status === 'unread') {
        handleStatusChange(id, 'read');
      }
    }
    setExpandedMsg(expandedMsg === id ? null : id);
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
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-[20px] p-6 md:p-8 mb-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl md:text-3xl font-bold tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
                Contact Messages
              </h1>
              <span className="bg-yellow-400 text-dark px-3 py-1 rounded-full text-xs font-bold">ADMIN</span>
            </div>
            <p className="text-white/80 text-sm">Review messages submitted through the contact form</p>
          </div>
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
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

      {/* Messages List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-[20px] shadow-card p-12 text-center">
          <p className="text-5xl mb-4">📬</p>
          <h3 className="text-xl font-bold text-dark mb-2">No Messages</h3>
          <p className="text-gray-500 text-sm">
            {filterStatus === 'All'
              ? 'No contact messages have been received yet.'
              : `No ${filterStatus} messages found.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-[20px] shadow-card overflow-hidden ${msg.status === 'unread' ? 'border-l-4 border-primary' : ''}`}>
              {/* Message Header */}
              <div
                className="p-5 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleExpand(msg.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`text-lg ${msg.status === 'unread' ? 'font-bold' : 'font-semibold'} text-dark`}>{msg.name}</h3>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold capitalize ${getStatusColor(msg.status)}`}>
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-dark">{msg.subject}</span>
                      {msg.service && <span> · {msg.service}</span>}
                      <span> · {msg.submittedAt}</span>
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${expandedMsg === msg.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedMsg === msg.id && (
                <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-gray-100 pt-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Email</p>
                      <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">{msg.email}</a>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Phone</p>
                      <a href={`tel:${msg.phone}`} className="text-sm text-primary hover:underline">{msg.phone}</a>
                    </div>
                    {msg.service && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Service Interested In</p>
                        <p className="text-sm text-dark">{msg.service}</p>
                      </div>
                    )}
                  </div>

                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Message</p>
                    <p className="text-sm text-dark leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">
                      {msg.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-gray-500 mr-2">Set Status:</span>
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(msg.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                          msg.status === s
                            ? getStatusColor(s)
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                    <div className="flex-1" />
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="bg-primary hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors"
                    >
                      Reply via Email
                    </a>
                    <button
                      onClick={() => setDeleteConfirm(msg.id)}
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
            <h3 className="text-lg font-bold text-dark mb-2">Delete Message?</h3>
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
            <h3 className="text-lg font-bold text-dark mb-2">Clear All Messages?</h3>
            <p className="text-sm text-gray-500 mb-6">This will permanently delete all {messages.length} messages.</p>
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

export default MessagesAdmin;
