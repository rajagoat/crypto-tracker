import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}

        <Routes>
          <Route exact path='/' element={<Home />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
