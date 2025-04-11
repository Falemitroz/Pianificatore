import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../context/AuthContext";
import ActivityItem from "./ActivityItem";

import '../styles/TripItem.css';

const ActivityList = ({ trip }) => {
    
    const { getActivitiesByTrip } = useContext(AuthContext);
    
    
    const [ activities, setActivities ] = useState([]);

    useEffect(() => {
        const fetchActivityData = async () => {
        try {
            const res = await getActivitiesByTrip({tripID: trip.id});
            console.log("Activities trovate:", res)
            setActivities(res);
        } catch (error) {
            console.error("Errore nel fetch dei dati:", error);
        }
        };

        fetchActivityData();
    }, []);

    return (
        <>
            {/* {activities && activities.length === 0 ? (
                <p className="no-activities">Nessuna attività programmata.</p>) : (
                    <ul className="trip-activities">
                        {activities.map((activity, index) => <ActivityItem key={index} activity={activity}/>)}
                    </ul>
                )} */}
        </>
    );
};

export default ActivityList;