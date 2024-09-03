// models/File.js

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        user: { type: String, required: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("File", fileSchema);
