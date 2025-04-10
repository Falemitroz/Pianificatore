const { Activity } = require("../models/activity");
const { Trip }= require("../models/trip");

// Creazione di un'attività
exports.createActivity = async (req, res) => {
    try {
        const { tripId, name, description, location, date, duration } = req.body;
      
        // chiedere ad ale se l'ID del viaggio è fornito (se l'attività è associata a un viaggio)
        if (tripId) {
            const trip = await Trip.findByPk(tripId);
            if (!trip) {
                return res.status(404).json({ error: 'Viaggio non trovato.' });
            }
        }
        const newActivity = await Activity.create({
            tripId, // Sarà nullo se l'attività non è associata a un viaggio specifico
            name,
            description,
            location,
            date,
            duration,
        });
      
        res.status(201).json(newActivity);

    } catch (error) {
        console.error("Errore durante la creazione dell'attività:", error);
        res.status(500).json({ error: "Errore del server durante la creazione dell'attività." });
    }
};

// Recupero delle attività associate a un particolare viaggio
exports.getActivitiesByTrip = async (req, res) => {
    const { tripID } = req.params;
    try {
      const trip = await Trip.findByPk(tripID);
      if (!trip) {
        return res.status(404).json({ error: 'Viaggio non trovato.' });
      }
      const activities = await Activity.findAll({
        where: { id: tripID },
      });
      res.status(200).json(activities);
    } catch (error) {
      console.error(`Errore durante il recupero delle attività per il viaggio con ID ${tripId}:`, error);
      res.status(500).json({ error: 'Errore del server durante il recupero delle attività del viaggio.' });
    }
};

// Recupero di un'attività specifica per id (per eventuali barre di ricerca)
exports.getActivityById = async (req, res) => {
    const { id } = req.params;
    try {

        const activity = await Activity.findByPk(id);

        if (!activity) return res.status(404).json({ error: 'Attività non trovata.' });

        res.status(200).json(activity);

    } catch (error) {

        console.error(`Errore durante il recupero dell'attività con ID ${id}:`, error);
        res.status(500).json({ error: "Errore del server durante il recupero dell'attività." });
    }
};

// Aggiornamento di un'attività
exports.updateActivity = async (req, res) => {
    const { id } = req.params;
    const { name, description, location, date, duration } = req.body;
  
    try {
      const activity = await Activity.findByPk(id);
      if (!activity) {
        return res.status(404).json({ error: 'Attività non trovata.' });
      }

      activity.name = name;
      activity.description = description;
      activity.location = location;
      activity.date = date;
      activity.duration = duration;
  
      await activity.save();
      res.status(200).json(activity);
    } catch (error) {
        console.error(`Errore durante l'aggiornamento dell'attività con ID ${id}:`, error);
        res.status(500).json({ error: "Errore del server durante l'aggiornamento dell'attività." });
    }
};

// Eliminazione di un'attività
exports.deleteActivity = async (req, res) => {
    const { id } = req.params;
    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
          return res.status(404).json({ error: 'Attività non trovata.' });
        }
        await activity.destroy();
        res.status(204).send(); // 204 No Content: la richiesta è andata a buon fine ma non ha contenuto da inviare indietro
    } catch (error) {
        console.error(`Errore durante l'eliminazione dell'attività con ID ${id}:`, error);
        res.status(500).json({ error: "Errore del server durante l'eliminazione dell'attività." });
    }
};
