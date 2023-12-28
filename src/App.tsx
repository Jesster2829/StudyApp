import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login} from './Components/Pages/Login';
import { Home } from './Components/Pages/Home';

import './App.css';
import { Calendar } from './Components/Pages/CalendarPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homePage" element={<Home />} />
            <Route path="/calendarPage" element={<Calendar />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
