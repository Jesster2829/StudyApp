import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Components/Pages/Login';
import { Home } from './Components/Pages/Home';

import './App.css';
import { Calendar } from './Components/Pages/CalendarPage';
import { Notes } from './Components/Pages/NotesPage';
import { Flashcards } from './Components/Pages/FlashCardsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homePage" element={<Home />} />
            <Route path="/calendarPage" element={<Calendar />} />
            <Route path="/notesPage" element={<Notes />} />
            <Route path="/flashcardsPage" element={<Flashcards />} />

          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
