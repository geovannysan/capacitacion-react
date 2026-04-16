import { ArrowForward as ArrowRight } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { cloneElement } from 'react';

import { brandColors } from '../../../styles/brand-colors';
import { STUDY_ACTION_CARDS } from '../constants/medical-portal.constant';

export const StudyActionCards = () => (
  <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: 'repeat(3, 1fr)' }} gap={2} pt={1}>
    {STUDY_ACTION_CARDS.map(({ icon, sub, title, btn }) => (
      <Card
        key={btn}
        variant="outlined"
        sx={{
          borderColor: '#dbeafe',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': { transform: 'translateY(-3px)', boxShadow: 4, borderColor: '#93c5fd' },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            p: 3,
            '&:last-child': { pb: 3 },
          }}
        >
          <Box
            sx={{
              mb: 2,
              width: 56,
              height: 56,
              borderRadius: '50%',
              border: `2px solid ${brandColors.navy.main}`,
              bgcolor: '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {cloneElement(icon, { sx: { fontSize: 28, color: brandColors.navy.main } })}
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
          <Typography variant="subtitle1" fontWeight="bold" textTransform="uppercase" mb={2.5}>
            {title}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            endIcon={<ArrowRight />}
            sx={{ bgcolor: brandColors.navy.main, '&:hover': { bgcolor: brandColors.navy.dark } }}
          >
            {btn}
          </Button>
        </CardContent>
      </Card>
    ))}
  </Box>
);
