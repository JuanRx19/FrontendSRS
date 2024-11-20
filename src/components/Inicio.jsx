import "../assets/styles/Inicio.css";
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import Sidebar from "./SideBar.jsx";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import PropTypes from "prop-types";

const Inicio = ({ contentComponent: ContentComponent, nameComponent: NameComponent }) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");

  const handleToggleSidebar = (isExpanded) => {
    setIsSidebarExpanded(isExpanded);
  };

  useEffect(() => {
    const updateCurrentDateTime = () => {
      const now = new Date();
      const options = {
        weekday: "short", // Día de la semana abreviado
        day: "2-digit",   // Día en dos dígitos
        month: "short",   // Mes abreviado
        hour: "2-digit",  // Hora en dos dígitos
        minute: "2-digit" // Minutos en dos dígitos
      };
      setCurrentDateTime(now.toLocaleString("es-ES", options));
    };

    updateCurrentDateTime(); // Actualizar inmediatamente al cargar el componente

    // Calcular el tiempo restante hasta el próximo minuto exacto
    const now = new Date();
    const millisecondsUntilNextMinute = (60 - now.getSeconds()) * 1000;

    // Establecer un temporizador inicial para sincronizar con el próximo minuto exacto
    const initialTimeout = setTimeout(() => {
      updateCurrentDateTime(); // Actualizar al inicio del próximo minuto
      setInterval(updateCurrentDateTime, 60000); // Luego actualizar cada minuto
    }, millisecondsUntilNextMinute);

    return () => {
      clearTimeout(initialTimeout); // Limpiar el temporizador inicial
    };
  }, []);

  return (
    <div className="contenedor-inicio">
      <Container fluid className="dashboard-container vh-100 d-flex p-0">
        {/* Sidebar */}
        <div className={`sidebar-container ${isSidebarExpanded ? "expanded" : "collapsed"}`}>
          <Sidebar onToggleSidebar={handleToggleSidebar} />
        </div>

        {/* Main Content */}
        <Col className={`main-content ${isSidebarExpanded ? "content-expanded" : "content-collapsed"} h-100 overflow-auto`}>
          {/* Header */}
          <Row className="mb-4">
            <Col className="titulo-inicial">
              <h2>{NameComponent}</h2>
              <p>{currentDateTime}</p>
            </Col>
            <Col className="text-end">
              <span>Tatiana Herwitz</span>
              <img
                src="https://via.placeholder.com/40"
                alt="User"
                className="rounded-circle ms-2"
              />
            </Col>
          </Row>

          {/* Content */}
          {ContentComponent ? <ContentComponent /> : <p>No hay ningún elemento</p>}
        </Col>
        <Toaster theme="dark" position="bottom-center" />
      </Container>
    </div>
  );
};

Inicio.propTypes = {
  contentComponent: PropTypes.elementType,
  nameComponent: PropTypes.string,
};

export default Inicio;
