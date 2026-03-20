import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, logout, isAuthenticated } from '../data/adminAuth';

const AdminLayout = ({ children }) => {
  const [authed, setAuthed] = useState(isAuthenticated());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, [location]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        setAuthed(true);
        setUsername('');
        setPassword('');
      } else {
        setError('Invalid username or password');
      }
      setLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    logout();
    setAuthed(false);
    setMenuOpen(false);
    navigate('/admin');
  };

  const navLinks = [
    { path: '/admin', label: 'Dashboard', icon: '⊞' },
    { path: '/admin/projects', label: 'Projects', icon: '☀' },
    { path: '/admin/blogs', label: 'Blogs', icon: '✎' },
    { path: '/admin/gallery', label: 'Gallery', icon: '▦' },
    { path: '/admin/careers', label: 'Careers', icon: '⚑' },
    { path: '/admin/team', label: 'Team', icon: '☺' },
    { path: '/admin/applications', label: 'Applications', icon: '✉' },
    { path: '/admin/messages', label: 'Messages', icon: '💬' },
  ];

  /* ─── Login Screen ─── */
  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Logo / Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-blue-700 mb-4 shadow-lg">
              <span className="text-white text-3xl font-bold">S</span>
            </div>
            <h1 className="text-2xl font-bold text-dark tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              Admin Panel
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Sun Lit Tech — Management Console</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-[20px] shadow-card p-8">
            <h2 className="text-lg font-bold text-dark mb-6 text-center tracking-[0.05em]" style={{ fontFamily: 'Century Gothic, sans-serif' }}>
              Sign In
            </h2>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <span>✕</span> {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-dark"
                  placeholder="Enter username"
                  required
                  autoFocus
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors text-dark pr-12"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? '◉' : '◎'}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-3 rounded-[19px] transition-all duration-200 tracking-[0.05em] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: 'Century Gothic, sans-serif' }}
              >
                {loading ? (
                  <>
                    <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm text-primary hover:text-blue-700 font-medium transition-colors"
              >
                ← Back to Website
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            Protected area — Authorized personnel only
          </p>
        </div>
      </div>
    );
  }

  /* ─── Authenticated Layout ─── */
  return (
    <div className="min-h-[80vh]">
      {/* Admin Top Bar */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Left: Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    location.pathname === link.path
                      ? 'bg-white/25 text-white'
                      : 'text-white/75 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/15"
            >
              <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
            </button>

            {/* Right: Brand + Logout */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-xs text-white/60 font-medium tracking-wider uppercase">
                Admin Console
              </span>
              <div className="h-5 w-px bg-white/25 hidden sm:block" />
              <Link
                to="/"
                className="text-white/75 hover:text-white text-sm font-medium transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/15 hover:bg-white/25 text-white text-sm font-medium px-4 py-1.5 rounded-lg transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/15 px-4 pb-3 pt-2 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-white/25 text-white'
                    : 'text-white/75 hover:bg-white/15 hover:text-white'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Page Content */}
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
