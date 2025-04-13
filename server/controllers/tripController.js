const Trip = require("../models/trip");
const User = require("../models/user");

// 🔹 Crea un nuovo viaggio
exports.createTrip = async (req, res) => {
    try {

        const { nome, destinazione, dataInizio, dataFine, budget, creatore } = req.body;

        const newTrip = await Trip.create({
            nome,
            destinazione,
            dataInizio,
            dataFine,
            budget,
            creatore,
            creatore_id: req.user.userId
        });

        res.status(201).json(newTrip);
    } catch (error) {
        console.error("Errore durante la creazione del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante la creazione del viaggio." });
    }
};

// 🔹 Recupera tutti i viaggi
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.findAll({
            include: {
                model: User,
                attributes: ['id', 'nome']
            }
        });

        if(!trips) return res.status(404).json({ message: "Nessun viaggio trovato." });

        res.status(200).json(trips);
    } catch (error) {
        console.error("Errore durante il recupero dei viaggi:", error);
        res.status(500).json({ error: "Errore del server durante il recupero dei viaggi." });
    }
};

// 🔹 Recupera un viaggio specifico per ID
exports.getTripById = async (req, res) => {
    try {
        const { tripID } = req.params;

        const trip = await Trip.findByPk(tripID, {
            include: {
                model: User,
                attributes: ['id', 'nome']
            }
        });

        if (!trip) return res.status(404).json({ error: "Viaggio non trovato" });

        res.status(200).json(trip);
    } catch (error) {
        console.error("Errore durante il recupero del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante il recupero del viaggio." });
    }
};

// 🔹 Recupera tutti i viaggi dell'utente loggato
exports.getTripsByUser = async (req, res) => {
    try {
        const creatore_id = req.user.userId;

        const trips = await Trip.findAll({ where: { creatore_id } });

        res.status(200).json(trips);
    } catch (error) {
        console.error("Errore durante il recupero dei viaggi dell'utente:", error);
        res.status(500).json({ error: "Errore del server durante il recupero dei viaggi dell'utente." });
    }
};

// 🔹 Aggiorna un viaggio
exports.updateTrip = async (req, res) => {
    try {
        const { tripID } = req.params;
        const { nome, destinazione, dataInizio, dataFine, budget } = req.body;

        console.log("tripData:", req.body);

        const trip = await Trip.findByPk(tripID);

        if (!trip) return res.status(404).json({ error: "Viaggio non trovato" });

        if (trip.creatore_id !== req.user.userId) {
            return res.status(403).json({ error: "Non hai i permessi per modificare questo viaggio" });
        }

        trip.nome = nome ?? trip.nome;
        trip.destinazione = destinazione ?? trip.destinazione;
        trip.dataInizio = dataInizio ?? trip.dataInizio;
        trip.dataFine = dataFine ?? trip.dataFine;
        trip.budget = budget ?? trip.budget;

        await trip.save();

        res.status(200).json(trip);
    } catch (error) {
        console.error("Errore durante l'aggiornamento del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante l'aggiornamento del viaggio." });
    }
};

// 🔹 Elimina un viaggio
exports.deleteTrip = async (req, res) => {
    try {
        const { tripID } = req.params;

        const trip = await Trip.findByPk(tripID);

        if (!trip) return res.status(404).json({ error: "Viaggio non trovato" });

        if (trip.creatore_id !== req.user.userId) {
            return res.status(403).json({ error: "Non hai i permessi per eliminare questo viaggio" });
        }

        await trip.destroy();

        res.status(200).json({ message: "Viaggio eliminato con successo" });
    } catch (error) {
        console.error("Errore durante l'eliminazione del viaggio:", error);
        res.status(500).json({ error: "Errore del server durante l'eliminazione del viaggio." });
    }
};
