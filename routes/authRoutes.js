// routes/authRoutes.js

const express = require("express");
const passport = require("passport");
const router = express.Router();

// Auth with Google
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

// Google auth callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect("/dashboard");
    }
);

// Logout route
router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

// Get current user info
router.get("/current_user", (req, res) => {
    res.send(req.user);
});

module.exports = router;
