import { DataTypes, Model } from "sequelize";
import sequelize from "../instances/sequelize";
import { ITrackModel } from "../interfaces/Track";

class Track extends Model<ITrackModel, ITrackModel> implements ITrackModel {
  public id!: string;
  public title!: string;
  public album!: string;
  public artist!: string;
  public imageUrl!: string;
  public audioUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Track.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelize,
    paranoid: false,
    tableName: "tracks",
    modelName: "Track",
    indexes: [
      {
        unique: true,
        fields: ["title", "artist", "album"],
      },
    ],
  }
);

export default Track;
