import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
