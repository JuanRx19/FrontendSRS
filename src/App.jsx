import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventario from './components/Inventario';
import Usuarios from './components/Usuarios';
import WeatherDashboard from './components/WeatherDashboard';
import Alertas from './components/Alertas';
import Reservas from './components/Reservas';
import Reporte from './components/Reporte';

function App() {

  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio contentComponent={WeatherDashboard} nameComponent={'Inicio'}/>}/>
        <Route path="/Inventario" element={<Inicio contentComponent={Inventario} nameComponent={'Inventario'}/>}/>
        <Route path="/Reporte" element={<Inicio contentComponent={Reporte} nameComponent={'Reporte'}/>}/>
        <Route path="/Usuarios" element={<Inicio contentComponent={Usuarios} nameComponent={'Usuarios'}/>}/>
        <Route path="/Alertas" element={<Inicio contentComponent={Alertas} nameComponent={'Alertas'} />} />
        <Route path="/Reservas" element={<Inicio contentComponent={Reservas} nameComponent={'Reservas'}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
