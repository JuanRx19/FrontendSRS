import "../assets/styles/Usuarios.css";
import { DataGrid } from '@mui/x-data-grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { toast } from 'sonner';
import CreateUserModal from './CreateUserModal';

// Define un tema oscuro personalizado para el DataGrid
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#fff',
      secondary: '#aaa',
    },
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: 'Roboto, Arial, sans-serif',
          backgroundColor: '#1d1d1d',
          color: '#fff',
        },
        columnHeaders: {
          backgroundColor: '#333',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 'bold',
        },
        row: {
          '&:hover': {
            backgroundColor: '#444',
          },
        },
        footerContainer: {
          backgroundColor: '#333',
          color: '#fff',
        },
      },
    },
  },
});

const Usuarios = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  // Define las columnas
  const columns = [
    { field: 'usuarioId', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 350 },
    { field: 'email', headerName: 'Email', width: 350 },
    { field: 'rol', headerName: 'Rol', width: 250 },
    { field: 'fechaRegistro', headerName: 'Fecha Registro', width: 250 },
    {
      field: 'actions',
      headerName: '',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(params.row.usuarioId)}
            style={{ marginRight: 8 }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.usuarioId)}
          >
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  // Función para obtener los datos del backend
  const fetchRows = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5108/api/Usuarios/GetUsuarios'); // URL de tu backend
      const data = await response.json();
      // Mapea los datos para que coincidan con las filas del DataGrid
      const mappedData = data.map((usuario) => ({
        usuarioId: usuario.usuarioId,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: (usuario.rol.nombreRol).toUpperCase(),
        fechaRegistro: new Date(usuario.fechaRegistro).toLocaleDateString(), // Formatea la fecha
      }));
      setRows(mappedData);
      setLoading(false);
      toast.success('Usuarios cargados correctamente');
    } catch (error) {
      setLoading(false);
      toast.error('Error al cargar usuarios ' + error);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  // Filtrado de búsqueda
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Manejo de acciones
  const handleEdit = (id) => {
    toast(`Editando usuario con ID: ${id}`);
  };

  const handleDelete = (id) => {
    toast.error(`Eliminando usuario con ID: ${id}`);
    setRows(rows.filter((row) => row.usuarioId !== id));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ height: 600, width: '100%', padding: '20px', margin: '0 auto'}}>
      <div className="header-tabla">
        {/* Cuadro de búsqueda */}
          <TextField
            label="Buscar..."
            id="outlined-basic"
            variant="outlined"
            size="small"
            className="custom-text-field"
            onChange={handleSearch}
          />

        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Crear usuario
        </Button>
        <CreateUserModal open={open} handleClose={() => setOpen(false)} />
      </div>

        {/* Tabla */}
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          checkboxSelection
          disableSelectionOnClick
          loading={loading}
          getRowId={(row) => row.usuarioId} // Usar usuarioId como id
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#333', // Fondo de encabezados
              color: '#fff', // Color del texto en encabezados
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#444',
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: '#333',
              color: '#fff',
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default Usuarios;
