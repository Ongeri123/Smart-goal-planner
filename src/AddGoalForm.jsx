import React, { useState } from "react";
import { addGoal } from "./Services/goalApi";

function AddGoalForm({ setGoals }) {
  const [formData, setFormData] = useState({
   
    name: "",
    targetAmount: "",
    category: "",
    deadline: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    // Prevents the default browser action of reloading the page on form submission.
    e.preventDefault();
    // Simple validation to ensure a name is entered and the target amount is positive.
    if (!formData.name || Number(formData.targetAmount) <= 0) return;

    // Prepares the new goal object to be sent to the API.
    const newGoal = {
      ...formData,
      // Ensures the targetAmount is stored as a number.
      targetAmount: Number(formData.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString()
    };

    // A try...catch block to handle the asynchronous API call.
    try {
      const res = await addGoal(newGoal);
      // On success, update the goals list in the parent App component.
      setGoals(prev => [...prev, res.data]);
      // Clear the form for the next entry.
      setFormData({ name: "", targetAmount: "", category: "", deadline: "" });
    } catch (err) {
      console.error("Failed to add goal:", err);
    }
  }

  // This is the JSX that renders the form UI.
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Goal name" required />
      <input name="targetAmount" type="number" value={formData.targetAmount} onChange={handleChange} placeholder="Target $" required />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
      <button type="submit">➕ Add Goal</button>
    </form>
  );
}

export default AddGoalForm;
