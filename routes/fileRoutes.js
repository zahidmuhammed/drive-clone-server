// routes/fileRoutes.js

const express = require("express");
const multer = require("multer");
const File = require("../models/File");
require("dotenv").config();
const { ensureAuth } = require("../middlewares/authMiddleware");

const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const router = express.Router();

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload file
router.post("/upload", ensureAuth, upload.single("file"), async (req, res) => {
    const file = req.file;
    const user = req.user;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        // Upload to S3
        const command = new PutObjectCommand(params);
        const s3Response = await s3Client.send(command);

        // Save file data to MongoDB
        const newFile = new File({
            fileName: file.originalname,
            fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`,
            userId: user.id,
        });

        console.log("S# PArms", s3Response, newFile);

        await newFile.save();

        res.status(200).json({
            message: "File uploaded successfully",
            fileUrl: s3Response.Location,
        });
    } catch (error) {
        res.status(500).json({
            error: "File upload failed",
            details: error.message,
        });
    }
});

module.exports = router;
