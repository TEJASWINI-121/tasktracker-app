import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';
import { Task } from '../types';
import TaskModal from '../components/TaskModal';

const ProjectBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;
    api.getEvents()
      .then(events => setTasks(events.map((event: any) => ({
        ...event,
        id: event._id,
      }))))
      .catch(err => setError(err.message));
  }, [token]);

  const handleOpenModal = (task: Task | null = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (taskData: Omit<Task, 'id' | '_id' | 'assignee'>) => {
    if (!token) return;
    try {
      const payload = { ...taskData, date: taskData.dueDate || new Date().toISOString() };
      if (editingTask) {
        const updated = await api.updateEvent(editingTask.id, payload);
        setTasks(tasks.map(t => (t.id === editingTask.id ? { ...updated, id: updated._id } : t)));
      } else {
        const created = await api.createEvent(payload);
        setTasks([...tasks, { ...created, id: created._id }]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!token) return;
    try {
      await api.deleteEvent(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#90caf9' }}>Project Board</h1>
      <button onClick={() => handleOpenModal()} style={{ marginBottom: 24 }}>Add Task</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {tasks.map(task => (
          <div key={task.id} style={{ background: '#232733', padding: 16, borderRadius: 8, marginBottom: 16 }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => handleOpenModal(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          task={editingTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default ProjectBoard;