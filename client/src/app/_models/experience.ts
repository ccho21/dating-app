import { Message } from './message';
import { Photo } from './photo';
import { Skill } from './skill';

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
  logos: Photo[];
  skills: Skill[];
}

export interface JobDescription {
  id: number;
  description: string;
  position: string;
  started: string;
  ended: string;
}

export interface Detail {
  id: number;
  description: string;
}
