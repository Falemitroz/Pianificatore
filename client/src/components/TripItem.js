import React, { useState, useContext } from "react";
import { format } from "date-fns";
import '../styles/TripItem.css';
import ActivityList from "./ActivityList";
import AuthContext from "../context/AuthContext";

const TripItem = ({ trip }) => {

  const { createActivity } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    nome: "",
    descrizione: "",
    data: "",
    luogo: "",
  });

  const [ activityBtn, setActivityBtn ] = useState(false);

  // return (
  //   <li>
  //     <div className="trip-container">
  //         <h1 className="trip-title">{trip.nome}</h1>
  //         <div className="trip-dates">
  //           {format(new Date(trip.dataInizio), "dd/MM/yyyy")} → {format(new Date(trip.dataFine), "dd/MM/yyyy")}
  //         </div>
  //         <div className="trip-destination">{trip.destinazione}</div>
  //         <div className="trip-budget">Budget: €{trip.budget}</div>
      
  //         <hr className="trip-divider" />
      
  //         <section className="trip-itinerary">
  //           <h2 className="trip-subtitle">Itinerario</h2>
  //           {activities.length > 0 ? (
  //             <ul className="trip-activities">
  //               {activities.map((activity) => (
  //                 <li key={activity.id} className="trip-activity">
  //                   <div className="activity-date">
  //                     {format(new Date(activity.data), "dd/MM/yyyy")} - {activity.luogo}
  //                     </div>
  //                     <div className="activity-name">{activity.nome}</div>
  //                     {activity.descrizione && (
  //                       <div className="activity-description">{activity.descrizione}</div>
  //                       )}
  //                 </li>))}
  //             </ul>) : ( <p className="no-activities">Nessuna attività programmata.</p> )}
  //         </section>
  //     </div>
  //   </li>
  // );
  
  const addActivity = async(e) => {
    e.preventDefault();

    await createActivity({ 
      tripId: trip.id,
      name: formData.nome,
      description: formData.descrizione,
      date: formData.data,
      location: formData.luogo
    });

    setActivityBtn(false);
  }

  const activityForm = () => {
    return (
      <form className="activity-form" onSubmit={addActivity}>
      <h3 className="form-title">Aggiungi nuova attività</h3>

      <label>
        Nome:
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          required
        />
      </label>

      <label>
        Data:
        <input
          type="date"
          name="data"
          value={formData.data}
          onChange={(e) => setFormData({ ...formData, data: e.target.value })}
          required
        />
      </label>

      <label>
        Luogo:
        <input
          type="text"
          name="luogo"
          value={formData.luogo}
          onChange={(e) => setFormData({ ...formData, luogo: e.target.value })}
          required
        />
      </label>

      <label>
        Descrizione:
        <textarea
          name="descrizione"
          value={formData.descrizione}
          onChange={(e) => setFormData({ ...formData, descrizione: e.target.value })}
        />
      </label>

      <button type="submit">Aggiungi</button>
    </form>
    );
  }

  return (
    <li>
      <div className="trip-container">
          <h1 className="trip-title">{trip.nome}</h1>
          <div className="trip-dates">
            {format(new Date(trip.dataInizio), "dd/MM/yyyy")} → {format(new Date(trip.dataFine), "dd/MM/yyyy")}
          </div>
          <div className="trip-destination">{trip.destinazione}</div>
          <div className="trip-budget">Budget: €{trip.budget}</div>
      
          {/* <hr className="trip-divider" /> */}

          <button onClick={() => setActivityBtn(true)}>Nuova attività</button>
          {/* {console.console.log(activityBtn)} */}
           
          { activityBtn && (activityForm())}
      
          <section className="trip-itinerary">
            <h2 className="trip-subtitle">Itinerario</h2>
            <ActivityList trip={trip} />
          </section>
      </div>
    </li>
  );
};

export default TripItem;
