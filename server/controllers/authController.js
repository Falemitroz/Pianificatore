const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = "secret";

exports.signup = async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        console.log("Tentativo di registrazione:", { nome, email, password });

        if (!nome || !email || !password) {
            console.warn("Campi mancanti durante la registrazione");
            return res.status(400).json({ error: "Tutti i campi sono obbligatori." });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.warn(`Registrazione fallita: utente già esistente con email ${email}`);
            return res.status(400).json({ error: "Utente già esistente." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ nome, email, password: hashedPassword });

        const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

        console.log("Registrazione riuscita per utente:", newUser.id);

        res.status(201).json({ id: newUser.id, nome: newUser.nome, token });
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        res.status(500).json({ error: "Errore del server durante la registrazione." });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Tentativo di login per email:", email);

        if (!email || !password) {
            console.warn("Campi mancanti durante il login");
            return res.status(400).json({ error: "Email e password sono obbligatori." });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.warn(`Login fallito: utente non trovato con email ${email}`);
            return res.status(404).json({ error: "Utente non trovato." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.warn(`Login fallito: password errata per email ${email}`);
            return res.status(401).json({ error: "Password errata." });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

        console.log("Login riuscito per utente:", user.id);

        res.status(200).json({ id: user.id, nome: user.nome, token });
    } catch (error) {
        console.error("Errore durante il login:", error);
        res.status(500).json({ error: "Errore del server durante il login." });
    }
};

exports.logout = async (req, res) => {
    try {
        console.log("Logout richiesto");
        return res.status(200).json({ message: "Logout effettuato con successo" });
    } catch (error) {
        console.error("Errore durante il logout:", error);
        return res.status(500).json({ message: "Errore del server durante il logout." });
    }
};
