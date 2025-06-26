import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState('');

  const handleClearData = () => {
    try {
      localStorage.removeItem('projectTasks');
      localStorage.removeItem('myTasks');
      setFeedback('All task data has been cleared successfully.');
    } catch (error) {
      setFeedback('There was an error clearing the data.');
      console.error("Error clearing local storage:", error);
    }
  };

  return (
    <div style={{ padding: '0 1rem' }}>
      <h2 style={{ 
        fontWeight: 700, 
        fontSize: 26, 
        marginBottom: 24,
        color: '#fff'
      }}>
        Settings
      </h2>

      <div style={{
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
      }}>
        {/* Profile Settings */}
        <div style={{
          background: '#232733',
          borderRadius: 14,
          padding: '2rem',
          color: '#fff'
        }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: 20,
            marginBottom: 24,
            color: '#90caf9'
          }}>
            Profile Settings
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#b0b8c1', marginBottom: 8 }}>Username</label>
            <input type="text" value={user?.username || ''} readOnly style={{
              width: '100%',
              padding: '12px 16px',
              background: '#181c24',
              border: '1px solid #33384a',
              borderRadius: 8,
              color: '#fff',
              fontSize: 16,
              opacity: 0.7
            }}/>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#b0b8c1', marginBottom: 8 }}>Email (mock)</label>
            <input type="email" placeholder="user@example.com" readOnly style={{
              width: '100%',
              padding: '12px 16px',
              background: '#181c24',
              border: '1px solid #33384a',
              borderRadius: 8,
              color: '#fff',
              fontSize: 16,
              opacity: 0.7
            }}/>
          </div>
        </div>

        {/* Data Management */}
        <div style={{
          background: '#232733',
          borderRadius: 14,
          padding: '2rem',
          color: '#fff',
          border: '1px solid #e53935'
        }}>
          <h3 style={{
            fontWeight: 600,
            fontSize: 20,
            marginBottom: 16,
            color: '#ef5350'
          }}>
            Danger Zone
          </h3>
          <p style={{ color: '#b0b8c1', marginBottom: 24, lineHeight: 1.6 }}>
            This will permanently delete all tasks from the Project Board and My Tasks pages. This action cannot be undone.
          </p>
          
          <button 
            onClick={handleClearData}
            style={{
              width: '100%',
              background: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '12px 24px',
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s ease-in-out'
            }}
          >
            Clear All Task Data
          </button>

          {feedback && (
            <p style={{
              marginTop: 24,
              color: '#66bb6a',
              background: '#1e2430',
              padding: '1rem',
              borderRadius: 8,
              textAlign: 'center'
            }}>
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings; 