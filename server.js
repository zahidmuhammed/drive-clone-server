const cors = require("cors");
const express = require("express");
const passport = require("passport");
const session = require("express-session");

require("dotenv").config();
require("./config/passport-setup");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const fileRoutes = require("./routes/fileRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: [
            "https://drive-clone-client.vercel.app",
            "http://localhost:3000",
            "http://localhost:3001",
        ],
        credentials: true,
    })
);

app.use(express.json());
app.set("trust proxy", 1);
app.use(
    session({
        name: "myDriveCookie",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        proxy: true,
        cookie: {
            secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS
            httpOnly: false, // Prevents JavaScript from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: "None",
        },
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
app.get("/", (req, res) => {
    res.send("Welcome to the Drive API!");
});

app.use("/api/files", fileRoutes);
app.use("/api/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
