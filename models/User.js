// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true },
        username: { type: String, required: true },
        thumbnail: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
