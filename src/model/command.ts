import { Operative } from './operative';
import { WithId } from './user';

export type CommandNoId = {
  author: string;
  name: string;
  faction: string;
  members: Operative[];
  size: string;
  imageData: {
    publicId: string;
    width: number;
    height: number;
    format: string;
    url: string;
    _id: string;
  };
};

export type Command = WithId & CommandNoId;
