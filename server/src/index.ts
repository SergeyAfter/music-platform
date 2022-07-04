require("dotenv").config();
// require("url").URL;
import express, { Express, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import imgbbUploader from "imgbb-uploader";
import path from "path";
import fs from "fs";

const app: Express = express();
const port = process.env.PORT;

// app.use("/api");

console.log("path", path.join(__dirname, "public"));

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/track/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const filePath = path.resolve(__dirname, "../public/audio", `./${id}.mp3`);
  // get file size info
  const stat = fs.statSync(filePath);

  // set response header info
  res.writeHead(200, {
    "Content-Type": "audio/mp3",
    "Content-Length": stat.size,
  });
  //create read stream
  const readStream = fs.createReadStream(filePath);
  // attach this stream with response stream
  readStream.pipe(res);
});

app.post("/api/upload", async (req: Request, res: Response) => {
  try {
    const { image, userId } = req.body;
    const data = await imgbbUploader({
      apiKey: process.env.IMGBB_API_KEY,
      name: `${Date.now()}-${userId}-profile-picture`,
      base64string: image.replace(/^data:image\/[a-z]+;base64,/, ""),
    });

    console.log("data", data);

    res.status(200).json(data.display_url);
  } catch (error) {
    console.log("error", error);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
