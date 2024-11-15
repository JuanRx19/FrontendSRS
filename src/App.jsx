import Login from './components/Login'
import './App.css'
import Inicio from './components/Inicio'
import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventario from './components/Inventario';
import Usuarios from './components/Usuarios';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/Inicio" element={<Inicio contentComponent={Login} nameComponent={'Inicio'}/>}/>
        <Route path="/Inventario" element={<Inicio contentComponent={Inventario} nameComponent={'Inventario'}/>}/>
        <Route path="/Usuarios" element={<Inicio contentComponent={Usuarios} nameComponent={'Usuarios'}/>}/>
      </Routes>
    </Router>
}

export default App;
