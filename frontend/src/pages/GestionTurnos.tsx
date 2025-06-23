import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    Snackbar,
    Alert,
    Tabs,
    Tab,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Delete, AddCircle } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    LocalizationProvider,
    DatePicker,
    TimePicker,
} from "@mui/x-date-pickers";
import { format } from "date-fns";
import { turnosService } from "../services/turnos";
import { useUserStore } from "../store/userStore";

type Turno = {
    _id: string;
    fecha_turno: string;
    hora_turno: string;
};

export const GestionTurnos = () => {
    const user = useUserStore((state) => state.user);
    const [medicoId, setMedicoId] = useState<string | null>(null);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [tabIndex, setTabIndex] = useState(0);
    const [fecha, setFecha] = useState<Date | null>(null);
    const [hora, setHora] = useState<Date | null>(null);
    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        message: "",
        type: "success",
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [turnoToDelete, setTurnoToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchMedico = async () => {
            if (!user?._id) return;

            try {
                const medico = await turnosService.getMedicoByUsuarioId(
                    user._id
                );
                if (medico) {
                    console.log("✅ Médico encontrado:", medico);
                    setMedicoId(medico._id);

                    const turnos =
                        await turnosService.getTurnosDisponiblesByMedicoId(
                            medico._id
                        );
                    console.log("🩺 Turnos cargados:", turnos);
                    setTurnos(turnos);
                } else {
                    console.warn(
                        "⚠️ No se encontró un médico para el usuario:",
                        user._id
                    );
                }
            } catch (err) {
                console.error("❌ Error al obtener el médico:", err);
            }
        };



        fetchMedico();
    }, []);

    const fetchTurnos = async () => {
        if (!medicoId) return;
        const result = await turnosService.getTurnosDisponiblesByMedicoId(
            medicoId
        );
        setTurnos(result);
    };

    const handleCreateTurno = async () => {
        if (!fecha || !hora || !medicoId) return;

        try {
            const response = await turnosService.createTurno({
                fecha_turno: format(fecha, "yyyy-MM-dd"),
                hora_turno: format(hora, "HH:mm"),
                id_medico: medicoId,
                tipo_usuario: user?.tipo_usuario || "medico",
            });
            console.log(response);
            await fetchTurnos();
            setFecha(null);
            setHora(null);
            setOpenSnackbar({
                open: true,
                message: "Turno creado correctamente",
                type: "success",
            });
        } catch (err) {
            setOpenSnackbar({
                open: true,
                message:
                    err instanceof Error ? err.message : "Ocurrió un error",
                type: "error",
            });
        }
    };

    const confirmDeleteTurno = (id: string) => {
        setTurnoToDelete(id);
        setDialogOpen(true);
    };

    const handleDeleteTurno = async () => {
        if (!turnoToDelete) return;
        try {
            await turnosService.deleteTurno(turnoToDelete);
            await fetchTurnos();
            setOpenSnackbar({
                open: true,
                message: "Turno eliminado",
                type: "success",
            });
        } catch (err: unknown) {
            setOpenSnackbar({
                open: true,
                message:
                    err instanceof Error ? err.message : "Ocurrió un error",
                type: "error",
            });
        }
        setDialogOpen(false);
        setTurnoToDelete(null);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ p: 4 }}>
                <Typography variant='h4' fontWeight='bold' mb={3}>
                    Gestión de Turnos
                </Typography>

                <Card sx={{ mb: 4, p: 2 }}>
                    <Typography variant='h6' gutterBottom>
                        Crear Nuevo Turno
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <DatePicker
                                label='Fecha'
                                value={fecha}
                                onChange={(newDate) => setFecha(newDate)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <TimePicker
                                label='Hora'
                                value={hora}
                                onChange={(newTime) => setHora(newTime)}
                                slotProps={{ textField: { fullWidth: true } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                variant='contained'
                                startIcon={<AddCircle />}
                                onClick={handleCreateTurno}
                                sx={{ height: "100%", width: "100%" }}
                            >
                                Crear Turno
                            </Button>
                        </Grid>
                    </Grid>
                </Card>

                <Tabs
                    value={tabIndex}
                    onChange={(e, val) => setTabIndex(val)}
                    sx={{ mb: 2 }}
                >
                    <Tab label='Turnos Disponibles' />
                    <Tab label='Turnos Reservados' disabled />
                </Tabs>

                {tabIndex === 0 && (
                    <Grid container spacing={2}>
                        {turnos.length === 0 ? (
                            <Typography variant='body1' sx={{ m: 2 }}>
                                No hay turnos disponibles
                            </Typography>
                        ) : (
                            turnos.map((turno) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={turno._id}
                                >
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Typography variant='subtitle1'>
                                                Fecha:{" "}
                                                {format(
                                                    new Date(turno.fecha_turno),
                                                    "dd/MM/yyyy"
                                                )}
                                            </Typography>
                                            <Typography variant='subtitle2'>
                                                Hora: {turno.hora_turno}
                                            </Typography>
                                            <Box
                                                display='flex'
                                                justifyContent='flex-end'
                                                mt={2}
                                            >
                                                <IconButton
                                                    color='error'
                                                    onClick={() =>
                                                        confirmDeleteTurno(
                                                            turno._id
                                                        )
                                                    }
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                )}

                <Snackbar
                    open={openSnackbar.open}
                    autoHideDuration={4000}
                    onClose={() =>
                        setOpenSnackbar({ ...openSnackbar, open: false })
                    }
                >
                    <Alert
                        onClose={() =>
                            setOpenSnackbar({ ...openSnackbar, open: false })
                        }
                        severity={openSnackbar.type as any}
                        sx={{ width: "100%" }}
                    >
                        {openSnackbar.message}
                    </Alert>
                </Snackbar>

                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <DialogTitle>¿Eliminar Turno?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro que deseas eliminar este turno?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialogOpen(false)}>
                            Cancelar
                        </Button>
                        <Button color='error' onClick={handleDeleteTurno}>
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </LocalizationProvider>
    );
};
