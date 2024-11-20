import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { motion } from "framer-motion";

// Componente principal
const Grabaciones = () => {
  const [videos, setVideos] = useState([]);
  const [videoSeleccionado, setVideoSeleccionado] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#1976d2" },
      secondary: { main: "#b0bec5" },
      background: { default: "#121212", paper: "#1e1e1e" },
      text: { primary: "#ffffff", secondary: "#b0bec5" },
    },
    typography: {
      fontFamily: "Roboto, Arial, sans-serif",
    },
  });

  const downloadVideo = async (url, fileName) => {
    try {
      const response = await axios.get(url, {
        responseType: "blob", // Para manejar el archivo como un blob
      });
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName || "video.mp4"; // Nombre por defecto si no se proporciona uno
      link.click();
      URL.revokeObjectURL(link.href); // Limpia la memoria
    } catch (error) {
      console.error("Error al descargar el video:", error);
      alert("No se pudo descargar el video. Por favor, inténtalo de nuevo.");
    }
  };
  
  // Función para cargar los datos desde la API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5108/api/Videos/GetVideos");
        const data = response.data.map((video) => ({
          dispositivoNombre: video.dispositivo.nombre || "Sin Asignar",
          ruta: transformYouTubeUrl(video.rutaVideo),
          fecha: new Date(video.fechaGrabacion).toLocaleString(),
          duracion: video.duracion,
          tipo: video.tipo,
          retencion: video.retencion || "No especificado",
        }));
        setVideos(data);
      } catch (error) {
        console.error("Error al cargar los videos:", error);
      }
    };
    
    // Función para transformar la URL
    const transformYouTubeUrl = (url) => {
      if (url.includes("youtube.com/watch")) {
        const videoId = url.split("v=")[1].split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url; // Devolver la URL sin cambios si no es de YouTube
    };
    

    fetchVideos();
  }, []);

  const columns = [
    { field: "dispositivoNombre", headerName: "Nombre del Dispositivo", width: 200 },
    { field: "ruta", headerName: "Ruta del Video", width: 300 },
    { field: "fecha", headerName: "Fecha de Grabación", width: 200 },
    { field: "duracion", headerName: "Duración", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 150 },
    { field: "retencion", headerName: "Retención", width: 180 },
    {
      field: "acciones",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setVideoSeleccionado(params.row.ruta)}
          >
            Ver Video
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: 4, backgroundColor: "background.default" }}>
        <Grid container spacing={3}>
          {/* Tabla de videos */}
          <Grid item xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card
                sx={{
                  backgroundColor: "background.paper",
                  boxShadow: 5,
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                    Lista de Videos
                  </Typography>
                  <DataGrid
                    rows={videos.map((video, index) => ({ id: index + 1, ...video }))}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    sx={{
                      height: 400,
                      borderRadius: 2,
                      "& .MuiDataGrid-root": {
                        border: "none",
                        color: "text.primary",
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #424242",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#333",
                        color: "#fff",
                      },
                      "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#333",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Reproductor de video */}
          {videoSeleccionado && (
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  sx={{
                    backgroundColor: "background.paper",
                    boxShadow: 5,
                    borderRadius: 2,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                      Reproduciendo Video
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                        height: 300,
                        backgroundColor: "#000",
                        margin: "0 auto",
                      }}
                    >
                      <iframe
                        src={videoSeleccionado}
                        style={{ width: "100%", height: "100%", border: "none" }}
                        title="Video Player"
                        allowFullScreen
                      ></iframe>
                    </Box>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ mt: 2 }}
                      onClick={() => setVideoSeleccionado(null)}
                    >
                      Cerrar Reproductor
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Grabaciones;
