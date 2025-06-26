import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import { Task } from '../types';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import TaskStatusChart from '../components/TaskStatusChart';
import RecentActivity from '../components/RecentActivity';
import image from '../assets/image.png';

const AuthenticatedDashboard: React.FC = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
  
    useEffect(() => {
        api.getEvents().then(setTasks).catch(console.error);
    }, []);

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#181c24' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', color: '#fff' }}>
                <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>
                    <div style={{
                        position: 'relative', height: '350px', width: '100%', borderRadius: '12px',
                        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${image})`,
                        backgroundSize: 'cover', backgroundPosition: 'center', marginBottom: '2rem',
                        padding: '2rem', boxSizing: 'border-box'
                    }}>
                        <div style={{ zIndex: 2 }}>
                            <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: 800, color: '#fff' }}>Welcome, {user?.username}</h1>
                            <p style={{ margin: '1.2rem 0 0', fontSize: '1.35rem', color: '#e3f2fd' }}>Here's a quick overview of your workspace.</p>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <TaskStatusChart tasks={tasks} />
                        <RecentActivity />
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
};

const GuestHomepage: React.FC = () => (
    <div style={{
        background: '#181c24', color: '#fff', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center', padding: '2rem'
    }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>Welcome to TaskTracker</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', maxWidth: '600px', opacity: 0.8 }}>
            The ultimate solution for managing tasks and boosting productivity.
        </p>
        <div>
            <Link to="/login" style={{
                background: '#42a5f5', color: '#fff', padding: '1rem 2rem', borderRadius: 8,
                textDecoration: 'none', fontSize: '1.2rem', margin: '0 1rem'
            }}>Log In</Link>
            <Link to="/signup" style={{
                background: '#fff', color: '#181c24', padding: '1rem 2rem', borderRadius: 8,
                textDecoration: 'none', fontSize: '1.2rem', margin: '0 1rem', fontWeight: 'bold'
            }}>Sign Up</Link>
        </div>
    </div>
);

const Home: React.FC = () => {
    const { user } = useAuth();
    return user ? <AuthenticatedDashboard /> : <GuestHomepage />;
};

export default Home;