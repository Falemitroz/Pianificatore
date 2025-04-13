import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import TripItem from "./TripItem";
import { useNavigate } from "react-router-dom";
import { TextField, Button, List, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";

const TripList = () => {
  const { user, createTrip, getAllTrips } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTrip, setNewTrip] = useState({
    nome: "",
    creatore: "",
    destinazione: "",
    dataInizio: "",
    dataFine: "",
    budget: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getAllTrips();
        setTrips(res);
      } catch (error) {
        console.error("Errore durante il recupero dei trips:", error);
        if (error.response && error.response.status === 401) {
          alert("Sessione scaduta. Autenticati nuovamente per continuare.");
          navigate("/");
        }
      }
    };

    fetchTrips();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTrip = async (e) => {
    e.preventDefault();
    try {
      const tripData = {
        nome: newTrip.nome,
        creatore: user.nome,
        destinazione: newTrip.destinazione,
        dataInizio: newTrip.dataInizio,
        dataFine: newTrip.dataFine,
        budget: newTrip.budget
      };

      await createTrip(tripData);
      const updatedTrips = await getAllTrips();
      setTrips(updatedTrips);
      setNewTrip({
        nome: "",
        creatore: "",
        destinazione: "",
        dataInizio: "",
        dataFine: "",
        budget: "",
      });
      handleClose();
    } catch (error) {
      console.error("Errore durante la creazione del viaggio:", error);
    }
  };

  const refreshTrips = async () => {
    const updatedTrips = await getAllTrips();
    setTrips(updatedTrips);
  };

  return (
    <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>

      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 3, marginTop: "50px", backgroundColor: "#50a6db" }}>
        Aggiungi Viaggio
      </Button>

      {/* 🔽 MODALE FORM */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Aggiungi un nuovo viaggio</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleAddTrip} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label="Nome del viaggio"
              value={newTrip.nome}
              onChange={(e) => setNewTrip({ ...newTrip, nome: e.target.value })}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Destinazione"
              value={newTrip.destinazione}
              onChange={(e) =>
                setNewTrip({ ...newTrip, destinazione: e.target.value })
              }
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Partenza"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newTrip.dataInizio}
              onChange={(e) =>
                setNewTrip({ ...newTrip, dataInizio: e.target.value })
              }
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Ritorno"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newTrip.dataFine}
              onChange={(e) =>
                setNewTrip({ ...newTrip, dataFine: e.target.value })
              }
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Budget"
              type="number"
              value={newTrip.budget}
              onChange={(e) =>
                setNewTrip({ ...newTrip, budget: e.target.value })
              }
              required
              margin="normal"
            />
            <DialogActions sx={{ px: 0 }}>
              <Button onClick={handleClose}>Annulla</Button>
              <Button type="submit" variant="contained" color="primary">
                Salva
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Lista dei viaggi */}
      <List>
        {trips.length === 0 ? (
          <Typography variant="body1">Nessun viaggio disponibile</Typography>
        ) : (
          trips.map((trip, index) => (
            <TripItem key={index} trip={trip} onTripUpdated={refreshTrips}/>
          ))
        )}
      </List>
    </Container>
  );
};

export default TripList;
