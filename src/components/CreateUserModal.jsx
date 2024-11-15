import { TextField, Button, Modal, Box, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { toast } from 'sonner';
import { useState } from 'react';

const CreateUserModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    usuarioId: "",
    nombre: "",
    email: "",
    password: "",
    rolId: "",
    fechaRegistro: new Date().toISOString().slice(0, 10), // Fecha actual en formato YYYY-MM-DD
  });

  // Simulación de datos para los roles
  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Usuario" },
    { id: 3, name: "Invitado" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.email || !formData.password || !formData.rolId) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }
    console.log("Usuario creado:", formData);
    toast.success("Usuario creado con éxito");
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
          Crear Usuario
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

        {/* Campo Email */}
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />

        {/* Campo Contraseña */}
        <TextField
          fullWidth
          label="Contraseña"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />

        {/* Selector de Rol */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="rol-select-label">Rol</InputLabel>
          <Select
            labelId="rol-select-label"
            name="rolId"
            value={formData.rolId}
            onChange={handleChange}
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.id}>
                {rol.name}
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

export default CreateUserModal;