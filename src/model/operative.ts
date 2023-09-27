import { WithId } from './user';

export type OperativeNoId = {
  command: string;
  name: string;
  operativeType: string;
  faction: string;
  imageData: {
    publicId: string;
    width: number;
    height: number;
    format: string;
    url: string;
    _id: string;
  };
  moviment: string;
  actionPointLimit: string;
  groupActivation: string;
  defence: string;
  save: string;
  wounds: string;
};

export type Operative = WithId & OperativeNoId;
