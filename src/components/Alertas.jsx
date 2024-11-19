import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Alertas() {
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {
        const obtenerAlertas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/alertas/notificaciones');
                setAlertas(response.data);
            } catch (error) {
                console.error('Error al obtener alertas:', error);
            }
        };
        obtenerAlertas();
    }, []);

    return (
        <div className="container mt-4">
            <h3>Alertas Críticas</h3>
            {alertas.map((alerta) => (
                <div key={alerta.id} className={`alert alert-${alerta.criticidad.toLowerCase()}`}>
                    <strong>{alerta.mensaje}</strong>
                    <p className="text-muted">{new Date(alerta.fechaCreacion).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
}

export default Alertas;
