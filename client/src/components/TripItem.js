// ...import (rimangono invariati)
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Box,
  Grid,
  Avatar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";
import { MdOutlineArrowCircleLeft, MdOutlineArrowCircleRight } from "react-icons/md";

import ActivityList from "./ActivityList";
import AuthContext from "../context/AuthContext";

const TripItem = ({ trip, onTripUpdated }) => {
  const { user, updateTrip, deleteTrip, profileImage } = useContext(AuthContext);

  const [showActivities, setShowActivities] = useState(false);
  const [imagePreview, setImagePreview] = useState('/static/images/avatar/2.jpg');
  const [editOpen, setEditOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [imageData, setImageData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [updatedData, setUpdatedData] = useState({
    nome: trip.nome,
    destinazione: trip.destinazione,
    dataInizio: trip.dataInizio,
    dataFine: trip.dataFine,
    budget: trip.budget,
  });

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem(`tripImages-${trip.id}`)) || [];
    if (savedImages.length > 0) {
      setImageData(savedImages);
      setCurrentImageIndex(savedImages.length - 1);
    }
  }, [trip.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        const updatedImages = [...imageData, base64Image];
        localStorage.setItem(`tripImages-${trip.id}`, JSON.stringify(updatedImages));
        setImageData(updatedImages);
        setCurrentImageIndex(updatedImages.length - 1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTripUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedTrip = await updateTrip(trip.id, updatedData);
      setUpdatedData(updatedTrip);
      onTripUpdated();
      setEditOpen(false);
    } catch (error) {
      console.error("Errore nell'aggiornamento del viaggio:", error);
    }
  };

  const handleTripDelete = async () => {
    try {
      await deleteTrip(trip.id);
      onTripUpdated();
      localStorage.removeItem(`tripImages-${trip.id}`);
      setConfirmDeleteOpen(false);
      setEditOpen(false);
    } catch (error) {
      console.error("Errore nella cancellazione del viaggio:", error);
    }
  };

  const handleChange = (field) => (e) => {
    setUpdatedData({ ...updatedData, [field]: e.target.value });
  };

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <Card sx={{ width: 345, marginBottom: 5 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "#1976d2" }}
              aria-label="trip"
              src={user.nome === trip.creatore ? profileImage : imagePreview}
            >
              {!imagePreview && <CameraAltIcon fontSize="large" />}
            </Avatar>
          }
          action={
            user.nome === trip.creatore && (
              <IconButton 
                aria-label="Modifica viaggio" 
                onClick={() => setEditOpen(true)}
                sx ={{"&:hover": { backgroundColor: "transparent" }, fontSize: "1.5rem", color: "#50a6db" }}>
                <EditIcon />
              </IconButton>
            )
          }
          title={trip.nome}
          subheader={`Destinazione: ${trip.destinazione}`}
        />

        <CardMedia 
          component="img"
          height="194"
          image={imageData.length > 0 ? imageData[currentImageIndex] : "/assets/addTripPhoto.png"}
          onClick={() => {
            if (user.nome === trip.creatore) fileInputRef.current.click();
          }}
          sx={{ cursor: user.nome === trip.creatore ? "pointer" : "default" }}/>

        {imageData.length > 1 && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
            <Button
              size="small"
              onClick={() =>
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
                )
              }
              sx ={{"&:hover": { backgroundColor: "transparent" }, fontSize: "1.5rem", color: "#50a6db" }}
            >
              <MdOutlineArrowCircleLeft />
            </Button>
            <Button
              size="small"
              onClick={() =>
                setCurrentImageIndex((prevIndex) =>
                  prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
                )
              }
              sx ={{"&:hover": { backgroundColor: "transparent" }, fontSize: "1.5rem", color: "#50a6db"}}
            >
              <MdOutlineArrowCircleRight />
            </Button>
          </Box>
        )}

        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Partenza: ${format(new Date(trip.dataInizio), 'dd/MM/yyyy')}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Ritorno: ${format(new Date(trip.dataFine), 'dd/MM/yyyy')}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Budget: €${trip.budget}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {`Creatore: ${trip.creatore || 'Sconosciuto'}`}
          </Typography>
        </CardContent>

        {/* Grid con due colonne centrate */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 2, py: 1 }}>
          <Grid item xs={6} display="flex" justifyContent="center">
            <IconButton 
              aria-label="trip-details"
              sx={{
                "&:hover": { backgroundColor: "transparent" },
                fontSize: "1.5rem", 
                color: "#50a6db",
              }}
              component="a"
              href="/trip-details"
            >
              <VisibilityIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="center">
            <ExpandMore
              expand={showActivities}
              onClick={() => setShowActivities(!showActivities)}
              aria-expanded={showActivities}
              aria-label="show more"
              sx={{
                "&:hover": { backgroundColor: "transparent" }, 
                fontSize: "1.5rem", 
                color: "#50a6db",
              }}
            >
              <ExpandMoreIcon sx={{ transform: showActivities ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </ExpandMore>
          </Grid>
        </Grid>

        <Collapse in={showActivities} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>Attività programmate:</Typography>
            <ActivityList trip={trip} />
          </CardContent>
        </Collapse>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
          <DialogTitle>Modifica Viaggio</DialogTitle>
          <DialogContent>
            <TextField margin="dense" label="Nome" fullWidth value={updatedData.nome} onChange={handleChange("nome")} />
            <TextField margin="dense" label="Destinazione" fullWidth value={updatedData.destinazione} onChange={handleChange("destinazione")} />
            <TextField margin="dense" label="Data Inizio" type="date" fullWidth value={updatedData.dataInizio.slice(0, 10)} onChange={handleChange("dataInizio")} InputLabelProps={{ shrink: true }} />
            <TextField margin="dense" label="Data Fine" type="date" fullWidth value={updatedData.dataFine.slice(0, 10)} onChange={handleChange("dataFine")} InputLabelProps={{ shrink: true }} />
            <TextField margin="dense" label="Budget (€)" type="number" fullWidth value={updatedData.budget} onChange={handleChange("budget")} />
          </DialogContent>
          <DialogActions component="form" onSubmit={handleTripUpdate}>
            <Button onClick={() => setConfirmDeleteOpen(true)} color="error" startIcon={<DeleteIcon />} />
            <Button onClick={() => setEditOpen(false)} sx={{ "&:hover": { backgroundColor: "transparent", boxShadow: "none" } }}>Annulla</Button>
            <Button type="submit" onClick={handleTripUpdate} variant="contained">Salva</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
          <DialogTitle sx={{ maxWidth: "86%" }}>Sei sicuro?</DialogTitle>
          <DialogContent>
            <Typography>
              Vuoi davvero eliminare il viaggio "{trip.nome}"?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDeleteOpen(false)} sx={{ "&:hover": { backgroundColor: "transparent", boxShadow: "none" } }}>Annulla</Button>
            <Button onClick={handleTripDelete} color="error" variant="contained" sx={{ backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#f44336" } }}>
              Elimina
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
};

export default TripItem;
