import { Logout } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';

import { brandColors } from '../../../styles/brand-colors';

interface PortalHeaderProps {
  onLogout?: () => void;
}

export const PortalHeader = ({ onLogout }: PortalHeaderProps) => (
  <Box
    component="header"
    sx={{
      background: brandColors.gradients.arch,
      py: 3,
    }}
  >
    <Container maxWidth="lg">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        {/* Brand */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          ></Box>
          <Typography variant="h6" fontWeight="bold" color="white">
            Portal de Estudios Médicos
          </Typography>
        </Box>

        {/* Logout */}
        <Button
          variant="outlined"
          startIcon={<Logout />}
          onClick={onLogout}
          sx={{
            color: 'white',
            borderColor: 'rgba(255,255,255,0.5)',
            '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
          }}
        >
          Salir
        </Button>
      </Box>
    </Container>
  </Box>
);
