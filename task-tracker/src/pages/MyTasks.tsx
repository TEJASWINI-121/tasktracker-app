import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';
import { Task } from '../types';
import TaskModal from '../components/TaskModal';

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  useEffect(() => {
    if (!token) return;
    api.getEvents()
      .then(events => setTasks(events.map((event: any) => ({
        ...event,
        id: event._id,
      }))))
      .catch(err => setError(err.message))
  }, [user, token]);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id' | 'assignee' | '_id'>) => {
    if (!token) return;
    try {
      const payload = {
        ...taskData,
        date: taskData.dueDate || new Date().toISOString(),
      };

      if (editingTask) {
        const updated = await api.updateEvent(editingTask.id, payload);
        setTasks(tasks.map(task => (task.id === editingTask.id ? { ...updated, id: updated._id } : task)));
      } else {
        const created = await api.createEvent(payload);
        setTasks([...tasks, { ...created, id: created._id }]);
      }
      setIsModalOpen(false);
      setEditingTask(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;
    try {
      await api.deleteEvent(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ color: '#90caf9' }}>My Tasks</h1>
          <button onClick={() => handleOpenModal()} style={{
              background: '#42a5f5', color: '#fff', border: 'none',
              padding: '10px 20px', borderRadius: 8, cursor: 'pointer'
          }}>Add Task</button>
      </div>
      {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
      <div>
        {tasks.length > 0 ? tasks.map(task => (
          <div key={task.id} style={{ background: '#232733', padding: 16, borderRadius: 8, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: '#fff', margin: 0 }}>{task.title}</h3>
              <p style={{ color: '#b0b8c1', margin: '8px 0 0' }}>{task.description || 'No description'}</p>
            </div>
            <div>
              <button onClick={() => handleOpenModal(task)} style={{ marginRight: 8 }}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        )) : (
          <p>No tasks found. Click "Add Task" to create one.</p>
        )}
      </div>
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          task={editingTask}
          onClose={() => {
              setIsModalOpen(false);
              setEditingTask(null);
          }}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default MyTasks;