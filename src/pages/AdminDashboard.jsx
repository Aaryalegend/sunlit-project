import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGalleryItems } from '../data/galleryData';
import { getPositions } from '../data/careersData';
import { getBlogs } from '../data/blogsData';
import { getProjects } from '../data/projectsData';
import { getSettings, updateSettings, resetSettings } from '../data/siteSettings';
import { getCredentials, updateCredentials } from '../data/adminAuth';
import { getApplications } from '../data/applicationsData';
import { getMessages } from '../data/messagesData';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, gallery: 0, positions: 0, applications: 0, messages: 0 });
  const [settings, setSettings] = useState(getSettings());
  const [editingSettings, setEditingSettings] = useState(false);
  const [settingsForm, setSettingsForm] = useState({});
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadStats();
    setSettings(getSettings());
  }, []);

  const loadStats = async () => {
    const [projects, blogs, gallery] = await Promise.all([
      getProjects(),
      getBlogs(),
      getGalleryItems(),
    ]);

    setStats({
      projects: projects.length,
      blogs: blogs.length,
      gallery: gallery.length,
      positions: getPositions().length,
      applications: getApplications().length,
      messages: getMessages().filter(m => m.status === 'unread').length,
    });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* ─── Settings ─── */
  const startEditSettings = () => {
    setSettingsForm({ ...settings });
    setEditingSettings(true);
  };

  const saveSettings = () => {
    const updated = updateSettings(settingsForm);
    setSettings(updated);
    setEditingSettings(false);
    showToast('Site settings updated successfully');
  };

  const handleResetSettings = () => {
    const defaults = resetSettings();
    setSettings(defaults);
    setEditingSettings(false);
    showToast('Settings reset to defaults');
  };

  /* ─── Credentials ─── */
  const handlePasswordChange = () => {
    const creds = getCredentials();
    if (passwordForm.currentPassword !== creds.password) {
      showToast('Current password is incorrect', 'error');
      return;
    }
    if (!passwordForm.newUsername.trim()) {
      showToast('Username cannot be empty', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }
    updateCredentials(passwordForm.newUsername.trim(), passwordForm.newPassword);
    setPasswordForm({ currentPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
    setChangingPassword(false);
    showToast('Credentials updated successfully');
  };

  const adminSections = [
    {
      title: 'Projects',
      path: '/admin/projects',
      icon: '☀',
      count: stats.projects,
      color: 'from-amber-400 to-orange-500',
      description: 'Manage solar installations & project showcase',
    },
    {
      title: 'Blogs',
      path: '/admin/blogs',
      icon: '✎',
      count: stats.blogs,
      color: 'from-blue-400 to-indigo-500',
      description: 'Publish & manage blog articles',
    },
    {
      title: 'Gallery',
      path: '/admin/gallery',
      icon: '▦',
      count: stats.gallery,
      color: 'from-emerald-400 to-teal-500',
      description: 'Curate project photos & media',
    },
    {
      title: 'Careers',
      path: '/admin/careers',
      icon: '⚑',
      count: stats.positions,
      color: 'from-purple-400 to-pink-500',
      description: 'Post & manage job openings',
    },
    {
      title: 'Applications',
      path: '/admin/applications',
      icon: '✉',
      count: stats.applications,
      color: 'from-rose-400 to-red-500',
      description: 'Review job applications from candidates',
    },
    {
      title: 'Messages',
      path: '/admin/messages',
      icon: '💬',
      count: stats.messages,
      color: 'from-cyan-400 to-blue-500',
      description: 'Contact form submissions & inquiries',
    },
  ];

  const statCards = [
    { label: 'Total Projects', value: stats.projects, icon: '☀', bg: 'bg-amber-50 text-amber-700' },
    { label: 'Blog Posts', value: stats.blogs, icon: '✎', bg: 'bg-blue-50 text-blue-700' },
    { label: 'Gallery Items', value: stats.gallery, icon: '▦', bg: 'bg-emerald-50 text-emerald-700' },
    { label: 'Open Positions', value: stats.positions, icon: '⚑', bg: 'bg-purple-50 text-purple-700' },
    { label: 'Applications', value: stats.applications, icon: '✉', bg: 'bg-rose-50 text-rose-700' },
    { label: 'Unread Messages', value: stats.messages, icon: '💬', bg: 'bg-cyan-50 text-cyan-700' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-28 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium transition-all duration-300 ${
          toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
          Dashboard
        </h1>
        <p className="text-gray-500 mt-1">Welcome back — here's an overview of your site</p>
      </div>

      {/* ─── Stats Grid ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-[20px] shadow-card p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-dark">{card.value}</p>
              <p className="text-xs text-gray-500 font-medium">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Quick Navigation / Admin Sections ─── */}
      <div className="mb-10">
        <h2 className="text-lg font-bold text-dark mb-4 tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
          Manage Sections
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {adminSections.map((section) => (
            <Link
              key={section.path}
              to={section.path}
              className="group bg-white rounded-[20px] shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${section.color}`} />
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{section.icon}</span>
                  <span className="bg-gray-100 text-dark font-bold text-sm px-3 py-1 rounded-full">
                    {section.count}
                  </span>
                </div>
                <h3 className="font-bold text-dark text-lg mb-1 group-hover:text-primary transition-colors">
                  {section.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{section.description}</p>
                <div className="mt-3 text-primary font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Manage →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ─── Site Settings ─── */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-[20px] shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-dark tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              Site Settings
            </h2>
            {!editingSettings ? (
              <button
                onClick={startEditSettings}
                className="bg-primary hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-[19px] transition-colors"
              >
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleResetSettings}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold px-3 py-2 rounded-[19px] transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => setEditingSettings(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-bold px-3 py-2 rounded-[19px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveSettings}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-[19px] transition-colors"
                >
                  Save
                </button>
              </div>
            )}
          </div>

          {!editingSettings ? (
            <div className="space-y-3">
              {[
                { label: 'Company Name', value: settings.companyName },
                { label: 'Tagline', value: settings.tagline },
                { label: 'Phone', value: settings.phone },
                { label: 'Email', value: settings.email },
                { label: 'Address', value: settings.address },
              ].map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm font-semibold text-gray-500 sm:w-36 shrink-0">{item.label}</span>
                  <span className="text-dark text-sm">{item.value}</span>
                </div>
              ))}

              <div className="pt-2">
                <p className="text-sm font-semibold text-gray-500 mb-2">Hero Stats</p>
                <div className="grid grid-cols-2 gap-2">
                  {settings.heroStats && Object.entries(settings.heroStats).map(([key, val]) => (
                    <div key={key} className="bg-lightBlue rounded-xl px-3 py-2">
                      <span className="text-xs text-gray-500 capitalize">{key}</span>
                      <p className="text-dark font-bold text-sm">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[
                { key: 'companyName', label: 'Company Name' },
                { key: 'tagline', label: 'Tagline' },
                { key: 'phone', label: 'Phone' },
                { key: 'email', label: 'Email' },
                { key: 'address', label: 'Address' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="text"
                    value={settingsForm[field.key] || ''}
                    onChange={(e) => setSettingsForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                  />
                </div>
              ))}

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Hero Stats</p>
                <div className="grid grid-cols-2 gap-3">
                  {settingsForm.heroStats && Object.entries(settingsForm.heroStats).map(([key, val]) => (
                    <div key={key}>
                      <label className="block text-xs text-gray-500 capitalize mb-1">{key}</label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) =>
                          setSettingsForm(prev => ({
                            ...prev,
                            heroStats: { ...prev.heroStats, [key]: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── Admin Credentials / Security ─── */}
        <div className="bg-white rounded-[20px] shadow-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-dark tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              Security
            </h2>
            {!changingPassword && (
              <button
                onClick={() => {
                  const creds = getCredentials();
                  setPasswordForm({ currentPassword: '', newUsername: creds.username, newPassword: '', confirmPassword: '' });
                  setChangingPassword(true);
                }}
                className="bg-primary hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-[19px] transition-colors"
              >
                Change
              </button>
            )}
          </div>

          {!changingPassword ? (
            <div className="space-y-4">
              <div className="bg-lightBlue rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary text-lg">⊕</span>
                  </div>
                  <div>
                    <p className="font-bold text-dark text-sm">Admin Account</p>
                    <p className="text-gray-500 text-xs">Username: <span className="font-semibold text-dark">{getCredentials().username}</span></p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Session-based authentication. You will be logged out when the browser is closed.
                </p>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-amber-800 mb-1">Storage Info</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  All data is stored in your browser's local storage. Clearing browser data will reset everything to defaults.
                  Consider exporting important data periodically.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">Quick Data Summary</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Gallery Items</span>
                    <span className="font-bold text-dark">{stats.gallery} items</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blog Posts</span>
                    <span className="font-bold text-dark">{stats.blogs} posts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Projects</span>
                    <span className="font-bold text-dark">{stats.projects} projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Positions</span>
                    <span className="font-bold text-dark">{stats.positions} positions</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Username</label>
                <input
                  type="text"
                  value={passwordForm.newUsername}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newUsername: e.target.value }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                  placeholder="Min 6 characters"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-sm text-dark"
                  placeholder="Re-enter new password"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setChangingPassword(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2.5 rounded-[19px] transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2.5 rounded-[19px] transition-colors text-sm"
                >
                  Update Credentials
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Quick Links Footer ─── */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-[20px] p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              Need to update something quickly?
            </h2>
            <p className="text-white/70 text-sm mt-1">Jump directly to any admin section</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {adminSections.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                className="bg-white/15 hover:bg-white/25 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                {s.icon} {s.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
