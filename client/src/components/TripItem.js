import React from "react";
import { Link } from "react-router-dom";

const TripItem = ({ trip }) => {
  return (
    <li>
      <strong>{trip.nome}</strong> – {trip.destinazione} (Partenza:{trip.dataInizio} Ritorno:{trip.dataFine})
      <button><Link to={`/trip-details/${trip.id}`}>Vai ai dettagli</Link></button>
    </li>
  );
};

export default TripItem;
