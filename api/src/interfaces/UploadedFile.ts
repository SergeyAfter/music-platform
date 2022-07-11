import fileupload from "express-fileupload";

interface IUploadedFile extends fileupload.UploadedFile {
  path: string;
}

export default IUploadedFile;
