const API_URL = process.env.NEXT_PUBLIC_API_URL;

// ── REGISTER ─────────────────────────────────────
export async function registerUser(data: {
  fullName: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ── LOGIN ─────────────────────────────────────────
export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

// ── SAVE TOKEN ────────────────────────────────────
export function saveAuth(accessToken: string, refreshToken: string, user: any) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
}

// ── GET TOKEN ─────────────────────────────────────
export function getToken() {
  return localStorage.getItem('accessToken');
}

// ── GET USER ──────────────────────────────────────
export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

// ── LOGOUT ────────────────────────────────────────
export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

// ── SUBSCRIBE ─────────────────────────────────────
export async function subscribeNewsletter(data: {
  email: string;
  name?: string;
}) {
  const res = await fetch(`${API_URL}/api/subscriber/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}