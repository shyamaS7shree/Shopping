'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { registerUser, loginUser, saveAuth } from '@/lib/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Login form
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Register form
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  if (!isOpen) return null;

  // ── HANDLE LOGIN ──────────────────────────────
  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      setIsError(true);
      setMessage('Please fill all fields');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await loginUser(loginData);
      if (res.accessToken) {
        saveAuth(res.accessToken, res.refreshToken, res.user);
        setIsError(false);
        setMessage(`Welcome back, ${res.user.fullName}! 🎉`);
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 1500);
      } else {
        setIsError(true);
        setMessage(res.message || 'Login failed');
      }
    } catch {
      setIsError(true);
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── HANDLE REGISTER ───────────────────────────
  const handleRegister = async () => {
    if (!registerData.fullName || !registerData.email || !registerData.password) {
      setIsError(true);
      setMessage('Please fill all fields');
      return;
    }
    if (registerData.password.length < 6) {
      setIsError(true);
      setMessage('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setMessage('');
    try {
      const res = await registerUser(registerData);
      if (res.message?.includes('successful')) {
        setIsError(false);
        setMessage('✅ Registration successful! Please check your email to verify.');
        setRegisterData({ fullName: '', email: '', password: '' });
      } else {
        setIsError(true);
        setMessage(res.message || 'Registration failed');
      }
    } catch {
      setIsError(true);
      setMessage('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#ffffff',
        borderRadius: '20px',
        width: '420px',
        maxWidth: '95vw',
        zIndex: 1001,
        boxShadow: '0 25px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        fontFamily: 'DM Sans, sans-serif',
      }}>

        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #ec4899, #f472b6)',
          padding: '28px 32px 24px',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none', color: 'white',
              width: '32px', height: '32px',
              borderRadius: '50%', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={16} />
          </button>
          <h2 style={{
            color: 'white', margin: 0,
            fontSize: '24px', fontWeight: '700',
          }}>
            🛍️ Shopore
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', margin: '6px 0 0', fontSize: '14px' }}>
            {tab === 'login' ? 'Welcome back!' : 'Create your account'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '2px solid #f3f4f6' }}>
          {(['login', 'register'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setMessage(''); }}
              style={{
                flex: 1, padding: '14px',
                border: 'none', background: 'none',
                fontSize: '14px', fontWeight: '600',
                cursor: 'pointer',
                color: tab === t ? '#ec4899' : '#9ca3af',
                borderBottom: tab === t ? '2px solid #ec4899' : '2px solid transparent',
                marginBottom: '-2px',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                textTransform: 'capitalize',
              }}
            >
              {t === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ padding: '28px 32px' }}>

          {/* Message */}
          {message && (
            <div style={{
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: '500',
              background: isError ? '#fef2f2' : '#f0fdf4',
              color: isError ? '#ef4444' : '#16a34a',
              border: `1px solid ${isError ? '#fecaca' : '#bbf7d0'}`,
            }}>
              {message}
            </div>
          )}

          {/* LOGIN FORM */}
          {tab === 'login' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                style={inputStyle}
              />
              <button
                onClick={handleLogin}
                disabled={loading}
                style={btnStyle}
              >
                {loading ? 'Logging in...' : 'Login →'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                Don't have an account?{' '}
                <button
                  onClick={() => setTab('register')}
                  style={{ color: '#ec4899', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontFamily: 'inherit' }}
                >
                  Register
                </button>
              </p>
            </div>
          )}

          {/* REGISTER FORM */}
          {tab === 'register' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Full name"
                value={registerData.fullName}
                onChange={e => setRegisterData({ ...registerData, fullName: e.target.value })}
                style={inputStyle}
              />
              <input
                type="email"
                placeholder="Email address"
                value={registerData.email}
                onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
                style={inputStyle}
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={registerData.password}
                onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                style={inputStyle}
              />
              <button
                onClick={handleRegister}
                disabled={loading}
                style={btnStyle}
              >
                {loading ? 'Creating account...' : 'Create Account →'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                Already have an account?{' '}
                <button
                  onClick={() => setTab('login')}
                  style={{ color: '#ec4899', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600', fontFamily: 'inherit' }}
                >
                  Login
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── STYLES ────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  border: '2px solid rgba(236,72,153,0.15)',
  borderRadius: '10px',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'DM Sans, sans-serif',
  color: '#1f2937',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const btnStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px',
  background: 'linear-gradient(135deg, #ec4899, #f472b6)',
  color: 'white',
  border: 'none',
  borderRadius: '10px',
  fontSize: '15px',
  fontWeight: '700',
  cursor: 'pointer',
  fontFamily: 'DM Sans, sans-serif',
  transition: 'opacity 0.2s',
};