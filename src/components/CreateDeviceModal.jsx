import {
  TextField,
  Button,
  Modal,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { toast } from "sonner";
import { useState } from "react";
import axios from "axios";

const CreateDeviceModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    ubicacion: "",
    bateria: 100,
    tipo: "",
  });

  const tipos = ["robot", "drone"]; // Opciones para el tipo

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nombre || !formData.ubicacion || !formData.tipo || !formData.bateria) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    console.log("Dispositivo creado:", formData);
    await axios.post("http://localhost:5108/api/Inventario/AgregarDispositivo", formData);
    toast.success("Dispositivo creado con éxito");
    handleClose(); // Cierra el modal
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" component="h2" mb={3} textAlign="center">
          Crear Dispositivo
        </Typography>

        {/* Campo Nombre */}
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          margin="normal"
        />

        {/* Campo Ubicación */}
        <TextField
          fullWidth
          label="Ubicación"
          name="ubicacion"
          value={formData.ubicacion}
          onChange={handleChange}
          margin="normal"
        />

        {/* Campo Bateria */}
        <TextField
          fullWidth
          label="Bateria"
          name="bateria"
          value={formData.bateria}
          onChange={handleChange}
          margin="normal"
        />

        {/* Selector de Tipo */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipo-select-label">Tipo</InputLabel>
          <Select
            labelId="tipo-select-label"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            {tipos.map((tipo, index) => (
              <MenuItem key={index} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)} {/* Capitaliza */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Botones */}
        <Box mt={3} display="flex" justifyContent="space-between">
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Crear
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateDeviceModal;
