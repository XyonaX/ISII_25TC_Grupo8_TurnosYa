import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Box, 
  Typography,
  CircularProgress,
  Alert 
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { fetchTurnos } from '../services/turnos'; // Importa tu servicio

// Tipo para TypeScript (ajústalo según la respuesta de tu API)
type Turno = {
  id: string;
  fecha: string;
  medico: string;
  especialidad: string;
  estado: 'disponible' | 'reservado';
};

const Turnos = () => {
  // Estados
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [especialidadFilter, setEspecialidadFilter] = useState<string>('todas');
  const [estadoFilter, setEstadoFilter] = useState<string>('todos');
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });
  // Columnas del DataGrid
  const columns: GridColDef[] = [
    { field: 'fecha', headerName: 'Fecha y Hora', width: 200 },
    { field: 'medico', headerName: 'Médico', width: 200 },
    { field: 'especialidad', headerName: 'Especialidad', width: 200 },
    { 
      field: 'estado', 
      headerName: 'Estado', 
      width: 130,
      renderCell: (params) => (
        <span style={{ 
          color: params.value === 'disponible' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {params.value}
        </span>
      ),
    },
  ];

  // Obtener turnos de la API al cargar el componente
  useEffect(() => {
    const cargarTurnos = async () => {
      try {
        const datos = await fetchTurnos(); // Usa el servicio
        setTurnos(datos);
        setError(null);
      } catch (err) {
        setError('Error al cargar los turnos. Por favor, recarga la página.');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    cargarTurnos();
  }, []);

  // Filtrar turnos
  const turnosFiltrados = turnos.filter((turno) => {
    const coincideBusqueda = 
      turno.medico.toLowerCase().includes(searchText.toLowerCase()) || 
      turno.especialidad.toLowerCase().includes(searchText.toLowerCase());
    const coincideEspecialidad = 
      especialidadFilter === 'todas' || turno.especialidad === especialidadFilter;
    const coincideEstado = 
      estadoFilter === 'todos' || turno.estado === estadoFilter;
    return coincideBusqueda && coincideEspecialidad && coincideEstado;
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Buscar Turnos</Typography>

      {/* Mostrar error si existe */}
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      {/* Barra de búsqueda */}
      <TextField
        label="Buscar por médico o especialidad"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Filtros */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Especialidad</InputLabel>
          <Select
            value={especialidadFilter}
            onChange={(e) => setEspecialidadFilter(e.target.value as string)}
            label="Especialidad"
          >
            <MenuItem value="todas">Todas</MenuItem>
            <MenuItem value="Cardiología">Cardiología</MenuItem>
            <MenuItem value="Dermatología">Dermatología</MenuItem>
            {/* Añade más especialidades según tu API */}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={estadoFilter}
            onChange={(e) => setEstadoFilter(e.target.value as string)}
            label="Estado"
          >
            <MenuItem value="todos">Todos</MenuItem>
            <MenuItem value="disponible">Disponible</MenuItem>
            <MenuItem value="reservado">Reservado</MenuItem>
          </Select>
        </FormControl>
      </Box>

    
      {/* DataGrid con loading */}
      <div style={{ height: 500, width: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
            <DataGrid
      rows={turnosFiltrados}
      columns={columns}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      pageSizeOptions={[5, 10]}
      disableRowSelectionOnClick
      localeText={{
        noRowsLabel: 'No hay turnos disponibles',
        footerRowSelected: (count) => 
          `${count} ${count === 1 ? 'fila seleccionada' : 'filas seleccionadas'}`,
      }}
    />
        )}
      </div>
    </Box>
  );
};

export default Turnos;