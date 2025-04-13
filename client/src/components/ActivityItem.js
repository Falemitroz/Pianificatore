// import React from "react";
// import { format } from "date-fns";

// import '../styles/TripItem.css';

// const ActivityItem = ({ activity }) => {
//     return(
//         <li key={activity.id} className="trip-activity">
//             <div className="activity-date">
//                 {format(new Date(activity.data), "dd/MM/yyyy")} - {activity.luogo}
//             </div>
//             <div className="activity-name">{activity.nome}</div>
//             {activity.descrizione && (
//                 <div className="activity-description">{activity.descrizione}</div>
//             )}
//         </li>
//     );
// };

// export default ActivityItem;

import React from "react";
import { format } from "date-fns";
import { ListItem, Card, CardContent, Typography } from "@mui/material";
import "../styles/TripItem.css";

const ActivityItem = ({ activity }) => {
  return (
    <ListItem className="trip-activity" disableGutters>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography variant="subtitle1" className="activity-date">
            {format(new Date(activity.data), "dd/MM/yyyy")} - {activity.luogo}
          </Typography>
          <Typography variant="h6" component="div" className="activity-name">
            {activity.nome}
          </Typography>
          {activity.descrizione && (
            <Typography variant="body2" color="text.secondary" className="activity-description">
              {activity.descrizione}
            </Typography>
          )}
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default ActivityItem;
