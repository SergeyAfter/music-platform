"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
// require("url").URL;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const imgbb_uploader_1 = __importDefault(require("imgbb-uploader"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.use("/api");
console.log("path", path_1.default.join(__dirname, "public"));
app.use(express_1.default.static("public"));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/track/:id", (req, res) => {
    const { id } = req.params;
    const filePath = path_1.default.resolve(__dirname, "../public/audio", `./${id}.mp3`);
    // get file size info
    const stat = fs_1.default.statSync(filePath);
    // set response header info
    res.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Content-Length": stat.size,
    });
    //create read stream
    const readStream = fs_1.default.createReadStream(filePath);
    // attach this stream with response stream
    readStream.pipe(res);
});
app.post("/api/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, userId } = req.body;
        const data = yield (0, imgbb_uploader_1.default)({
            apiKey: process.env.IMGBB_API_KEY,
            name: `${Date.now()}-${userId}-profile-picture`,
            base64string: image.replace(/^data:image\/[a-z]+;base64,/, ""),
        });
        console.log("data", data);
        res.status(200).json(data.display_url);
    }
    catch (error) {
        console.log("error", error);
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
