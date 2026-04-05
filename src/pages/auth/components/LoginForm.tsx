import { ArrowForward, Lock, Person, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import * as motion from 'motion/react-client';
import { FieldErrors, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

import { LoginFormValues } from '../hooks/useLogin';

interface LoginFormProps {
  register: UseFormRegister<LoginFormValues>;
  handleSubmit: UseFormHandleSubmit<LoginFormValues>;
  onSubmit: (values: LoginFormValues) => void;
  errors: FieldErrors<LoginFormValues>;
  vieW: boolean;
  setView: () => void;
}

export const LoginForm = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  vieW,
  setView,
}: LoginFormProps) => {
  if (vieW)
    return (
      <motion.div
        key="login"
        initial={{ rotateY: -180, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 180, opacity: 0 }}
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
            sx={{
              maxWidth: 480,
              width: '100%',
              p: 5,
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    bgcolor: 'primary.main',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <Person sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Iniciar Sesión
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ingresa tus credenciales de acceso
                </Typography>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="email"
                  {...register('email', { required: true })}
                  margin="normal"
                  error={!!errors.email}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  helperText="Prueba: admin"
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  margin="normal"
                  {...register('password', { required: true })}
                  error={!!errors.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <VisibilityOff />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  helperText="Prueba: 123456"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{ mt: 4, py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
                >
                  Iniciar Sesión
                </Button>

                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Button
                    variant="text"
                    color="primary"
                    onClick={setView}
                    sx={{ textTransform: 'none', fontWeight: 'medium' }}
                  >
                    ¿Olvidaste tu contraseña? Recupérala aquí
                  </Button>
                </Box>
              </form>
            </Box>
          </Paper>
        </Box>
      </motion.div>
    );
};
