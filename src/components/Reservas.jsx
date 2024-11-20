import { useState, useEffect } from "react";
import Select from "react-select";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Tooltip,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import axios from "axios";

const Reservas = () => {
  const [dispositivos, setDispositivos] = useState([
    { id: 1, nombre: "Robot A", tipo: "Robot", estado: "Disponible", porcentajeUso: 30 },
    { id: 2, nombre: "Drone B", tipo: "Drone", estado: "Disponible", porcentajeUso: 90 },
    { id: 3, nombre: "Robot C", tipo: "Robot", estado: "Disponible", porcentajeUso: 60 },
  ]);

  const [reservas, setReservas] = useState([
    { dispositivo: "Robot A", fecha: "2024-11-20", hora: "10:00" },
    { dispositivo: "Drone B", fecha: "2024-11-20", hora: "14:30" },
    { dispositivo: "Robot C", fecha: "2024-11-21", hora: "09:00" },
  ]);

  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [filtroHora, setFiltroHora] = useState(null);
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5108/api/Inventario/GetInventario");
        const data = response.data.map((item, index) => ({
          id: index + 1,
          nombre: item.nombre,
          tipo: item.tipo.toUpperCase(),
          estado: "Disponible", // Inicializamos el estado como "Disponible"
          porcentajeUso: item.bateria, // Si batería no existe, usa un valor predeterminado o cámbialo
          ubicacion: item.ubicacionActual,
        }));
        setDispositivos(data);
      } catch (error) {
        console.error("Error al obtener datos del backend:", error);
      }
    };
  
    fetchData();
  }, []);

  const handleBusquedaChange = (e) => setBusqueda(e.target.value);

  const handleFiltroFechaChange = (e) => {
    setFiltroFecha(e.target.value);
  };

  const handleHoraChange = (selectedOption) => {
    setFiltroHora(selectedOption?.value || null);
  };

  const limpiarFiltros = () => {
    setFiltroFecha("");
    setFiltroHora(null);
  };

  const reservarDispositivo = () => {
    if (seleccionado && filtroFecha && filtroHora) {
      const existeReserva = reservas.some(
        (r) =>
          r.dispositivo === seleccionado.nombre &&
          r.fecha === filtroFecha &&
          r.hora === filtroHora
      );
      if (existeReserva) {
        alert("El dispositivo ya está reservado en esta fecha y hora.");
        return;
      }
  
      // Actualizamos las reservas
      setReservas([
        ...reservas,
        { dispositivo: seleccionado.nombre, fecha: filtroFecha, hora: filtroHora },
      ]);
  
      // Actualizamos el estado del dispositivo
      setDispositivos((prevDispositivos) =>
        prevDispositivos.map((dispositivo) =>
          dispositivo.id === seleccionado.id
            ? { ...dispositivo, estado: "Reservado" }
            : dispositivo
        )
      );
  
      alert(`Reserva confirmada para ${seleccionado.nombre} el ${filtroFecha} a las ${filtroHora}`);
      setSeleccionado(null);
    } else {
      alert("Por favor selecciona un dispositivo, fecha y hora antes de reservar.");
    }
  };  

  const generarOpcionesHora = () => {
    const opciones = [];
    for (let h = 0; h < 24; h++) {
      opciones.push(
        { value: `${String(h).padStart(2, "0")}:00`, label: `${String(h).padStart(2, "0")}:00` },
        { value: `${String(h).padStart(2, "0")}:30`, label: `${String(h).padStart(2, "0")}:30` }
      );
    }
    return opciones;
  };

  const dispositivosFiltrados = dispositivos.map((dispositivo) => {
    const reservado = reservas.some(
      (r) =>
        r.dispositivo === dispositivo.nombre &&
        r.fecha === filtroFecha &&
        r.hora === filtroHora
    );
    return {
      ...dispositivo,
      estado: reservado ? "Reservado" : "Disponible",
    };
  });

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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: 4, backgroundColor: "background.default" }}>
        {/* Barra Superior */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <TextField
            variant="outlined"
            placeholder="Buscar dispositivos"
            size="small"
            value={busqueda}
            onChange={handleBusquedaChange}
            sx={{
              backgroundColor: "#1e1e1e",
              borderRadius: "5px",
              width: "300px",
              color: "#fff",
            }}
            InputProps={{
              startAdornment: (
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "10px", color: "#b0bec5" }}
                />
              ),
            }}
          />
          <Box display="flex" gap={2} alignItems="center">
  {/* Campo de Fecha */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <TextField
      name="fecha"
      label="Fecha"
      type="date"
      InputLabelProps={{ shrink: true }}
      value={filtroFecha}
      onChange={handleFiltroFechaChange}
      sx={{
        width: "250px",
        backgroundColor: "#1e1e1e",
        borderRadius: "5px",
        "& .MuiOutlinedInput-root": {
          color: "text.primary",
          border: "1px solid #424242",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiInputLabel-root": { color: "text.secondary" },
      }}
    />
  </motion.div>

  {/* Selector de Hora */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Select
      options={generarOpcionesHora()}
      value={filtroHora ? { value: filtroHora, label: filtroHora } : null}
      onChange={handleHoraChange}
      placeholder="Seleccionar Hora"
      styles={{
        control: (base) => ({
          ...base,
          width: "250px",
          backgroundColor: "#1e1e1e",
          color: "#fff",
          border: "1px solid #424242",
          borderRadius: "5px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          padding: "5px",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#1e1e1e",
          color: "#fff",
          borderRadius: "5px",
        }),
        option: (base, { isFocused }) => ({
          ...base,
          backgroundColor: isFocused ? "#1976d2" : "#1e1e1e",
          color: isFocused ? "#fff" : "#b0bec5",
          padding: 10,
        }),
        singleValue: (base) => ({
          ...base,
          color: "#fff",
        }),
      }}
    />
  </motion.div>

  {/* Botón de Limpiar */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Button
      variant="outlined"
      color="secondary"
      onClick={limpiarFiltros}
      sx={{
        height: "50px",
        alignSelf: "flex-start",
        textTransform: "none",
      }}
    >
      Limpiar filtros
    </Button>
  </motion.div>
</Box>

        </Box>

        <Grid container spacing={3}>
          {/* Panel de Disponibilidad */}
          <Grid item xs={12}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Card sx={{ backgroundColor: "background.paper", boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: "text.primary" }}>
                    Disponibilidad de Dispositivos
                  </Typography>
                  <DataGrid
                    rows={dispositivosFiltrados.filter((dispositivo) =>
                      busqueda
                        ? dispositivo.nombre.toLowerCase().includes(busqueda.toLowerCase())
                        : true
                    )}
                    columns={[
                      { field: "id", headerName: "ID", width: 50 },
                      { field: "nombre", headerName: "Dispositivo", width: 200 },
                      { field: "tipo", headerName: "Tipo", width: 150 },
                      {
                        field: "estado",
                        headerName: "Estado",
                        width: 150,
                        renderCell: (params) => (
                          <Tooltip title={params.row.estado}>
                            <FontAwesomeIcon
                              icon={
                                params.row.estado === "Disponible"
                                  ? faCheckCircle
                                  : faTimesCircle
                              }
                              style={{
                                color:
                                  params.row.estado === "Disponible" ? "limegreen" : "#d32f2f",
                              }}
                            />
                          </Tooltip>
                        ),
                      },
                      {
                        field: "porcentajeUso",
                        headerName: "Batería (%)",
                        width: 150,
                        renderCell: (params) => (
                          <Tooltip title={`${params.row.porcentajeUso}%`}>
                            <Box
                              display="flex"
                              alignItems="center"
                              width="100%"
                              height="100%"
                            >
                              <Box
                                sx={{
                                  width: "100%",
                                  height: "10px",
                                  backgroundColor: "#424242",
                                  borderRadius: "5px",
                                  overflow: "hidden",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: `${params.row.porcentajeUso}%`,
                                    height: "100%",
                                    backgroundColor:
                                      params.row.porcentajeUso > 75
                                      ? "limegreen"
                                      : params.row.porcentajeUso > 30
                                      ? "yellow"
                                      : "red",
                                  }}
                                />
                              </Box>
                            </Box>
                          </Tooltip>
                        ),
                      },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    disableSelectionOnClick
                    onRowClick={(params) => setSeleccionado(params.row)}
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={reservarDispositivo}
                    sx={{ mt: 2 }}
                    disabled={!seleccionado || !filtroFecha || !filtroHora}
                  >
                    Reservar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Reservas;
