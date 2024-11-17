import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Alertas() {
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/alertas/notificaciones')
            .then(response => setAlertas(response.data))
            .catch(error => console.error('Error fetching alerts:', error));
    }, []);

    return (
        <div className="alert-container">
            <h3>Alertas Críticas</h3>
            {alertas.map((alerta, index) => (
                <div key={index} className={`alert alert-${alerta.criticidad.toLowerCase()}`}>
                    {alerta.mensaje}
                </div>
            ))}
        </div>
    );
}

export default Alertas;
