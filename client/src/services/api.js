import axios from "axios";

const API_URL = "http://localhost:5001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Funzione generica per effettuare richieste axios
 * @param {string} method - Metodo HTTP ("get", "post", "put", "delete", ecc.)
 * @param {string} endpoint - Endpoint relativo (es: "/trip/create-trip")
 * @param {object} [data={}] - Dati da inviare nel body (solo per POST/PUT)
 * @param {object} [params={}] - Parametri query string (opzionale)
 * @returns {Promise<any>}
 */
export const apiRequest = async (method, endpoint, data = {}) => {
  try {
    const config = {
      method,
      url: `${API_URL}${endpoint}`,
      headers: getAuthHeaders(),
      data
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Errore nella richiesta a ${endpoint}:`, error);
    throw error;
  }
};

// Trip API 
export const createTrip = async(tripData) => apiRequest("post", "/trip/create-trip", tripData); // implementata in tripList
export const getAllTrips = async () => apiRequest("get", "/trip"); // implementata in tripList
export const getTripById = async (tripID) => apiRequest("get", `/trip/${tripID}`); 
export const getTripsByUser = async () => apiRequest("get", `/trip/user-trips`);
export const updateTrip = async (tripID, updatedTripData) => apiRequest("patch", `/trip/${tripID}`, updatedTripData);
export const deleteTrip = async (tripID) => apiRequest("delete", `/trip/${tripID}`);

// Activity API
export const createActivity = (activityData) => apiRequest("post", `/activity/create-activity`, activityData);
export const getActivitiesByTrip = (tripID) => apiRequest("get", `/activity/trip-activities/${tripID}`);
export const getActivityById = (activityID) => apiRequest("get", `/activity/${activityID}`);
export const updateActivity = (activityID, updateActivityData) => apiRequest("patch", `/activity/${activityID}`, updateActivityData);
export const deleteActivity = (activityID) => apiRequest("delete", `/activity/${activityID}`);


