// import axios from "axios";

export const createExpense = async (expenseData) => {
  try {
    console.log("Spesa creata");
  } catch (error) {
    console.error("Errore durante la creazione della spesa:", error);
    throw error;
  }
};
