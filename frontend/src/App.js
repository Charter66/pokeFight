import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Arena from './pages/props/Arena';
import './App.css';

function App() {




  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route path="*" element={<NotFound />} />
          <Route exact path="/pokemon/:id/arena" element={<Arena  />} />

        </Routes>
      </div>
    </Router>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

export default App;
