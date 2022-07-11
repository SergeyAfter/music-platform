export interface ITrackModel {
  id: string;
  title: string;
  album: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
