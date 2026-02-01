import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import LessonBuilder from './pages/LessonBuilder';
import Editor from './pages/Editor';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson-builder" element={<LessonBuilder />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </HashRouter>
  );
}

export default App;