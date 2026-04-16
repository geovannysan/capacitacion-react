import { ExpandMore as ChevronDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { cloneElement } from 'react';

import { StudyActionCards } from './StudyActionCards';
import { brandColors } from '../../../styles/brand-colors';
import { ACCORDION_STUDIES } from '../constants/medical-portal.constant';

export const StudyAccordionList = () => (
  <Box display="flex" flexDirection="column" gap={2}>
    {ACCORDION_STUDIES.map(({ id, label, icon }) => (
      <Accordion
        key={id}
        disableGutters
        elevation={1}
        sx={{
          borderRadius: '8px !important',
          border: '1px solid #e2e8f0',
          '&:before': { display: 'none' },
          '&:hover': { borderColor: brandColors.green.main },
        }}
      >
        <AccordionSummary
          expandIcon={<ChevronDown />}
          sx={{
            px: 2.5,
            py: 1.5,
            '& .MuiAccordionSummary-content': { alignItems: 'center', gap: 1.5 },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: '#dbeafe',
              color: brandColors.navy.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {cloneElement(icon)}
          </Box>
          <Typography fontWeight={600}>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 2.5, bgcolor: brandColors.canvas }}>
          <StudyActionCards />
        </AccordionDetails>
      </Accordion>
    ))}
  </Box>
);
