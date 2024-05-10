import fs from "fs";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

const gcs = new Storage({
  projectId: process.env.PROJECT,
  keyFilename: process.env.KEYFILE,
});
const bucketName = process.env.BUCKETNAME;
export const bucket = gcs.bucket(bucketName);
function getPublicUrl(filename) {
  return "https://storage.googleapis.com/" + bucketName + "/" + filename;
}
let ImgUpload = {};

ImgUpload.uploadToGcs = (req, res, next) => {
  if (!req.file) return next();

  // Can optionally add a pathA to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on("error", (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on("finish", () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
};

export default ImgUpload;
