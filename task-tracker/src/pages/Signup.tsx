import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg('');
    try {
      await register(username, password);
      setMsg('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignup}
      style={{
        maxWidth: 320,
        margin: '2rem auto',
        background: '#232733',
        padding: 24,
        borderRadius: 10,
      }}
    >
      <h2 style={{ color: '#90caf9' }}>Sign Up</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
        style={{ width: '100%', margin: '8px 0', padding: 8 }}
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{ width: '100%', margin: '8px 0', padding: 8 }}
      />
      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          padding: 10,
          background: isLoading ? '#666' : '#42a5f5',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          cursor: isLoading ? 'not-allowed' : 'pointer',
        }}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </button>
      <div
        style={{
          color: msg.includes('successful') ? '#4caf50' : '#ff6b6b',
          marginTop: 10,
        }}
      >
        {msg}
      </div>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <span style={{ color: '#b0b8c1' }}>Already have an account? </span>
        <Link to="/login" style={{ color: '#42a5f5' }}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default Signup;