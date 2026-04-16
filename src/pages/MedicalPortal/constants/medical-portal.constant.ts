import {
  Article as FileText,
  Image,
  Scanner as ScanLine,
  MedicalServices as Stethoscope,
} from '@mui/icons-material';
import { createElement } from 'react';

export const STUDY_ACTION_CARDS = [
  {
    icon: createElement(FileText),
    sub: 'Visualice su',
    title: 'Informe Médico',
    btn: 'Ver informe',
  },
  {
    icon: createElement(Image),
    sub: 'Visualice sus',
    title: 'Imágenes (JPEG)',
    btn: 'Visor web',
  },
  {
    icon: createElement(ScanLine),
    sub: 'Visualice sus',
    title: 'Imágenes (DICOM)',
    btn: 'Visor DICOM',
  },
] as const;

export const ACCORDION_STUDIES = [
  { id: 'eco', label: 'Eco Transvaginal', icon: createElement(Stethoscope) },
  { id: 'rayos', label: 'Rayos X', icon: createElement(ScanLine) },
  { id: 'tomografia', label: 'Tomografía', icon: createElement(FileText) },
] as const;

export const STUDY_SELECT_OPTIONS = [
  { value: 'cerebro', label: 'Cerebro simple' },
  { value: 'torax', label: 'Tórax' },
  { value: 'abdomen', label: 'Abdomen' },
] as const;
