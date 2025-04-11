import React from "react";
import { format } from "date-fns";

import '../styles/TripItem.css';

const ActivityItem = ({ activity }) => {
    return(
        <li key={activity.id} className="trip-activity">
            <div className="activity-date">
                {format(new Date(activity.data), "dd/MM/yyyy")} - {activity.luogo}
            </div>
            <div className="activity-name">{activity.nome}</div>
            {activity.descrizione && (
                <div className="activity-description">{activity.descrizione}</div>
            )}
        </li>
    );
};

export default ActivityItem;