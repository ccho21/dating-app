import { Message } from './message';
import { Photo } from './photo';

export interface Project {
  id?: number;
  name: string;
  intro: string;
  projectWith: string;
  description: string;
  mainFeature: string;
  url: string;
  githubUrl: string;
  frontEnd: string;
  backEnd: string;
  database: string;
  deployement: string;
  projectStarted: string;
  projectEnded: string;
  images: Photo[];
}
