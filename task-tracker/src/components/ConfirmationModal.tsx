import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#232733',
        padding: '2rem',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        border: '1px solid #33384a',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: '0 0 1rem', color: '#fff', fontSize: 22 }}>
          {title}
        </h2>
        <p style={{ color: '#b0b8c1', marginBottom: '2rem', fontSize: 16, lineHeight: 1.6 }}>
          {message}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: '1px solid #33384a',
              borderRadius: '8px',
              background: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 500
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              background: '#e53935',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 16,
              fontWeight: 600
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal; 