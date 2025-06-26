import React, { useState, useEffect } from 'react';
import { ActivityLog } from '../types';
import { getLogs } from '../utils/logger';

const RecentActivity: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const getIconForType = (type: ActivityLog['type']) => {
    switch (type) {
      case 'CREATE': return '📝';
      case 'UPDATE': return '🔄';
      case 'DELETE': return '❌';
      case 'MOVE': return '➡️';
      default: return '🔔';
    }
  };

  const timeSince = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  if (logs.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#b0b8c1' }}>
        No recent activity to display.
      </div>
    );
  }

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}>
      {logs.map(log => (
        <div key={log.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '1rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #33384a'
        }}>
          <div style={{
            fontSize: '1.5rem',
            background: '#1e2430',
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {getIconForType(log.type)}
          </div>
          <div>
            <p style={{ margin: 0, color: '#fff' }}>
              <span style={{ fontWeight: 'bold' }}>{log.taskTitle}</span>
            </p>
            <p style={{ margin: '4px 0 0', color: '#b0b8c1', fontSize: 14 }}>
              {log.details}
            </p>
            <p style={{ margin: '8px 0 0', color: '#90a4ae', fontSize: 12 }}>
              {timeSince(log.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity; 