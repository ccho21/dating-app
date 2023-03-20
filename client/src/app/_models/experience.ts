import { Message } from './message';
import { Photo } from './photo';

export interface Experience {
  id: number;
  intro: string;
  position: string;
  companyName: string;
  jobDescriptions: JobDescription[];
  url: string;
  appUserId: number;
  started: string;
  ended: string;
  logo: Photo;
}

export interface JobDescription {
  id: number;
  description: string;
  position: string;
  started: string;
  details: Detail[];
  ended: string;
}

export interface Detail {
  id: number;
  description: string;
}
