import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("BUTTON CLICKED 🔥");  // ✅ debug

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        form
      );

      console.log("RESPONSE:", res.data); // ✅ debug

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);

      navigate('/');
    } catch (err) {
      console.log("LOGIN ERROR:", err); // ✅ debug
      alert(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconWrapper}>📝</div>
        <h1 style={styles.title}>NoteFlow</h1>
        <p style={styles.subtitle}>Welcome back!</p>

        <input
          style={styles.input}
          placeholder="Email"
          value={form.email}
          onChange={e =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* ✅ IMPORTANT: type="button" */}
        <button
          type="button"
          style={styles.button}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p style={styles.link}>
          Don't have an account?{" "}
          <a href="/signup" style={styles.a}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
  },
  iconWrapper: { fontSize: '48px', marginBottom: '8px' },
  title: { color: '#fff', fontSize: '32px', fontWeight: '700', margin: '0 0 4px' },
  subtitle: { color: 'rgba(255,255,255,0.5)', marginBottom: '32px', fontSize: '14px' },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    marginBottom: '20px',
  },
  link: { color: 'rgba(255,255,255,0.5)', fontSize: '14px' },
  a: { color: '#667eea', textDecoration: 'none', fontWeight: '600' },
};

export default LoginPage;