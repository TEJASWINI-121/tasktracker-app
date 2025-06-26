import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: '🏠' },
  { path: '/my-tasks', label: 'My Tasks', icon: '📝' },
  { path: '/project-board', label: 'Project Board', icon: '📋' },
  { path: '/projects', label: 'Projects', icon: '📁' },
  { path: '/calendar', label: 'Calendar', icon: '📅' },
  { path: '/team', label: 'Team', icon: '👥' },
  { path: '/settings', label: 'Settings', icon: '⚙️' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside
      style={{
        width: 240,
        background: '#181c24',
        minHeight: '100vh',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 12px 0 #10131a',
      }}
    >
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 28, color: '#42a5f5', letterSpacing: 2 }}>
          TASK TRACKER
        </span>
      </div>
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.9rem 1.2rem',
              marginBottom: 10,
              borderRadius: 8,
              textDecoration: 'none',
              color: location.pathname === item.path ? '#fff' : '#b0b8c1',
              background: location.pathname === item.path ? '#232733' : 'none',
              fontWeight: location.pathname === item.path ? 600 : 500,
              fontSize: 17,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#232733')}
            onMouseOut={e => (e.currentTarget.style.background = location.pathname === item.path ? '#232733' : 'none')}
          >
            <span style={{ fontSize: 22 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', textAlign: 'center', color: '#33384a', fontSize: 13 }}>
        &copy; {new Date().getFullYear()} Task Tracker
      </div>
    </aside>
  );
};

export default Sidebar;