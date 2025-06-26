import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Task, TaskStatus } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<Task, 'id' | '_id' | 'assignee'>) => void;
  task?: Task | null;
  defaultStatus?: TaskStatus;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, task, defaultStatus = 'todo' }) => {
  const { user } = useAuth();
  const [title, setTitle] = React.useState(task?.title || '');
  const [description, setDescription] = React.useState(task?.description || '');
  const [status, setStatus] = React.useState<TaskStatus>(task?.status || defaultStatus);
  const [priority, setPriority] = React.useState<'Low' | 'Medium' | 'High'>(task?.priority || 'Medium');
  const [dueDate, setDueDate] = React.useState(task?.dueDate || '');
  const [tags, setTags] = React.useState(task?.tags?.join(', ') || '');
  const [comment, setComment] = React.useState('');

  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority || 'Medium');
      setDueDate(task.dueDate || '');
      setTags(task.tags?.join(', ') || '');
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setStatus(defaultStatus);
      setPriority('Medium');
      setDueDate('');
      setTags('');
    }
    // Always reset comment field when modal opens/task changes
    setComment('');
  }, [task, isOpen, defaultStatus]);

  const handleAddComment = () => {
    if (!comment.trim() || !task) return;
    const newComment = {
      author: user?.username || 'Anonymous',
      text: comment,
      date: new Date().toISOString(),
    };
    const updatedTask = {
      ...task,
      comments: [...(task.comments || []), newComment],
    };
    // This is tricky - onSave expects Omit<Task, 'id'>
    // We need to pass all properties except id.
    const { id, ...taskData } = updatedTask;
    onSave(taskData);
    setComment('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      status,
      priority,
      dueDate,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      comments: task?.comments || []
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ margin: '0 0 1.5rem', color: '#1976d2' }}>
          {task ? 'Edit Task' : 'New Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  minHeight: '100px'
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Status:
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="todo">To Do</option>
                <option value="doing">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Priority:
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Tags (comma-separated):
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#333' }}>
              Due Date:
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>
          <div style={{
            height: '2px',
            background: '#33384a',
            margin: '2rem 0'
          }} />

          {/* Comments Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#90caf9', marginBottom: '1rem' }}>Comments</h3>
            <div style={{
              maxHeight: '150px',
              overflowY: 'auto',
              paddingRight: '10px',
              marginBottom: '1rem'
            }}>
              {task?.comments && task.comments.length > 0 ? (
                task.comments.map((c, index) => (
                  <div key={index} style={{
                    background: '#181c24',
                    padding: '10px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                  }}>
                    <p style={{ margin: 0, color: '#fff', fontSize: 14 }}>{c.text}</p>
                    <p style={{
                      margin: '4px 0 0',
                      color: '#b0b8c1',
                      fontSize: 12,
                      textAlign: 'right'
                    }}>
                      - {c.author} on {new Date(c.date).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: '#b0b8c1', fontSize: 14, textAlign: 'center' }}>No comments yet.</p>
              )}
            </div>
            {task && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    flex: 1,
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  style={{
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '4px',
                    background: '#64b5f6',
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                background: '#1976d2',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
