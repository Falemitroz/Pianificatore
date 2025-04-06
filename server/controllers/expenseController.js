const Expense = require("../models/expense");
const User = require("../models/user");
const Trip = require("../models/trip");

// Creazione di una spesa
exports.createExpense = async (req, res) => {
    try {
        console.log("Tentativo di creazione spesa:", req.body);
    } catch (error) {
        console.error("Errore durante la creazione della spesa:", error);
        res.status(500).json({ error: "Errore del server durante la creazione della spesa." });
    }
};

// Recupero tutte le spese di un viaggio
exports.getExpensesByTrip = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante il recupero delle spese del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante il recupero delle spese." });
    }
};

// Recupero tutte le spese di un utente
exports.getExpensesByUser = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante il recupero delle spese dell'utente:", error);
        res.status(500).json({ error: "Errore del server durante il recupero delle spese." });
    }
};

// Recupero di una singola spesa
exports.getExpenseById = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante il recupero della spesa:", error);
        res.status(500).json({ error: "Errore del server durante il recupero della spesa." });
    }
};

// Aggiornamento di una spesa
exports.updateExpense = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante l'aggiornamento della spesa:", error);
        res.status(500).json({ error: "Errore del server durante l'aggiornamento della spesa." });
    }
};

// Eliminazione di una spesa
exports.deleteExpense = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante l'eliminazione della spesa:", error);
        res.status(500).json({ error: "Errore del server durante l'eliminazione della spesa." });
    }
};
