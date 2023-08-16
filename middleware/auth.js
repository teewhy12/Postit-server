const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer" )) {
        return res.status(401).json({ success: false, msg: "Auth Failed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, email: payload.email };
        next();
    } catch (error) {
        res.status(401).json({ success: false, msg: "Auth Failed" });
    }
};

module.exports = auth;