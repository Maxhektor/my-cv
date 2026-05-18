import type { RoleId } from './i18n/translations';

export type CvSectionId = 'skills' | 'achievements' | 'personality' | 'contact';

export interface CvContact {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export const CV_CONTACT: CvContact = {
  fullName: 'Max Merrild',
  email: 'maxhektor221@gmail.com',
  phone: '25 32 46 56',
  address: '2500 Valby, København, Danmark',
};

export const ROLE_IDS: readonly RoleId[] = [
  'product-operations',
  'product-manager',
  'operations-generalist',
];
