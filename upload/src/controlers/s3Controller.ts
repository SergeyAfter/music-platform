import { S3 } from "../instances/s3";

export const upload = async (file: any, path: string) => {
  const uploaded = await S3.Upload(
    { buffer: Buffer.from(file.buffer.data) },
    path
  );
};
