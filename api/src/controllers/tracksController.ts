import Track from "../models/track";
import { ITrackModel } from "../interfaces/Track";

const getAll = (): Promise<ITrackModel[]> => {
  return Track.findAll();
};

const getById = (id: string): Promise<ITrackModel | null> => {
  return Track.findByPk(id);
};

const create = (payload: any): Promise<ITrackModel> => {
  return Track.create(payload);
};

const deleteById = (id: string): Promise<number> => {
  return Track.destroy({ where: { id } });
};

const update = async (
  id: string,
  payload: Partial<ITrackModel>
): Promise<ITrackModel> => {
  const track = await Track.findByPk(id);
  if (!track) {
    // @todo throw custom error
    throw new Error("not found");
  }
  const updatedTrack = await track.update(payload);
  return updatedTrack;
};

export default {
  getAll,
  getById,
  deleteById,
  create,
  update,
};
