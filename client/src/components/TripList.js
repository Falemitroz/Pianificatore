import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import TripItem from "./TripItem";
import { useNavigate } from "react-router-dom";

const TripList = () => {
  const { user, getTrips } = useContext(AuthContext);
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState(
    { nome: "", creatore: "", destinazione: "", dataInizio: "", dataFine: "", budget: "" });
  const navigate = useNavigate();

  // 🔄 useEffect per caricare i dati una volta sola al montaggio
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await getTrips(); // recupera la lista dei viaggi
        setTrips(res); // aggiorna lo stato dei viaggi
      } catch (error) {
        console.error("Errore durante il recupero dei trips:", error);
        if (error.response && error.response.status === 401) {
          alert("Sessione scaduta. Autenticati nuovamente per continuare.");
          navigate("/authForm");
        }
      }
    };

    fetchTrips();
  }, []); // Eseguito solo al primo render

  const handleAddTrip = () => {
    if (newTrip.nome && newTrip.destinazione && newTrip.data) {
      // Crea un nuovo viaggio da aggiungere alla lista
      const nuovoViaggio = {
        nome: newTrip.nome,
        creatore: user.nome,
        destinazione: newTrip.destinazione,
        dataInizio: newTrip.dataInizio,
        dataFine: newTrip.dataFine,
        budget: newTrip.budget
      };

      // Aggiungi il nuovo viaggio alla lista
      setTrips([...trips, nuovoViaggio]);

      // Pulisci i campi di input
      setNewTrip({ nome: "", creatore: "", destinazione: "", dataInizio: "", dataFine: "", budget: "" });
    }
  };

  return (
    <div>
      <h1>TripList</h1>

      {/* Form per aggiungere un nuovo viaggio */}
      <input
        type="text"
        placeholder="Nome del viaggio"
        value={newTrip.nome}
        onChange={(e) => setNewTrip({ ...newTrip, nome: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Destinazione"
        value={newTrip.destinazione}
        onChange={(e) => setNewTrip({ ...newTrip, destinazione: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Partenza"
        value={newTrip.dataInizio}
        onChange={(e) => setNewTrip({ ...newTrip, dataInizio: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Ritorno"
        value={newTrip.dataFine}
        onChange={(e) => setNewTrip({ ...newTrip, dataFine: e.target.value })}
        required
      />
      <input
        type="integer"
        placeholder="Budget"
        value={newTrip.budget}
        onChange={(e) => setNewTrip({ ...newTrip, budget: e.target.value })}
        required
      />
      <button onClick={handleAddTrip}>Aggiungi Viaggio</button>

      {/* Lista dei viaggi */}
      <ul>
        {trips.length === 0 ? (
          <p>Nessun viaggio disponibile</p>
        ) : (
          trips.map((trip, index) => <TripItem key={index} trip={trip} />)
        )}
      </ul>
    </div>
  );
};

export default TripList;
