import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ListView from './pages/ListView';
import GalleryView from './pages/GalleryView';
import DetailView from './pages/DetailView';
import HomePage from './pages/HomePage';
import './App.css';
import 'normalize.css';

function App() {
  return (
    <Router basename="/mp2">
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<ListView />} />
            <Route path="/gallery" element={<GalleryView />} />
            <Route path="/pokemon/:id" element={<DetailView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
