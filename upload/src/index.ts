require("dotenv").config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import createMQConsumer from "./instances/consumer";
import createMQProducer from "./instances/producer";

const app: Express = express();
const port = process.env.PORT || 5001;
const RABBITMQ_SERVER_URL = process.env.RABBITMQ_SERVER_URL;

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const uploadTrackConsumer = createMQConsumer(
  RABBITMQ_SERVER_URL,
  "uploadQueue"
)();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(
    `⚡️[upload]: Upload Server is running at http://localhost:${port}`
  );
});
