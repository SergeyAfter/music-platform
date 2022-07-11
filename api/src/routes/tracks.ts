import { Request, Response, Router } from "express";
import tracksController from "../controllers/tracksController";
import createMQProducer from "../instances/producer";
import multer from "multer";

const router = Router();
const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

const producer = createMQProducer(RABBITMQ_SERVER_URL, "uploadQueue");

router.get("/", async (req: Request, res: Response) => {
  const tracks = await tracksController.getAll();
  return res.json(tracks);
});

router.post(
  "/",
  multer().fields([
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  async (req: Request, res: Response): Promise<any> => {
    try {
      if (req.files) {
        const track = await tracksController.create(req.body);

        const files = req.files as {
          [fieldname: string]: Express.Multer.File[];
        };
        const image = files["image"][0];
        const audio = files["audio"][0];
        const imageMsg = {
          action: "UPLOAD_TRACK_IMAGE",
          data: {
            image,
            trackId: track.id,
          },
        };

        const audioMsg = {
          action: "UPLOAD_TRACK_AUDIO",
          data: {
            audio,
            trackId: track.id,
          },
        };

        producer(JSON.stringify(imageMsg));
        producer(JSON.stringify(audioMsg));

        res.status(200).send("files uploaded");
      }
    } catch (error) {
      console.log(error);
    }
  }
);

router.delete("/:id", (req: Request, res: Response) => {
  console.log("DELETE");
});

router.patch("/:id", (req: Request, res: Response) => {
  console.log("PATCH");
});

export default router;
