import React from 'react';

const Footer: React.FC = () => (
  <footer style={{
    background: '#181c24',
    color: '#b0b8c1',
    padding: '3rem 2rem 2rem 2rem',
    marginTop: 'auto',
    borderTop: '1px solid #33384a',
    width: '100%',
  }}>
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '2.5rem',
    }}>
      <div>
        <h3 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 700, fontSize: 22 }}>Task Tracker</h3>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          Your all-in-one solution for managing tasks, projects, and teams. Stay organized, productive, and ahead of your deadlines.
        </p>
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Quick Links</h4>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 15 }}>
          <li style={{ marginBottom: '0.7rem' }}><a href="/" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Dashboard</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/my-tasks" style={{ color: '#b0b8c1', textDecoration: 'none' }}>My Tasks</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/project-board" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Project Board</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/projects" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Projects</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/calendar" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Calendar</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/team" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Team</a></li>
          <li style={{ marginBottom: '0.7rem' }}><a href="/settings" style={{ color: '#b0b8c1', textDecoration: 'none' }}>Settings</a></li>
        </ul>
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Contact</h4>
        <p style={{ fontSize: 15, marginBottom: 8 }}>✉️ support@tasktracker.com</p>
        <p style={{ fontSize: 15, marginBottom: 8 }}>📞 +1 234 567 8901</p>
        <div style={{ marginTop: 12 }}>
          <span style={{ fontSize: 22, marginRight: 12 }}>🌐</span>
          <span style={{ fontSize: 22, marginRight: 12 }}>🐦</span>
          <span style={{ fontSize: 22, marginRight: 12 }}>📘</span>
          <span style={{ fontSize: 22 }}>📸</span>
        </div>
      </div>
      <div>
        <h4 style={{ color: '#fff', marginBottom: '1rem', fontWeight: 600 }}>Newsletter</h4>
        <p style={{ fontSize: 15 }}>Get updates and productivity tips:</p>
        <form style={{ display: 'flex', marginTop: 10 }} onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Your email" style={{
            flex: 1,
            padding: '10px',
            background: '#232733',
            border: '1px solid #33384a',
            borderRadius: '8px 0 0 8px',
            color: '#fff',
            outline: 'none',
          }} />
          <button type="submit" style={{
            padding: '0 18px',
            background: '#42a5f5',
            border: 'none',
            color: '#fff',
            fontWeight: 600,
            borderRadius: '0 8px 8px 0',
            cursor: 'pointer',
          }}>
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div style={{
      textAlign: 'center',
      marginTop: '2.5rem',
      paddingTop: '1.5rem',
      borderTop: '1px solid #33384a',
      fontSize: 14,
      color: '#6c7380',
    }}>
      &copy; {new Date().getFullYear()} Task Tracker. All Rights Reserved.
    </div>
  </footer>
);

export default Footer; 