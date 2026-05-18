export type CvSectionId = 'skills' | 'achievements' | 'personality' | 'ai' | 'contact';

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
