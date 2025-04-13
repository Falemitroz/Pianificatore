import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { format } from "date-fns";
import { ListItem, Card, CardContent, Typography } from "@mui/material";
import { RiDeleteBin2Line } from "react-icons/ri";
import "../styles/TripItem.css";

const ActivityItem = ({ activity, listRefresh }) => {

  const { deleteActivity } = useContext(AuthContext)

  const handleDeleteActivity = async (e) => {
    e.preventDefault();
    try {
      await deleteActivity(activity.id);
      listRefresh();
    } catch (error) {
      console.error("Failed to delete activity:", error);
    }
  }

  return (
    <ListItem className="trip-activity" disableGutters>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Typography 
            variant="subtitle1" 
            sx={{display: "flex", 
                 justifyContent: "space-between", 
                 alignItems: "center",}}>
            {format(new Date(activity.data), "dd/MM/yyyy")} - {activity.luogo}
            <RiDeleteBin2Line 
              onClick={handleDeleteActivity}
              // sx={{color:"#f44336"}} 
              />
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
