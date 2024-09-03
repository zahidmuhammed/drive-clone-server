// config/passport-setup.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if the user already exists in our database
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    // User already exists
                    done(null, user);
                } else {
                    // If not, create a new user in our database
                    user = new User({
                        googleId: profile.id,
                        username: profile.displayName,
                        thumbnail: profile._json.picture,
                    });
                    await user.save();
                    done(null, user);
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});
