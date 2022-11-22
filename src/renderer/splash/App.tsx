import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const [progress, setProgress] = useState<number>(0);

  window.electron.ipcRenderer.on('window:splash', (event, p) => {
    // eslint-disable-next-line default-case
    switch (event) {
      case 'progress':
        setProgress(p);
        break;
    }
  });

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <progress max={100} value={progress} />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
