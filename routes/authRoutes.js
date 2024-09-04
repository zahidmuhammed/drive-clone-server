const express = require("express");
const passport = require("passport");
const router = express.Router();

const CLIENT_URL = "http://localhost:3000";
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
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: `${CLIENT_URL}/login`,
    })
);

// Logout route
router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect(`${CLIENT_URL}/login`);
    });
});

// Get current user info
router.get("/current_user", (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.status(404).json({
            message: "User Not Found",
        });
    }
});

module.exports = router;
