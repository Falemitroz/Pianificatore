import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const ExpenseItem = () => {
  const { createExpense } = useContext(AuthContext);

  return (
    <button onClick={createExpense}>
      Create Expense
    </button>
  );
};

export default ExpenseItem;
