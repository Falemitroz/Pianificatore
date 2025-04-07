import axios from "axios";

const API_URL = "http://localhost:5001";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `${token}` } : {};
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
      `${API_URL}/create-trip`,
      { tripData },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (error) {
    console.error("Errore durante la creazione del trip:", error);
    throw error;
  }
}