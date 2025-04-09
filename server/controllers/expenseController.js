const Expense = require("../models/expense");
const User = require("../models/user");
const Trip = require("../models/trip");

// Creazione di una spesa
exports.createExpense = async (req, res) => {
    try {
      console.log("Tentativo di creazione spesa:", req.body);
  
      
      const { nome, creatore_id, dataInizio, dataFine, destinazione, budget } = req.body;
  
      
      const result = await pool.query(
        'INSERT INTO spese (nome, creatore_id, "dataInizio", "dataFine", destinazione, budget) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [nome, creatore_id, dataInizio, dataFine, destinazione, budget]
      );
  
      
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Errore durante la creazione della spesa:", error);
      res.status(500).json({ error: "Errore del server durante la creazione della spesa." });
    }
  };

// Recupero tutte le spese di un viaggio
exports.getExpensesByTrip = async (req, res) => {
    try {
      const tripId = req.params.tripId;
  
      
      const result = await pool.query(
        'SELECT * FROM spese WHERE viaggio_id = $1', 
        [tripId]
      );
  
      
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Errore durante il recupero delle spese del viaggio:", error);
      res.status(500).json({ error: "Errore del server durante il recupero delle spese." });
    }
  };

// Recupero tutte le spese di un utente
exports.getExpensesByUser = async (req, res) => {
    try {
      const userId = req.params.userId; 
  
      
      const result = await pool.query(
        'SELECT * FROM spese WHERE creatore_id = $1',
        [userId]
      );
  
    
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Errore durante il recupero delle spese dell'utente:", error);
      res.status(500).json({ error: "Errore del server durante il recupero delle spese." });
    }
  };

// Recupero di una singola spesa
exports.getExpenseById = async (req, res) => {
    try {
      const expenseId = req.params.expenseId;
  
      
      const result = await pool.query(
        'SELECT * FROM spese WHERE id = $1',
        [expenseId]
      );
  
    
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Spesa non trovata.' });
      }
  
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Errore durante il recupero della spesa:", error);
      res.status(500).json({ error: "Errore del server durante il recupero della spesa." });
    }
  };

// Aggiornamento di una spesa
exports.updateExpense = async (req, res) => {
    try {
      const expenseId = req.params.expenseId; // Assumi che l'ID della spesa sia passato come parametro dell'URL
      const { nome, creatore_id, dataInizio, dataFine, destinazione, budget } = req.body; // Dati da aggiornare
  
      
      const result = await pool.query(
        'UPDATE spese SET nome = $1, creatore_id = $2, "dataInizio" = $3, "dataFine" = $4, destinazione = $5, budget = $6 WHERE id = $7 RETURNING *',
        [nome, creatore_id, dataInizio, dataFine, destinazione, budget, expenseId]
      );
  
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Spesa non trovata.' });
      }
  
      
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della spesa:", error);
      res.status(500).json({ error: "Errore del server durante l'aggiornamento della spesa." });
    }
  };

// Eliminazione di una spesa
exports.deleteExpense = async (req, res) => {
    try {
      const expenseId = req.params.expenseId; // Assumi che l'ID della spesa sia passato come parametro dell'URL
  
      
      const result = await pool.query(
        'DELETE FROM spese WHERE id = $1 RETURNING *',
        [expenseId]
      );
  
      
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Spesa non trovata.' });
      }
  
      
      res.status(200).json({ message: 'Spesa eliminata con successo.', deletedExpense: result.rows[0] });
    } catch (error) {
      console.error("Errore durante l'eliminazione della spesa:", error);
      res.status(500).json({ error: "Errore del server durante l'eliminazione della spesa." });
    }
  };