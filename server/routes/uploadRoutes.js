import express from "express";
import multer from "multer";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// CONFIGURE CLOUDINARY
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

// UPLOAD FILES
router.route("/").post(upload.array("files"), async (req, res) => {
  const files = req.files;
  const { type } = req.query;

  try {
    const uploadUrls = files.map(async (file) => {
      const url = await cloudinary.uploader.upload(file.path, {
        resource_type: type,
      });

      return {
        name: file.originalname,
        url: url.url,
        public_id: url.public_id,
        duration: url.duration,
      };
    });

    const results = await Promise.all(uploadUrls);

    res.status(200).send({ success: true, data: results });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "failed to upload" });
  }
});

// DELETE SINGLE FILE
router.route("/delete").post(async (req, res) => {
  const { public_id } = req.body;
  const { type } = req.query;


  if (!public_id) {
    return res
      .status(400)
      .send({ success: false, error: "Public ID is required" });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: type,
    });
    if (result.result === "ok") {
      res.status(200).send({ success: true, message: "file has been deleted" });
    } else {
      res.status(500).send({
        success: false,
        message: "Failed to delete file",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "failed to delete" });
  }
});

// DELETE ALL FILES
router.route("/deleteAll").post(async (req, res) => {
  const { public_ids } = req.body;

  if (!public_ids) {
    return res
      .status(400)
      .send({ success: false, error: "Public ID is required" });
  }

  try {
    const deleteAllPromise = public_ids.map((public_id) =>
      cloudinary.uploader.destroy(public_id)
    );
    const results = await Promise.all(deleteAllPromise);

    const failedDeletions = results.filter((result) => result.result !== "ok");

    if (failedDeletions.length > 0) {
      res.status(500).send({
        success: false,
        message: "Some files failed to delete",
        details: failedDeletions,
      });
    } else {
      res
        .status(200)
        .send({ success: true, message: "All files have been deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "failed to delete" });
  }
});

export default router;
