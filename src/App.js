// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DriverDashboard from './pages/DriverDashboard';
// ← імпортуємо як default-експорт
import PassengerDashboard from './pages/PassengerDashboard';


function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h1>Вітаємо у Вараш Таксі</h1>
      <p>Оберіть свій кабінет:</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        <Link to="/driver">
          <button style={{ padding: '10px 20px' }}>Я Водій</button>
        </Link>
        <Link to="/passenger">
          <button style={{ padding: '10px 20px' }}>Я Пасажир</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: 10, background: '#eee' }}>
        <Link to="/" style={{ marginRight: 10 }}>
          Головна
        </Link>
        <Link to="/driver" style={{ marginRight: 10 }}>
          Кабінет водія
        </Link>
        <Link to="/passenger">
          Кабінет пасажира
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/driver" element={<DriverDashboard />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
