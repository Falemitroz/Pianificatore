import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from './Modal';

const TripItem = ({ trip }) => {

  const [ showDetails, setShowDetails ] = useState(false);

  return (
    <li>
      <strong>{trip.nome}</strong> – {trip.destinazione}
        (Partenza:{trip.dataInizio} 
         Ritorno:{trip.dataFine}
         Budget:{trip.budget})
      <button onClick={() => setShowDetails(true)}>TripDetails</button>
      <Modal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={trip.nome}
      >
        <p>Contenuto di esempio. Puoi inserirci tutto quello che vuoi.</p>
      </Modal>
    </li>
  );
};

export default TripItem;
