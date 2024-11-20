import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, TextField, IconButton, Tabs, Tab, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CssBaseline, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import CreateDeviceModal from "./CreateDeviceModal";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#8fa7f4",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const Inventario = () => {
  const [rows, setRows] = useState([]); // Estado para almacenar dispositivos
  const [searchQuery, setSearchQuery] = useState(""); // Estado para búsqueda
  const [selectedType, setSelectedType] = useState("all"); // Estado para filtro por tipo
  const [openModal, setOpenModal] = useState(false); // Estado para abrir/cerrar el modal

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5108/api/Inventario/GetInventario");
      const data = response.data.map((item, index) => ({
        id: index + 1,
        name: item.nombre,
        type: item.tipo.toUpperCase(),
        state: item.estado,
        battery: item.bateria,
        location: item.ubicacionActual,
      }));
      setRows(data);
    } catch (error) {
      console.error("Error al obtener datos del backend:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log("Editar dispositivo:", row);
    toast.info(`Editar dispositivo: ${row.name}`);
  };

  const handleDelete = (row) => {
    console.log("Eliminar dispositivo:", row);
    toast.error(`Eliminar dispositivo: ${row.name}`);
    // Lógica adicional para eliminar el dispositivo
  };

  const columns = [
    { field: "name", headerName: "Nombre del dispositivo", width: 300 },
    { field: "type", headerName: "Tipo", width: 220 },
    { field: "state", headerName: "Estado", width: 220 },
    {
      field: "battery",
      headerName: "Batería (%)",
      width: 220,
      renderCell: (params) => (
        <Tooltip title={`${params.row.battery}%`}>
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
                  width: `${params.row.battery}%`,
                  height: "100%",
                  backgroundColor:
                    params.row.battery > 75
                      ? "limegreen"
                      : params.row.battery > 30
                      ? "yellow"
                      : "red",
                }}
              />
            </Box>
          </Box>
        </Tooltip>
      ),
    },
    { field: "location", headerName: "Ubicación", width: 300 },
    {
      field: "actions",
      headerName: "",
      width: 250,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
          width="100%"
          height="100%"
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row)}
          >
            Eliminar
          </Button>
        </Box>
      ),
    },
  ];
  

  // Filtrar dispositivos por búsqueda y tipo
  const filteredRows = rows.filter(
    (row) =>
      (selectedType === "all" || row.type === selectedType) &&
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ padding: 4, backgroundColor: "background.default" }}>
        {/* Encabezado */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            Dispositivos
          </Typography>
          <Box>
            <IconButton
              color="primary"
              onClick={async () => {
                const toastId = toast.loading("Recargando datos...");
                try {
                  await fetchData();
                  toast.success("Datos cargados correctamente", { id: toastId });
                } catch (error) {
                  toast.error("Error al recargar los datos", { id: toastId });
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
              sx={{ marginLeft: 2 }}
            >
              Agregar dispositivo
            </Button>
          </Box>
        </Box>

        {/* Filtro por tipo */}
        <Tabs
          value={selectedType}
          onChange={(e, newValue) => setSelectedType(newValue)}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab value="all" label="Todos" />
          <Tab value="ROBOT" label="Robots" />
          <Tab value="DRONE" label="Drones" />
        </Tabs>

        {/* Barra de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Buscar dispositivos"
          width="100%"
          sx={{ marginY: 3 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Tabla del inventario */}
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                color: "text.primary",
                backgroundColor: "background.paper",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid #424242",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#333",
                color: "#fff",
                borderBottom: "none",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#333",
                color: "#fff",
                borderTop: "none",
              },
            }}
          />
        </Box>
      </Box>
      <CreateDeviceModal open={openModal} handleClose={() => setOpenModal(false)} />
    </ThemeProvider>
  );
};

export default Inventario;
