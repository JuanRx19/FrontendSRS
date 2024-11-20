import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventario from './components/Inventario';
import Usuarios from './components/Usuarios';
import Reservas from './components/Reservas';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio contentComponent={Login} nameComponent={'Inicio'}/>}/>
        <Route path="/Inventario" element={<Inicio contentComponent={Inventario} nameComponent={'Inventario'}/>}/>
        <Route path="/Usuarios" element={<Inicio contentComponent={Usuarios} nameComponent={'Usuarios'}/>}/>
        <Route path="/Reservas" element={<Inicio contentComponent={Reservas} nameComponent={'Reservas'}/>}/>
      </Routes>
      </Router>
  );
}

export default App;
