// models/File.js

const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
    {
        fileName: { type: String, required: true },
        fileUrl: { type: String, required: true },
        userId: { type: String, required: false },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("File", fileSchema);
