import {
  Article as FileText,
  Image,
  Scanner as ScanLine,
  ExpandMore as ChevronDown,
  ArrowForward as ArrowRight,
  MonitorHeart as Activity,
  MedicalServices as Stethoscope,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Link,
} from '@mui/material';
import { useState } from 'react';

const StudyActionCards = () => {
  const cards = [
    {
      icon: <FileText sx={{ fontSize: 28, color: '#2563eb' }} />,
      label: 'Visualice su informe médico',
      btn: 'Ver informe',
    },
    {
      icon: <Image sx={{ fontSize: 28, color: '#2563eb' }} />,
      label: 'Visualice sus imágenes (JPEG)',
      btn: 'Visor web',
    },
    {
      icon: <ScanLine sx={{ fontSize: 28, color: '#2563eb' }} />,
      label: 'Visualice sus imágenes (DICOM)',
      btn: 'Visor DICOM',
    },
  ];

  return (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
      {cards.map(({ icon, label, btn }) => (
        <Card
          key={btn}
          variant="outlined"
          sx={{ borderColor: '#dbeafe', '&:hover': { boxShadow: 3, borderColor: '#93c5fd' } }}
        >
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 2.5,
            }}
          >
            <Box
              sx={{
                mb: 1.5,
                width: 56,
                height: 56,
                borderRadius: '50%',
                bgcolor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
              {label}
            </Typography>
            <Button
              variant="contained"
              size="small"
              fullWidth
              endIcon={<ArrowRight />}
              sx={{ bgcolor: '#2563eb', '&:hover': { bgcolor: '#1d4ed8' } }}
            >
              {btn}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default function MedicalPortalPage() {
  const [study, setStudy] = useState('cerebro');

  const accordionItems = [
    { id: 'eco', label: 'Eco Transvaginal', icon: <Stethoscope /> },
    { id: 'rayos', label: 'Rayos X', icon: <ScanLine /> },
  ];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" bgcolor="#f8fafc">
      {/* Header */}
      <Box
        component="header"
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%)',
          position: 'relative',
          overflow: 'hidden',
          pb: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 5, pb: 2, position: 'relative', zIndex: 1 }}>
          {/* Brand */}
          <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={4}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Activity sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" color="white">
              Portal de Estudios Médicos
            </Typography>
          </Box>

          {/* Study Selector */}
          <Box maxWidth={400} mx="auto" mb={4}>
            <Typography variant="body2" color="rgba(255,255,255,0.8)" mb={1}>
              Seleccione su estudio
            </Typography>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Seleccione estudio</InputLabel>
              <Select
                value={study}
                label="Seleccione estudio"
                onChange={(e) => setStudy(e.target.value)}
                sx={{
                  color: 'white',
                  '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.6)',
                  },
                  '.MuiSvgIcon-root': { color: 'white' },
                  bgcolor: 'rgba(255,255,255,0.1)',
                }}
              >
                <MenuItem value="cerebro">Cerebro simple</MenuItem>
                <MenuItem value="torax">Tórax</MenuItem>
                <MenuItem value="abdomen">Abdomen</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Main Action Cards */}
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2.5}>
            {[
              {
                icon: <FileText sx={{ fontSize: 32, color: '#2563eb' }} />,
                sub: 'Visualice su',
                title: 'Informe Médico',
                btn: 'Ver informe',
              },
              {
                icon: <Image sx={{ fontSize: 32, color: '#2563eb' }} />,
                sub: 'Visualice sus',
                title: 'Imágenes (JPEG)',
                btn: 'Visor web',
              },
              {
                icon: <ScanLine sx={{ fontSize: 32, color: '#2563eb' }} />,
                sub: 'Visualice sus',
                title: 'Imágenes (DICOM)',
                btn: 'Visor DICOM',
              },
            ].map(({ icon, sub, title, btn }) => (
              <Card
                key={btn}
                elevation={6}
                sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      border: '2px solid #2563eb',
                      bgcolor: '#eff6ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing={1}
                    color="text.secondary"
                  >
                    {sub}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    textTransform="uppercase"
                    mb={2}
                  >
                    {title}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowRight />}
                    sx={{
                      bgcolor: '#2563eb',
                      boxShadow: 3,
                      '&:hover': { bgcolor: '#1d4ed8', boxShadow: 5 },
                    }}
                  >
                    {btn}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>

        {/* Wave */}
        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', display: 'block' }}
          >
            <path
              d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 33.3C840 36.7 960 43.3 1080 45C1200 46.7 1320 43.3 1380 41.7L1440 40V60H0Z"
              fill="#f8fafc"
            />
          </svg>
        </Box>
      </Box>

      {/* Accordion Section */}
      <Box component="main" flex={1} py={4}>
        <Container maxWidth="lg">
          <Typography variant="h6" fontWeight={600} mb={0.5}>
            Otros estudios disponibles
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Seleccione un estudio para ver las opciones de visualización
          </Typography>

          <Box display="flex" flexDirection="column" gap={1.5}>
            {accordionItems.map(({ id, label, icon }) => (
              <Accordion
                key={id}
                disableGutters
                elevation={1}
                sx={{
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  '&:before': { display: 'none' },
                  '&:hover': { borderColor: '#93c5fd' },
                }}
              >
                <AccordionSummary
                  expandIcon={<ChevronDown />}
                  sx={{
                    px: 2.5,
                    py: 1,
                    '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5 },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: '#dbeafe',
                      color: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography fontWeight={500}>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 2.5, bgcolor: '#f8fafc' }}>
                  <StudyActionCards />
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" borderTop="1px solid #e2e8f0" bgcolor="white">
        <Container maxWidth="lg">
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            gap={2}
            py={2.5}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Activity sx={{ color: '#2563eb', fontSize: 18 }} />
              <Typography variant="body2" fontWeight={500}>
                Powered by IberoRad
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Link href="#" underline="hover" variant="body2" color="text.secondary">
                Aviso legal
              </Link>
              <Typography color="text.disabled">|</Typography>
              <Link href="#" underline="hover" variant="body2" color="text.secondary">
                Política de privacidad y cookies
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
