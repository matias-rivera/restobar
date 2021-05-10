const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models").User;

//check token
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    console.log(req.headers);
    //if token is in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //get the token from header
            //[0] = Bearer , [1] = token
            token = req.headers.authorization.split(" ")[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //get user and remove password
            req.user = await User.findByPk(decoded.id);
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    //if there is not token
    if (!token) {
        res.status(401);
        throw new Error("Not authorized");
    }
});

exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized, admin only");
    }
};
