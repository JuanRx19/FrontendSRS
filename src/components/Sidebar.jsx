import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxArchive, faUser, faCog, faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Sidebar.css"; // Archivo CSS adicional

const Sidebar = ({ onToggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    onToggleSidebar(!isExpanded); // Notifica al Dashboard el nuevo estado
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faArrowUpWideShort} />
      </div>

      <div className="nav-items">
        <div className="nav-item">
          <FontAwesomeIcon icon={faHome} />
          {isExpanded && <span>Inicio</span>}
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faBoxArchive} />
          {isExpanded && <span>Inventario</span>}
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faUser} />
          {isExpanded && <span>Usuarios</span>}
        </div>
        <div className="nav-item">
          <FontAwesomeIcon icon={faCog} />
          {isExpanded && <span>Configuracion</span>}
        </div>
      </div>

      <div className="nav-leave">
        <div className="nav-leave-item">
          <FontAwesomeIcon icon={faCog} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;