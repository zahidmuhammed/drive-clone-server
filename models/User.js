// models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        googleId: { type: String, required: true },
        username: { type: String, required: true },
        thumbnail: { type: String, required: true },
        email: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
