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

export const getTrips = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/trip`, 
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante il recupero dei trips:", error);
    throw error;
  }
};

export const createTrip = async(tripData) => {
  try {
    const res = await axios.post(
      `${API_URL}/trip/create-trip`,
      tripData,
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del trip:", error);
    throw error;
  }
}
