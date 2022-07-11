import EasyYandexS3 from "easy-yandex-s3";

export const S3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.YANDEX_KEY_ID,
    secretAccessKey: process.env.YANDEX_SECRET_KEY,
  },
  Bucket: process.env.YANDEX_BUCKET_NAME,
  debug: true,
});
