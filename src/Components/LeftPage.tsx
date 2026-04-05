import { LockReset } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import {
  CIRCLE_POSITION,
  CONTENEDOR_LEFT,
  DECORADOR_CIRCLES,
  POSITION_RELATIVE,
} from '../styles/alert-retry';
export const LeftPage = () => {
  return (
    <Box sx={{ ...CONTENEDOR_LEFT, display: { xs: 'none', md: 'flex' } }}>
      {/* Decorative circles */}
      <Box sx={DECORADOR_CIRCLES} />
      <Box
        sx={{
          ...CIRCLE_POSITION,
          width: 300,
          height: 300,
          bottom: -50,
          right: -50,
        }}
      />
      <Box
        sx={{
          ...CIRCLE_POSITION,
          width: 200,
          height: 200,
          top: '40%',
          right: '20%',
        }}
      />

      <Box sx={POSITION_RELATIVE}>
        <LockReset sx={{ fontSize: 120, mb: 4, opacity: 0.9, color: '#fff' }} />
        <Typography
          variant="h2"
          sx={{
            color: '#fff',
            fontWeight: 700,
            mb: 2,
            fontSize: { md: '3rem', lg: '3.5rem' },
          }}
        >
          Hola,
          <br />
          Bienvenido
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255,255,255,0.8)',
            maxWidth: 400,
            lineHeight: 1.8,
          }}
        >
          Consulta tu información.
        </Typography>
      </Box>
    </Box>
  );
};
