import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import ActivityItem from "./ActivityItem";
import { List, Typography, Container, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "../styles/TripItem.css";

const ActivityList = ({ trip }) => {
  const { getActivitiesByTrip, createActivity } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  
  // Stato per il controllo del modulo di creazione
  const [open, setOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [data, setData] = useState('');  // data e orario nel formato 'YYYY-MM-DDTHH:mm'
  const [luogo, setLuogo] = useState('');

  
  // Funzione per recuperare le attività associate al viaggio
  const fetchActivityData = async () => {
    try {
      const res = await getActivitiesByTrip(trip.id);
      setActivities(res);
    } catch (error) {
      console.error("Errore nel fetch dei dati:", error);
    }
  };
  useEffect(() => {
    fetchActivityData();
  }, [getActivitiesByTrip, trip.id]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();

    // Crea l'oggetto dell'attività secondo il modello
    const newActivity = {
      nome: nome,
      descrizione: descrizione,
      data: data,  // La data e l'orario saranno inclusi in un unico campo
      luogo: luogo,
      itinerario_id: trip.id  // L'attività è associata al viaggio
    };

    console.log("Creazione nuova attività:", newActivity);

    try {
      const response = await createActivity(newActivity);
      fetchActivityData();
      handleClose();
    } catch (error) {
      console.error("Errore durante la creazione dell'attività:", error);
    }
  };

  return (
    <Container>
      {/* Bottone per aprire il modulo di creazione attività */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Crea Nuova Attività
      </Button>

      {/* Dialogo per il modulo di creazione attività */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Creare una nuova attività</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Descrizione"
            type="text"
            fullWidth
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Data"
            type="date"
            fullWidth
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            label="Luogo"
            type="text"
            fullWidth
            value={luogo}
            onChange={(e) => setLuogo(e.target.value)}
          />
        </DialogContent>
        <DialogActions component="form" onSubmit={handleCreateActivity}>
          <Button onClick={handleClose} color="secondary">
            Annulla
          </Button>
          <Button type="submit" onClick={handleCreateActivity} color="primary">
            Salva
          </Button>
        </DialogActions>
      </Dialog>

      {/* Visualizza le attività esistenti */}
      {activities.length === 0 ? (
        <Typography variant="body1" className="no-activities">
          Nessuna attività programmata.
        </Typography>
      ) : (
        <List className="trip-activities">
          {activities.map((activity, index) => (
            <ActivityItem key={index} activity={activity} />
          ))}
        </List>
      )}
    </Container>
  );
};

export default ActivityList;
