'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) { toast.error('Please fill in all fields'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Logged in successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData.firstName || !registerData.email || !registerData.password || !registerData.confirmPassword) {
      toast.error('Please fill in all fields'); return;
    }
    if (registerData.password !== registerData.confirmPassword) { toast.error('Passwords do not match'); return; }
    if (registerData.password.length < 8) { toast.error('Password must be at least 8 characters'); return; }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Account created successfully!');
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid #e5e7eb', borderRadius: '8px',
    fontSize: '14px', color: '#111827', outline: 'none',
    fontFamily: 'DM Sans, sans-serif', background: '#fff',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '13px',
    fontWeight: 600, color: '#374151', marginBottom: '6px',
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: '16px',
          width: '860px', maxWidth: '95vw',
          maxHeight: '90vh', overflow: 'hidden',
          display: 'flex', position: 'relative',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(255,255,255,0.9)', border: 'none',
            borderRadius: '50%', width: '32px', height: '32px',
            cursor: 'pointer', zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <X size={16} color="#374151" />
        </button>

        {/* Left - Branding + Video */}
        <div style={{
          width: '45%', position: 'relative',
          background: '#111827', flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {/* Video background */}
          <video
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', opacity: 0.5,
            }}
          >
            {/* Replace with your actual video src */}
            <source src="/videos/fashion.mp4" type="video/mp4" />
          </video>

          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(17,24,39,0.7) 100%)',
          }} />

          {/* Brand text */}
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px' }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '36px', fontWeight: 800,
              color: '#fff', letterSpacing: '6px',
              textTransform: 'uppercase',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
              marginBottom: '12px',
            }}>
              SHOPORE
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.8)',
              fontSize: '14px', letterSpacing: '2px',
              textTransform: 'uppercase',
              fontFamily: 'DM Sans, sans-serif',
            }}>
              Your Style. Your Story.
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div style={{
          flex: 1, padding: '40px 36px',
          overflowY: 'auto',
          fontFamily: 'DM Sans, sans-serif',
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', marginBottom: '28px', borderBottom: '2px solid #f3f4f6' }}>
            {(['login', 'register'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setMode(tab)}
                style={{
                  flex: 1, padding: '12px',
                  background: 'none', border: 'none',
                  fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', fontFamily: 'inherit',
                  color: mode === tab ? '#ec4899' : '#9ca3af',
                  borderBottom: mode === tab ? '2px solid #ec4899' : '2px solid transparent',
                  marginBottom: '-2px', transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {tab === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email" placeholder="you@example.com"
                  value={loginData.email}
                  onChange={e => setLoginData(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Password</label>
                  <a href="#" style={{ fontSize: '12px', color: '#ec4899', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
                </div>
                <input
                  type="password" placeholder="••••••••"
                  value={loginData.password}
                  onChange={e => setLoginData(p => ({ ...p, password: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                style={{
                  width: '100%', padding: '12px',
                  background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit', marginTop: '4px',
                  boxShadow: '0 4px 15px rgba(236,72,153,0.3)',
                  transition: 'opacity 0.2s',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                Don't have an account?{' '}
                <button type="button" onClick={() => setMode('register')} style={{ color: '#ec4899', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}>
                  Sign Up
                </button>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input
                    type="text" placeholder="John"
                    value={registerData.firstName}
                    onChange={e => setRegisterData(p => ({ ...p, firstName: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#ec4899'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input
                    type="text" placeholder="Doe"
                    value={registerData.lastName}
                    onChange={e => setRegisterData(p => ({ ...p, lastName: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor = '#ec4899'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email" placeholder="you@example.com"
                  value={registerData.email}
                  onChange={e => setRegisterData(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input
                  type="password" placeholder="At least 8 characters"
                  value={registerData.password}
                  onChange={e => setRegisterData(p => ({ ...p, password: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password" placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={e => setRegisterData(p => ({ ...p, confirmPassword: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#ec4899'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <input type="checkbox" id="terms" required style={{ marginTop: '2px' }} />
                <label htmlFor="terms" style={{ fontSize: '12px', color: '#6b7280' }}>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#ec4899', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#ec4899', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                </label>
              </div>
              <button
                type="submit" disabled={isSubmitting}
                style={{
                  width: '100%', padding: '12px',
                  background: 'linear-gradient(135deg, #ec4899, #f472b6)',
                  color: '#fff', border: 'none', borderRadius: '8px',
                  fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                  fontFamily: 'inherit',
                  boxShadow: '0 4px 15px rgba(236,72,153,0.3)',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                Already have an account?{' '}
                <button type="button" onClick={() => setMode('login')} style={{ color: '#ec4899', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '13px' }}>
                  Log In
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}