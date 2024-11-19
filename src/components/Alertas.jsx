import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Alertas = () => {
    const [alertas, setAlertas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/alertas')
            .then(response => response.json())
            .then(data => setAlertas(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="container mt-5">
            <h2>Alertas</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mensaje</th>
                        <th>Criticidad</th>
                        <th>Fecha de Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {alertas.map(alerta => (
                        <tr key={alerta.id}>
                            <td>{alerta.id}</td>
                            <td>{alerta.mensaje}</td>
                            <td>{alerta.criticidad}</td>
                            <td>{new Date(alerta.fechaCreacion).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Alertas;
