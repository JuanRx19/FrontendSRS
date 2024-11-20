
import TablaReservas from './Tabla';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { jsPDF } from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Opcional: para tablas en el PDF

const Reporte = () => {

    const [reportes, setReportes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para obtener los reportes
        const obtenerReportes = async () => {
        try {
            const response = await axios.get('http://localhost:5108/api/Reportes/ObtenerReportes', {
            headers: {
                'Accept': 'application/json',
            },
            });

            // Asumiendo que la respuesta es texto plano
            // Si esperas JSON, ajusta el procesamiento según sea necesario
            setReportes(response.data);
        } catch (err) {
            setError(err.message || 'Error al obtener los reportes');
        } finally {
            setLoading(false);
        }
        };

        obtenerReportes();
    }, []); // El arreglo vacío asegura que la solicitud se realice una vez al montar el componente

    const formatearFecha = (fecha) => {
        try {
          return format(new Date(fecha), 'dd/MM/yyyy HH:mm:ss');
        } catch {
          return 'Fecha inválida';
        }
      };
    
    const descargarPDF = (reporte) => {
        const doc = new jsPDF();

        // Título del PDF
        doc.setFontSize(18);    
        doc.text('Reporte Detallado', 14, 22);

        // Información del Reporte
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        const datosReporte = [
            ['ID', reporte.reporteID],
            ['Título', reporte.titulo],
            ['Descripción', reporte.descripcion],
            ['Fecha Reporte', formatearFecha(reporte.fechaReporte)],
            ['Usuario', reporte.nombreUsuario],
            ['Fecha Reserva', formatearFecha(reporte.fechaReserva)],
            ['Fecha Inicio', formatearFecha(reporte.fechaInicio)],
            ['Fecha Fin', formatearFecha(reporte.fechaFin)],
            ['Estado', reporte.estado],
            ['Tipo Alerta', reporte.tipoAlerta || 'N/A'],
            ['Nombre Dispositivo', reporte.nombreDispositivo],
            ['Tipo Dispositivo', reporte.tipoDispositivo],
        ];

        // Añadir tabla de datos al PDF
        doc.autoTable({
            startY: 30,
            head: [['Campo', 'Valor']],
            body: datosReporte,
            theme: 'grid',
            styles: {   cellPadding: 3, 
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    fillColor: [68, 68, 68],
                },
            headStyles: {   fillColor: [68, 68, 68], 
                    textColor: [240, 240, 240] 
                }, // Estilo del encabezado
            bodyStyles: { 
                    textColor: [240, 240, 240] 
                }, // Estilo del cuerpo
            columnStyles: {
                0: { fontStyle: 'bold', cellWidth: 40 },
                1: { cellWidth: 120 },
                },
            tableLineColor: [51, 51, 51]
        });

        // Pie de página o cualquier otra información adicional
        const paginaActual = doc.internal.getNumberOfPages();
        const totalPaginas = paginaActual;
        doc.setFontSize(10);
        doc.text(`Página ${paginaActual} de ${totalPaginas}`, 14, doc.internal.pageSize.height - 10);

        // Guardar el PDF con un nombre basado en el reporteID
        doc.save(`Reporte_${reporte.reporteID}.pdf`);
    };

    if (loading) return <p>Cargando reportes...</p>;
    if (error) return <p>Error: {error}</p>;

    return(
        <div>
            <TablaReservas datos={reportes} descargarPDF={descargarPDF}></TablaReservas>
        </div>
    );
};

export default Reporte