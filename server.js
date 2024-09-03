// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const session = require("express-session");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

// Routes
app.use("/api/files", fileRoutes);
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
