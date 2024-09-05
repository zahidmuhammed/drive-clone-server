// middlewares/authMiddleware.js

module.exports.ensureAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        message: "Authentication is required to access this resource",
    });
};
