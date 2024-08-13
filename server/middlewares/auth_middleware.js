const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, Token not provided" });
    }

    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("Token from auth middleware:", jwtToken);

    try {
        const decodedToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log('Decoded token payload:', decodedToken);

        const userId = decodedToken.id;

        const userData = await User.findById(userId).select({ password: 0 });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;