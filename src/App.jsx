import React from 'react';
// CHANGE 1: Import HashRouter instead of BrowserRouter
import { HashRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';

function App() {
  return (
    // CHANGE 2: Use HashRouter here
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </HashRouter>
  );
}

export default App;