import React from 'react';
import PropTypes from 'prop-types';
import './../assets/styles/TablaReporte.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";

const TablaReservas = ({ datos, descargarPDF }) => {
  return (
    <table className="tabla-reservas">
      <thead>
        <tr>
          <th className='numero'>ID</th>
          <th>Fecha Reporte</th>
          <th>Usuario</th>
          <th>Fecha Reserva</th>
          <th>Fecha Inicio</th>
          <th>Fecha Fin</th>
          <th>Estado</th>
          <th>Tipo Alerta</th>
          <th>Nombre Dispositivo</th>
          <th>Tipo Dispositivo</th>
          <th>Exportar</th>
        </tr>
      </thead>
      <tbody>
      {datos.map((reporte) => (
            <tr key={reporte.reporteID}>
              <td>{reporte.reporteID}</td>
              <td>{new Date(reporte.fechaReporte).toLocaleString()}</td>
              <td>{reporte.nombreUsuario}</td>
              <td>{new Date(reporte.fechaReserva).toLocaleString()}</td>
              <td>{new Date(reporte.fechaInicio).toLocaleString()}</td>
              <td>{new Date(reporte.fechaFin).toLocaleString()}</td>
              <td>{reporte.estado}</td>
              <td>{reporte.tipoAlerta || 'N/A'}</td>
              <td>{reporte.nombreDispositivo}</td>
              <td>{reporte.tipoDispositivo}</td>
              <td>
                <button className="botonDescargar" onClick={() => descargarPDF(reporte)}>
                  <FontAwesomeIcon icon={faFilePdf} />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

TablaReservas.propTypes = {
  datos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      dispositivo: PropTypes.string.isRequired,
      usuario: PropTypes.string.isRequired,
      fechaReserva: PropTypes.string.isRequired,
      numeroAlertas: PropTypes.number.isRequired,
      estado: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TablaReservas;