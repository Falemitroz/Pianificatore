const jwt = require("jsonwebtoken");
require("dotenv").config(); // Assicura che carichi la JWT_SECRET da .env


// Middleware di autenticazione
const authMiddleware = (req, res, next) => {
    // Il token può arrivare dagli header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token mancante o formato non valido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, "supersecret");
        req.user = { userId: decoded.userId }; // oppure decoded.userId, dipende da come lo generi
        next();
    } catch (error) {
        console.error("Token non valido:", error);
        return res.status(401).json({ error: "Token non valido o scaduto" });
    }
};

module.exports = { authMiddleware };
