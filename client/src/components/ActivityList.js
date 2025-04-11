import React, { useContext, useEffect, useState } from "react";
 import AuthContext from "../context/AuthContext";
 import { List, ListItem, Typography, Container, Card, CardContent,} from "@mui/material";
 import "../styles/TripItem.css";

 const ActivityList = ({ trip }) => {
  const { getActivitiesByTrip } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
  const fetchActivityData = async () => {
  try {
  const res = await getActivitiesByTrip(trip.id);
  setActivities(res);
  } catch (error) {
  console.error("Errore nel fetch dei dati:", error);
  }
  };

  fetchActivityData();
  }, [getActivitiesByTrip, trip.id]);

  return (
  <Container>
  {activities && activities.length === 0 ? (
  <Typography variant="body1" className="no-activities">
  Nessuna attività programmata.
  </Typography>
  ) : (
  <List className="trip-activities">
  {activities.map((activity, index) => (
  <ListItem key={index}>
  <Card sx={{ width: "100%" }}>
  <CardContent>
  <Typography variant="h6" component="div">
  {activity.nome}
  </Typography>
  <Typography variant="body2" color="text.secondary">
  {activity.descrizione}
  </Typography>
  <Typography variant="body2">Data: {activity.data}</Typography>
  <Typography variant="body2">Ora: {activity.ora}</Typography>
  <Typography variant="body2">Luogo: {activity.luogo}</Typography>
  </CardContent>
  </Card>
  </ListItem>
  ))}
  </List>
  )}
  </Container>
  );
 };

 export default ActivityList;