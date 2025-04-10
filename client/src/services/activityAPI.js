import axios from "axios";

const API_URL = "http://localhost:5001/activity";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `${token}` } : {};
};

/**
 * Funzione generica per effettuare richieste axios
 * @param {string} method - Metodo HTTP ("get", "post", "put", "delete", ecc.)
 * @param {string} endpoint - Endpoint relativo (es: "/trip/create-trip")
 * @param {object} [data={}] - Dati da inviare nel body (solo per POST/PUT)
 * @param {object} [params={}] - Parametri query string (opzionale)
 * @returns {Promise<any>}
 */
export const apiRequest = async (method, endpoint, data = {}, params = {}) => {
    try {
      const config = {
        method,
        url: `${API_URL}${endpoint}`,
        headers: getAuthHeaders(),
        data,
        params,
      };
  
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`Errore nella richiesta a ${endpoint}:`, error);
      throw error;
    }
};

export const createActivity = ( tripId,
                                name,
                                description, 
                                location, 
                                date, 
                                duration ) => 
        apiRequest("post", "/create-activity", {
    tripId, name, description, location, date, duration
});

export const getActivitiesByTrip = () => {};
export const getActivityById = () => {};
export const updateActivity = () => {};
export const deleteActivity = () => {};