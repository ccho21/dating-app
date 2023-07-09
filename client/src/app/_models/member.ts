import { Experience } from './experience';
import { Message } from './message';
import { Photo } from './photo';
import { Project } from './project';

export interface Member {
  id: number;
  name: string;
  username: string;
  photoUrl: string;
  age: number;
  knownAs: string;
  created: Date;
  lastActive: Date;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  photos: Photo[];
  recentMessages: Message[];
  likedByUsers: Partial<Member[]>;
  projects: Project[];
  experiences: Experience[];
}

export interface MemberForm {
  knownAs: string;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
}
