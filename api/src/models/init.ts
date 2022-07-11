import Track from "./track";
const isDev = process.env.NODE_ENV === "development";

const dbInit = () => {
  Track.sync();
};
export default dbInit;
