import './App.css';
import Dashboard from './pages/Dashboard';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' />
        </Routes>
        <Dashboard />
      </div>
    </Router>
  );
}
export default App;
