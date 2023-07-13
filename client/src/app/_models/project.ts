import { Member } from './member';
import { Message } from './message';
import { Photo } from './photo';

export interface TeamMemberDto {
  id: number;
  username: string;
  name: string;
  photoUrl: string;
  city: string;
  country: string;
}

export interface Project {
  id?: number;
  name: string;
  isPublic: boolean;
  isCurrent: boolean;
  projectWith: string;
  description: string;
  mainFeature: string;
  url: string;
  githubUrl: string;
  frontEnd: string;
  backEnd: string;
  database: string;
  deployment: string;
  projectStarted: string;
  projectEnded: string;
  images: Photo[];
  user: Partial<Member>;
  teamMembers: TeamMemberDto[];
  status: number;
  progress: number;
}
