import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

const travelLinks = [
  {
    name: "Skyscanner",
    description: "Trova i voli più economici per le tue destinazioni preferite.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1", // Immagine generica
    link: "https://www.skyscanner.it",
  },
  {
    name: "Booking.com",
    description: "Prenota hotel e alloggi ovunque nel mondo.",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659",
    link: "https://www.booking.com",
  },
  {
    name: "Rentalcars",
    description: "Noleggia auto ovunque in modo semplice e veloce.",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def",
    link: "https://www.rentalcars.com",
  },
];

const TripDetails = () => {
  return (
    <Box sx={{ padding: 4, marginTop: 7 }}>
      <Typography variant="h4" gutterBottom textAlign="center" marginBottom={4}>
        Servizi di Viaggio
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {travelLinks.map((service) => (
          <Grid item xs={12} sm={4} key={service.name}>
            <Card sx={{ maxWidth: 345, margin: "auto" }}>
              <CardMedia
                component="img"
                height="180"
                image={service.image}
                alt={service.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {service.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: "center", pb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vai al sito
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TripDetails;
