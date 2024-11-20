import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/Alertas.css"; // Archivo CSS adicional para estilos personalizados

const Alertas = () => {
    const [alertas, setAlertas] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [mostrarNotificacion, setMostrarNotificacion] = useState(false);

    // Funcion para agregar una alerta de bateria baja
    const agregarAlertaBateria = () => {
        const nuevaAlerta = {
            AlertaId: alertas.length + 1, // Generamos un ID secuencial
            Mensaje: "Bateria baja",      // Mensaje estatco
            Criticidad: "Alta",           // Nivel de criticidad estatco
            FechaCreacion: new Date(),    // Fecha de creacion actual
        };

        // Agregar la nueva alerta al estado
        setAlertas([...alertas, nuevaAlerta]);

        // Mostrar la notificacion de exito
        setMensaje("Alerta generada: Bateria baja.");
        setMostrarNotificacion(true);
    };

    // Funcion para agregar una alerta de clima lluvioso
    const agregarAlertaClimaLluvioso = () => {
        const nuevaAlerta = {
            AlertaId: alertas.length + 1, // Generamos un ID secuencial
            Mensaje: "Clima lluvioso",     // Mensaje para clima lluvioso
            Criticidad: "Media",           // Nivel de criticidad para clima lluvioso
            FechaCreacion: new Date(),     // Fecha de creacion actual
        };

        // Agregar la nueva alerta al estado
        setAlertas([...alertas, nuevaAlerta]);

        // Mostrar la notificacion de exito
        setMensaje("Alerta generada: Clima lluvioso.");
        setMostrarNotificacion(true);
    };

    // Funcion para cerrar la notificacion
    const cerrarNotificacion = () => {
        setMostrarNotificacion(false); // Ocultar la notificacion
    };

    return (
        <div className="container mt-5">

            {/* Boton para simular bateria baja */}
            <button
                className="btn btn-bateria mb-3"
                onClick={agregarAlertaBateria}
            >
                Simular Bateria Baja
            </button>

            {/* Boton para simular clima lluvioso */}
            <button
                className="btn btn-lluvia mb-3"
                onClick={agregarAlertaClimaLluvioso}
            >
                Simular Clima Lluvioso
            </button>

            {/* Notificacion push */}
            {mostrarNotificacion && (
                <div className="notificacion">
                    <span>{mensaje}</span>
                    <button className="close-btn" onClick={cerrarNotificacion}>
                        X
                    </button>
                </div>
            )}

            {/* Tabla de alertas */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mensaje</th>
                        <th>Criticidad</th>
                        <th>Fecha de Creacion</th>
                    </tr>
                </thead>
                <tbody>
                    {alertas.length > 0 ? (
                        alertas.map((alerta) => (
                            <tr key={alerta.AlertaId}>
                                <td>{alerta.AlertaId}</td>
                                <td>{alerta.Mensaje}</td>
                                <td>{alerta.Criticidad}</td>
                                <td>{new Date(alerta.FechaCreacion).toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay alertas disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Alertas;
