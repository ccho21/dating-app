import { Message } from './message';
import { Photo } from './photo';

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
  messagesSent: Message[];
  likedByUsers: Partial<Member[]>;
  projects: any[];
}
