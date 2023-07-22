import { Experience } from './experience';
import { Message } from './message';
import { Photo } from './photo';
import { Project } from './project';

export interface Member {
  id: number;
  username: string;
  name: string;

  photoUrl: string;
  age: number;
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

  projects: Project[];
  experiences: Experience[];

  job: string;
  email: string;
  phoneNumber: string;
  company: string;

  website: string;
  linkedIn: string;
  github: string;
  facebook: string;
  twitter: string;
  instagram: string;
  
  projectNumber: number;
  followerNumber: number;
  followingNumber: number;
  likedByUsers: Partial<Member[]>;
}

export interface MemberForm {
  name: string;
  gender: string;
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
}
