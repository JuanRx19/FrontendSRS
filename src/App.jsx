import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventario from './components/Inventario';
import Usuarios from './components/Usuarios';
import WeatherDashboard from './components/WeatherDashboard';
import Alertas from './components/Alertas';

function App() {

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio contentComponent={WeatherDashboard} nameComponent={'Inicio'}/>}/>
        <Route path="/Inventario" element={<Inicio contentComponent={Inventario} nameComponent={'Inventario'}/>}/>
        <Route path="/Usuarios" element={<Inicio contentComponent={Usuarios} nameComponent={'Usuarios'}/>}/>
        <Route path="/Alertas" element={<Inicio contentComponent={Alertas} nameComponent={'Alertas'} />} />
      </Routes>
      </Router>
  );
}

export default App;
