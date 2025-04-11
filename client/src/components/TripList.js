import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import TripItem from "./TripItem";
import { useNavigate } from "react-router-dom";
import { TextField, Button, List, ListItem, ListItemText, Container, Typography,} from "@mui/material";

const TripList = () => {
  const { user, getTrips } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
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
        const res = await getTrips();
        setTrips(res);
      } catch (error) {
        console.error("Errore durante il recupero dei trips:", error);
        if (error.response && error.response.status === 401) {
          alert("Sessione scaduta. Autenticati nuovamente per continuare.");
          navigate("/authForm");
        }
      }
    };

    fetchTrips();
  }, []);

  const handleAddTrip = () => {
    if (newTrip.nome && newTrip.destinazione && newTrip.dataInizio && newTrip.dataFine && newTrip.budget) {
      const nuovoViaggio = {
        nome: newTrip.nome,
        creatore: user.nome,
        destinazione: newTrip.destinazione,
        dataInizio: newTrip.dataInizio,
        dataFine: newTrip.dataFine,
        budget: newTrip.budget,
      };

      setTrips([...trips, nuovoViaggio]);
      setNewTrip({ nome: "", creatore: "", destinazione: "", dataInizio: "", dataFine: "", budget: "" });
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        TripList
      </Typography>

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
        onChange={(e) => setNewTrip({ ...newTrip, destinazione: e.target.value })}
        required
        margin="normal"
      />
       <TextField
        fullWidth
        label="Partenza"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={newTrip.dataInizio}
        onChange={(e) => setNewTrip({ ...newTrip, dataInizio: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Ritorno"
         type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={newTrip.dataFine}
        onChange={(e) => setNewTrip({ ...newTrip, dataFine: e.target.value })}
        required
        margin="normal"
      />
      <TextField
        fullWidth
        label="Budget"
        type="number"
        value={newTrip.budget}
        onChange={(e) => setNewTrip({ ...newTrip, budget: e.target.value })}
        required
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddTrip}>
        Aggiungi Viaggio
      </Button>

      <List>
        {trips.length === 0 ? (
          <Typography variant="body1">Nessun viaggio disponibile</Typography>
        ) : (
          trips.map((trip, index) => (
            <ListItem key={index}>
              <ListItemText primary={trip.nome} secondary={`${trip.destinazione} (${trip.dataInizio} - ${trip.dataFine}) - Budget: ${trip.budget}€`} />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
};

export default TripList;