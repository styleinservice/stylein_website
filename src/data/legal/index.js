import { LEGAL_META } from './legalMeta';
import { PART_A_SECTIONS } from './partA';
import { PART_B_SECTIONS } from './partB';
import { PART_C_SECTIONS } from './partC';
import { PART_D_SECTIONS } from './partD';
import { PART_E_SECTIONS } from './partE';

export const LEGAL_PARTS = [
  {
    id: 'part-a-terms-of-service',
    letter: 'A',
    title: 'PART A — TERMS OF SERVICE',
    sections: PART_A_SECTIONS,
  },
  {
    id: 'part-b-privacy-policy',
    letter: 'B',
    title: 'PART B — PRIVACY POLICY',
    sections: PART_B_SECTIONS,
  },
  {
    id: 'part-c-app-developer-implementation-requirements',
    letter: 'C',
    title: 'PART C — APP DEVELOPER IMPLEMENTATION REQUIREMENTS',
    sections: PART_C_SECTIONS,
  },
  {
    id: 'part-d-legal-safeguards',
    letter: 'D',
    title: 'PART D — LEGAL SAFEGUARDS',
    sections: PART_D_SECTIONS,
  },
  {
    id: 'part-e-customer-service-and-complaints',
    letter: 'E',
    title: 'PART E — CUSTOMER SERVICE AND COMPLAINTS',
    sections: PART_E_SECTIONS,
  },
];

export const ALL_LEGAL_SECTIONS = [
  ...PART_A_SECTIONS,
  ...PART_B_SECTIONS,
  ...PART_C_SECTIONS,
  ...PART_D_SECTIONS,
  ...PART_E_SECTIONS,
];

export { LEGAL_META };
