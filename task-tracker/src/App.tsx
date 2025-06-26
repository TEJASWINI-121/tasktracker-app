import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MyTasks from './pages/MyTasks';
import ProjectBoard from './pages/ProjectBoard';
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/Settings';
import Projects from './pages/Projects';
import Calendar from './pages/Calendar';
import Team from './pages/Team';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

const AppLayout = () => (
  <div style={{ display: 'flex', minHeight: '100vh', background: '#181c24' }}>
    <Sidebar />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/my-tasks" element={<MyTasks />} />
            <Route path="/project-board" element={<ProjectBoard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;