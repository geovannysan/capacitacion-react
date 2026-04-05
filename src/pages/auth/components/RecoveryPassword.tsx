import {
  Visibility,
  VisibilityOff,
  Lock,
  Badge,
  ArrowBack,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Chip,
} from '@mui/material';
import * as motion from 'motion/react-client';

import useRecovery from '../hooks/useRecovery';

interface LoginFormProps {
  vieW: boolean;
  setView: () => void;
}
export default function RecoveryPassword({ vieW, setView }: LoginFormProps) {
  const {
    activeStep,
    setActiveStep,
    userData,
    loading,
    showNewPassword,
    setShowNewPassword,
    cedulaForm,
    passwordForm,
    handleSearchCedula,
    handleCambiarContrasena,
  } = useRecovery();

  const steps = ['Verificar Cédula', 'Nueva Contraseña', 'Confirmación'];
  if (vieW) return <> </>;
  return (
    <motion.div
      key="recovery"
      initial={{ rotateY: 180, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: -180, opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{ backfaceVisibility: 'hidden', width: '100%' }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '10px',
        }}
      >
        <Paper
          elevation={0}
          sx={{ maxWidth: 480, width: '100%', p: 5, borderRadius: 3, border: '1px solid #e0e0e0' }}
        >
          <Box>
            <Button startIcon={<ArrowBack />} onClick={setView} color="primary" sx={{ mb: 3 }}>
              Volver al Login
            </Button>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Recuperar Contraseña
            </Typography>

            <Stepper activeStep={activeStep} sx={{ my: 4 }}>
              {steps.map((label) => (
                <Step
                  sx={{
                    '& .MuiStepLabel-label': {
                      display: { xs: 'none', sm: 'block' },
                    },
                  }}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === 0 && (
              <Box component="form" onSubmit={handleSearchCedula}>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Ingresa tu número de cédula para verificar tu identidad y restablecer tu
                  contraseña.
                </Typography>
                <TextField
                  fullWidth
                  label="Número de Cédula"
                  margin="normal"
                  placeholder="Ej: 87654321"
                  {...cedulaForm.register('cedula')}
                  error={!!cedulaForm.formState.errors.cedula}
                  helperText={
                    cedulaForm.formState.errors.cedula?.message ?? 'Cédula de prueba: 87654321'
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Badge color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: 15 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Verificar Cédula'}
                </Button>
              </Box>
            )}
            {activeStep === 1 && userData && (
              <Box component="form" onSubmit={handleCambiarContrasena}>
                <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    Usuario verificado: <strong>{userData.nombre}</strong>
                  </Typography>
                  <Chip label={`Cédula: ${userData.cedula}`} size="small" sx={{ mt: 1 }} />
                </Alert>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  Ingresa tu nueva contraseña:
                </Typography>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  type={showNewPassword ? 'text' : 'password'}
                  margin="normal"
                  {...passwordForm.register('password')}
                  error={!!passwordForm.formState.errors.password}
                  helperText={passwordForm.formState.errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowNewPassword(!showNewPassword)} edge="end">
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Confirmar Nueva Contraseña"
                  type={showNewPassword ? 'text' : 'password'}
                  margin="normal"
                  {...passwordForm.register('confirmPassword')}
                  error={!!passwordForm.formState.errors.confirmPassword}
                  helperText={passwordForm.formState.errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setActiveStep(0)}
                    sx={{ flex: 1, py: 1.5 }}
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ flex: 2, py: 1.5, fontWeight: 'bold' }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Guardar Contraseña'
                    )}
                  </Button>
                </Box>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Avatar sx={{ width: 80, height: 80, bgcolor: 'success.main', mx: 'auto', mb: 3 }}>
                  <CheckCircle sx={{ fontSize: 50 }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Contraseña Actualizada
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4} px={2}>
                  Tu contraseña ha sido restablecida correctamente. Ya puedes acceder al sistema con
                  tu nueva contraseña.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={setView}
                  endIcon={<ArrowForward />}
                  sx={{ borderRadius: 2, fontWeight: 'bold', px: 4 }}
                >
                  Ir al Login
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
}
