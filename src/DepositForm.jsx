import React, { useState } from "react";
import { updateGoal } from "./Services/goalApi";

function DepositForm({ goals, setGoals }) {
  // State to hold the deposit amount from the input.
  const [amount, setAmount] = useState("");
  // State to hold the ID of the goal selected from the dropdown.
  const [selected, setSelected] = useState("");

  // Function to handle the form submission for a deposit.
  async function handleDeposit(e) {
    // Prevent the default form submission behavior (page reload).
    e.preventDefault();
    // Basic validation to ensure a goal is selected and the amount is positive.
    if (!selected || Number(amount) <= 0) return;

    // Find the full goal object from the goals array using the selected ID.
    const goal = goals.find(g => g.id === selected);
    // Prepare the updated data for the API call.
    const updatedGoal = {
      savedAmount: Number(goal.savedAmount) + Number(amount)
    };
    // Use a try...catch block for the asynchronous API call
    try {
      // Call the API to update the goal on the server.
      const res = await updateGoal(selected, updatedGoal);
      // On success, update the goals list in the parent App component.
      // It maps over the old goals and replaces the updated one.
      setGoals(goals.map(g => g.id === selected ? res.data : g));
      // Reset the form fields.
      setAmount(""); setSelected("");
    } catch (err) {
      // If the API call fails, log the error.
      console.error("Failed to update goal:", err);
    }
  }

  // Render the deposit form.
  return (
    <form onSubmit={handleDeposit}>
      {/* Dropdown to select which goal to deposit into. */}
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select goal</option>
        {/* Dynamically create an option for each goal. */}
        {goals.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      {/* Input for the deposit amount. */}
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Deposit $" />
      <button type="submit">💰 Deposit</button>
    </form>
  );
}

export default DepositForm;
