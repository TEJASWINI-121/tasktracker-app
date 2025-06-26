import { ActivityLog } from '../types';

const MAX_LOGS = 50;

export const getLogs = (): ActivityLog[] => {
  const logs = localStorage.getItem('activityLogs');
  return logs ? JSON.parse(logs) : [];
};

export const addLog = (
  type: ActivityLog['type'],
  taskTitle: string,
  details: string
) => {
  const logs = getLogs();
  const newLog: ActivityLog = {
    id: Date.now().toString(),
    type,
    taskTitle,
    details,
    date: new Date().toISOString(),
  };

  const updatedLogs = [newLog, ...logs].slice(0, MAX_LOGS);
  localStorage.setItem('activityLogs', JSON.stringify(updatedLogs));
}; 