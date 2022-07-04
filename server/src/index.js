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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("dotenv").config();
// require("url").URL;
var express_1 = require("express");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
var imgbb_uploader_1 = require("imgbb-uploader");
var path_1 = require("path");
var fs_1 = require("fs");
var app = (0, express_1["default"])();
var port = process.env.PORT;
// app.use("/api");
console.log("path", path_1["default"].join(__dirname, "public"));
app.use(express_1["default"].static("public"));
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json({ limit: "50mb" }));
app.use(body_parser_1["default"].urlencoded({ limit: "50mb", extended: true }));
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.get("/track/:id", function (req, res) {
    var id = req.params.id;
    var filePath = path_1["default"].resolve(__dirname, "../public/audio", "./".concat(id, ".mp3"));
    // get file size info
    var stat = fs_1["default"].statSync(filePath);
    // set response header info
    res.writeHead(200, {
        "Content-Type": "audio/mp3",
        "Content-Length": stat.size
    });
    //create read stream
    var readStream = fs_1["default"].createReadStream(filePath);
    // attach this stream with response stream
    readStream.pipe(res);
});
app.post("/api/upload", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, image, userId, data, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, image = _a.image, userId = _a.userId;
                return [4 /*yield*/, (0, imgbb_uploader_1["default"])({
                        apiKey: process.env.IMGBB_API_KEY,
                        name: "".concat(Date.now(), "-").concat(userId, "-profile-picture"),
                        base64string: image.replace(/^data:image\/[a-z]+;base64,/, "")
                    })];
            case 1:
                data = _b.sent();
                console.log("data", data);
                res.status(200).json(data.display_url);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.log("error", error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});