import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

const TripItem = ({ trip }) => {
  return (
    <ListItem>
      <ListItemText
        primary={trip.nome}
        secondary={`${trip.destinazione} (Partenza: ${trip.dataInizio}, Ritorno: ${trip.dataFine}, Budget: ${trip.budget}€)`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="details" component={Link} to={` /trip-details/${trip.id}`}>
          <VisibilityIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TripItem;

