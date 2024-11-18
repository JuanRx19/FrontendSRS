import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventario from './components/Inventario';
import Usuarios from './components/Usuarios';
import WeatherDashboard from './components/WeatherDashboard';

function App() {

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio contentComponent={WeatherDashboard} nameComponent={'Inicio'}/>}/>
        <Route path="/Inventario" element={<Inicio contentComponent={Inventario} nameComponent={'Inventario'}/>}/>
        <Route path="/Usuarios" element={<Inicio contentComponent={Usuarios} nameComponent={'Usuarios'}/>}/>
      </Routes>
      </Router>
  );
}

export default App;
