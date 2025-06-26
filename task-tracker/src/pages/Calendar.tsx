import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../utils/api';

interface Event {
  _id: string;
  title: string;
  description?: string;
  date: string;
  user: string;
}

const Calendar: React.FC = () => {
  const { token, user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: ''
  });

  // Fetch events from backend
  useEffect(() => {
    if (!token) return;
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const eventsData = await api.getEvents();
      setEvents(eventsData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setFormData({ title: '', description: '', date: '' });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description || '',
      date: event.date.split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    setLoading(true);
    try {
      await api.deleteEvent(eventId);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSave = async () => {
    if (!token || !formData.title || !formData.date) return;
    
    setLoading(true);
    try {
      if (editingEvent) {
        const updated = await api.updateEvent(editingEvent._id, {
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString()
        });
        setEvents(events.map(event => event._id === editingEvent._id ? updated : event));
      } else {
        const created = await api.createEvent({
          title: formData.title,
          description: formData.description,
          date: new Date(formData.date).toISOString()
        });
        setEvents([...events, created]);
      }
      setIsModalOpen(false);
      setFormData({ title: '', description: '', date: '' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({ title: '', description: '', date: '' });
    setError('');
  };

  return (
    <div style={{ padding: '2rem', color: '#e0e0e0' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem' 
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold' }}>Calendar</h1>
        <button
          onClick={handleAddEvent}
          style={{
            background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '0.8rem 1.5rem',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Add Event
        </button>
      </div>

      {loading && (
        <p style={{ textAlign: 'center', color: '#90a4ae', margin: '2rem 0' }}>Loading...</p>
      )}

      {error && (
        <p style={{ textAlign: 'center', color: '#ef5350', margin: '2rem 0' }}>{error}</p>
      )}

      <div style={{ 
        background: '#232733',
        borderRadius: '12px',
        padding: '1.5rem',
        border: '1px solid #33384a'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#fff' }}>Upcoming Events</h2>
        
        {events.length === 0 ? (
          <p style={{ color: '#7f8c8d', textAlign: 'center' }}>No events scheduled. Add your first event!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {events
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(event => (
                <div
                  key={event._id}
                  style={{
                    background: '#2c3e50',
                    borderRadius: '8px',
                    padding: '1rem',
                    border: '1px solid #34495e'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start' 
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: '#fff', 
                        fontSize: '1.1rem'
                      }}>
                        {event.title}
                      </h3>
                      <p style={{ 
                        margin: '0 0 0.5rem 0', 
                        color: '#bdc3c7', 
                        fontSize: '0.9rem'
                      }}>
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {event.description && (
                        <p style={{ 
                          margin: '0', 
                          color: '#95a5a6', 
                          fontSize: '0.9rem'
                        }}>
                          {event.description}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => handleEditEvent(event)}
                        style={{
                          background: '#3498db',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.3rem 0.8rem',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        style={{
                          background: '#e74c3c',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '0.3rem 0.8rem',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {isModalOpen && (
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
            backgroundColor: '#232733',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px',
            border: '1px solid #33384a'
          }}>
            <h2 style={{ 
              margin: '0 0 1.5rem 0', 
              color: '#fff',
              fontSize: '1.5rem'
            }}>
              {editingEvent ? 'Edit Event' : 'New Event'}
            </h2>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontSize: '0.9rem'
              }}>
                Title:
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #33384a',
                    borderRadius: '8px',
                    background: '#181c24',
                    color: '#fff',
                    fontSize: '1rem',
                    marginTop: '0.3rem'
                  }}
                  placeholder="Event title"
                />
              </label>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontSize: '0.9rem'
              }}>
                Description:
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #33384a',
                    borderRadius: '8px',
                    background: '#181c24',
                    color: '#fff',
                    fontSize: '1rem',
                    marginTop: '0.3rem',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Event description (optional)"
                />
              </label>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                color: '#fff',
                fontSize: '0.9rem'
              }}>
                Date:
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '1px solid #33384a',
                    borderRadius: '8px',
                    background: '#181c24',
                    color: '#fff',
                    fontSize: '1rem',
                    marginTop: '0.3rem'
                  }}
                />
              </label>
            </div>

            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'flex-end' 
            }}>
              <button
                onClick={handleModalClose}
                style={{
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                disabled={!formData.title || !formData.date}
                style={{
                  background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.8rem 1.5rem',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  opacity: (!formData.title || !formData.date) ? 0.6 : 1
                }}
              >
                {editingEvent ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
);
};

export default Calendar; 