import { Box, Container, Typography } from '@mui/material';

import { PortalHeader, StudyAccordionList } from './components';
import { brandColors } from '../../styles/brand-colors';

export default function MedicalPortalPage() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor={brandColors.canvas}>
      <PortalHeader />

      <Box component="main" flex={1} py={5}>
        <Container maxWidth="lg">
          <Typography variant="h6" fontWeight={700} mb={0.5}>
            Otros estudios disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Seleccione un estudio para ver las opciones de visualización
          </Typography>

          <StudyAccordionList />
        </Container>
      </Box>
    </Box>
  );
}
