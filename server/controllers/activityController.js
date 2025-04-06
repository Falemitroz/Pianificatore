const Activity = require("../models/activity");
const Trip = require("../models/trip");

// Creazione di un'attività
exports.createActivity = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante la creazione dell'attività:", error);
        res.status(500).json({ error: "Errore del server durante la creazione dell'attività." });
    }
};

// Recupero di tutte le attività di un viaggio
exports.getActivitiesByTrip = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante il recupero delle attività del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante il recupero delle attività." });
    }
};

// Recupero di un'attività specifica
exports.getActivityById = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante il recupero dell'attività:", error);
        res.status(500).json({ error: "Errore del server durante il recupero dell'attività." });
    }
};

// Aggiornamento di un'attività
exports.updateActivity = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Errore durante l'aggiornamento dell'attività:", error);
        res.status(500).json({ error: "Errore del server durante l'aggiornamento dell'attività." });
    }
};

// Eliminazione di un'attività
exports.deleteActivity = async (req, res) => {
    try {

    } catch (error) {
        console.error("Errore durante l'eliminazione dell'attività:", error);
        res.status(500).json({ error: "Errore del server durante l'eliminazione dell'attività." });
    }
};
