import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://notes-app-production-eb4a.up.railway.app';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchNotes(); }, []);

  const fetchNotes = async () => {
    const res = await axios.get(`${API}/api/notes`, { headers });
    setNotes(res.data);
  };

  const saveNote = async () => {
    if (!title || !content) return alert('Fill in both fields!');
    if (editId) {
      await axios.put(`${API}/api/notes/${editId}`, { title, content }, { headers });
      setEditId(null);
    } else {
      await axios.post(`${API}/api/notes`, { title, content }, { headers });
    }
    setTitle(''); setContent(''); setShowForm(false);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API}/api/notes/${id}`, { headers });
    fetchNotes();
  };

  const editNote = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
    setShowForm(true);
  };

  const logout = () => { localStorage.clear(); navigate('/login'); };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <span style={styles.logo}>📝 NoteFlow</span>
        <div style={styles.navRight}>
          <span style={styles.welcome}>👋 {username}</span>
          <button style={styles.logoutBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      <div style={styles.main}>
        <div style={styles.header}>
          <h2 style={styles.heading}>My Notes</h2>
          <button style={styles.addBtn} onClick={() => { setShowForm(!showForm); setEditId(null); setTitle(''); setContent(''); }}>
            {showForm ? '✕ Cancel' : '+ New Note'}
          </button>
        </div>

        {showForm && (
          <div style={styles.form}>
            <input style={styles.input} placeholder="Note title..."
              value={title} onChange={e => setTitle(e.target.value)} />
            <textarea style={styles.textarea} placeholder="Write your note..."
              value={content} onChange={e => setContent(e.target.value)} />
            <button style={styles.saveBtn} onClick={saveNote}>
              {editId ? '✓ Update Note' : '✓ Save Note'}
            </button>
          </div>
        )}

        {notes.length === 0 ? (
          <div style={styles.empty}>
            <p style={styles.emptyText}>No notes yet. Create your first one! 🚀</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {notes.map((note, i) => (
              <div key={note._id} style={{...styles.noteCard, background: colors[i % colors.length]}}>
                <h3 style={styles.noteTitle}>{note.title}</h3>
                <p style={styles.noteContent}>{note.content}</p>
                <div style={styles.noteActions}>
                  <button style={styles.editBtn} onClick={() => editNote(note)}>✏️ Edit</button>
                  <button style={styles.deleteBtn} onClick={() => deleteNote(note._id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const colors = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
];

const styles = {
  container: { minHeight: '100vh', background: '#0f0f1a', fontFamily: "'Segoe UI', sans-serif" },
  navbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px', background: 'rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  logo: { color: '#fff', fontSize: '22px', fontWeight: '700' },
  navRight: { display: 'flex', alignItems: 'center', gap: '16px' },
  welcome: { color: 'rgba(255,255,255,0.6)', fontSize: '14px' },
  logoutBtn: {
    padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)',
    background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '14px',
  },
  main: { maxWidth: '900px', margin: '0 auto', padding: '40px 24px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  heading: { color: '#fff', fontSize: '28px', fontWeight: '700', margin: 0 },
  addBtn: {
    padding: '12px 24px', borderRadius: '12px', border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#fff', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  form: {
    background: 'rgba(255,255,255,0.05)', borderRadius: '16px',
    padding: '24px', marginBottom: '32px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  input: {
    width: '100%', padding: '14px 16px', marginBottom: '12px',
    borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)', color: '#fff',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box',
  },
  textarea: {
    width: '100%', padding: '14px 16px', marginBottom: '16px',
    borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)', color: '#fff',
    fontSize: '15px', outline: 'none', boxSizing: 'border-box',
    height: '120px', resize: 'vertical',
  },
  saveBtn: {
    padding: '12px 28px', borderRadius: '10px', border: 'none',
    background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    color: '#000', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
  },
  empty: { textAlign: 'center', padding: '80px 0' },
  emptyText: { color: 'rgba(255,255,255,0.3)', fontSize: '18px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' },
  noteCard: { borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' },
  noteTitle: { color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 },
  noteContent: { color: 'rgba(255,255,255,0.85)', fontSize: '14px', margin: 0, lineHeight: '1.6' },
  noteActions: { display: 'flex', gap: '8px', marginTop: 'auto' },
  editBtn: {
    padding: '8px 14px', borderRadius: '8px', border: 'none',
    background: 'rgba(255,255,255,0.2)', color: '#fff', cursor: 'pointer', fontSize: '13px',
  },
  deleteBtn: {
    padding: '8px 14px', borderRadius: '8px', border: 'none',
    background: 'rgba(0,0,0,0.2)', color: '#fff', cursor: 'pointer', fontSize: '13px',
  },
};

export default HomePage;