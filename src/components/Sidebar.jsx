import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxArchive, faUser, faCog, faArrowUpWideShort, faFile, faCalendarCheck, faBell, faVideo } from "@fortawesome/free-solid-svg-icons";
import "../assets/styles/Sidebar.css"; // Archivo CSS adicional
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ onToggleSidebar }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();
    
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
        onToggleSidebar(!isExpanded); // Notifica al Dashboard el nuevo estado
    };

    return (
        <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
            {/* Bot�n para expandir/colapsar */}
            <div className="toggle-btn" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faArrowUpWideShort} />
            </div>

      <div className="nav-items">
        <Link to="/Inicio" className="link-no-style">
          <div className="nav-item">
            <FontAwesomeIcon icon={faHome} />
            {isExpanded && <span>Inicio</span>}
          </div>
        </Link>
        <Link to="/Inventario" className="link-no-style">
          <div className="nav-item">
          
            <FontAwesomeIcon icon={faBoxArchive} />
            {isExpanded && <span>Inventario</span>}
          </div>
        </Link>
        <Link to="/Reporte" className="link-no-style">
          <div className="nav-item">
          
            <FontAwesomeIcon icon={faFile} />
            {isExpanded && <span>Reportes</span>}
          </div>
        </Link>
        <Link to="/Usuarios" className="link-no-style">
          <div className="nav-item">
            <FontAwesomeIcon icon={faUser} />
            {isExpanded && <span>Usuarios</span>}
          </div>
        </Link>
        <Link to="/Reservas" className="link-no-style">
          <div className="nav-item">
            <FontAwesomeIcon icon={faCalendarCheck} />
            {isExpanded && <span>Reservas</span>}
          </div>
        </Link>
        <Link to="/Alertas" className="link-no-style">
            <div className="nav-item">
                <FontAwesomeIcon icon={faBell} />
                {isExpanded && <span>Alertas</span>}
            </div>
        </Link>
        <Link to="/Grabaciones" className="link-no-style">
            <div className="nav-item">
                <FontAwesomeIcon icon={faVideo} />
                {isExpanded && <span>Grabaciones</span>}
            </div>
        </Link>
      </div>

      <div className="nav-leave">
        <DropdownButton
          as={ButtonGroup}
          title={<FontAwesomeIcon icon={faCog} style={{ color: 'white', fontSize: '1.5rem'}} />}
          id="bg-nested-dropdown"
          variant="none"
        >
        <Dropdown.Item onClick={() => navigate("/")}>Salir</Dropdown.Item>
      </DropdownButton>
      </div>

      
      
    </div>
  );
};

Sidebar.propTypes = {
    onToggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
