import { Request, Response, Router } from "express";
import createMQProducer from "../instances/producer";
import multer from "multer";

const router = Router();
const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

const producer = createMQProducer(RABBITMQ_SERVER_URL, "uploadQueue");

router.get("/", async (req: Request, res: Response) => {
  console.log("GET");
});

router.post(
  "/",
  multer().fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  async (req: Request, res: Response): Promise<any> => {
    console.log("POST");
  }
);

router.delete("/:id", (req: Request, res: Response) => {
  console.log("DELETE");
});

router.patch("/:id", (req: Request, res: Response) => {
  console.log("PATCH");
});

router.put(
  "/:id/profile_image",
  multer().single("profileImage"),
  (req: Request, res: Response) => {
    const profileImage = req.file;

    const msg = {
      action: "UPLOAD_PROFILE_IMAGE",
      data: {
        profileImage,
        userId: req.body.userId,
      },
    };

    producer(JSON.stringify(msg));

    res.status(200).send("files uploaded");
  }
);

export default router;
