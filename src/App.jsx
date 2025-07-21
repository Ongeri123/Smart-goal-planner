import React, { useEffect, useState } from "react";
import { fetchGoals, deleteGoal } from "./Services/goalApi";
import GoalList from "/src/GoalList.jsx";
import Overview from "./Overview";
import AddGoalForm from "./AddGoalForm";
import DepositForm from "./DepositForm";
import "/src/App.css";

function App() {
  // State to hold the list of goals.
  const [goals, setGoals] = useState([]);
  // State to manage the loading status while fetching data.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch goals when the component mounts.
  useEffect(() => {
    // Fetch goals from the API
    fetchGoals()
      .then((res) => {
        setGoals(res.data);
      })
      .catch((err) => {
        // On failure, log the error and set an error message.
        console.error(err);
        setError("Failed to fetch goals.");
      })
      .finally(() => {
        // Once the fetch is complete (either success or failure), stop loading.
        setLoading(false);
      });
  }, []); // The empty dependency array ensures this runs only once on mount.

  // Function to handle deleting a goal. It's defined here because this component owns the 'goals' state.
  async function handleDeleteGoal(goalId) {
    try {
      // Call the API to delete the goal from the server.
      await deleteGoal(goalId);
      setGoals(prevGoals => prevGoals.filter(g => g.id !== goalId));
    } catch (err) {
      // If the API call fails, log the error.
      console.error("Failed to delete goal:", err);
      // Optionally, show an error to the user
    }
  }

  // Render the main application structure.
  return (
    <div className="app">
      <h1>Smart Goal Planner</h1>
      
      <Overview goals={goals} />
      
      <div className="forms-container" style={{marginBottom: "10px"}}>
        <AddGoalForm setGoals={setGoals} />
        <DepositForm goals={goals} setGoals={setGoals} />
      </div>
      {/* Conditional rendering for loading and error states. */}
      {loading && <p>Loading goals...</p>}
      {error && <p className="error">{error}</p>}
      
      {!loading && !error && <GoalList goals={goals} onDeleteGoal={handleDeleteGoal} />}
    </div>
  );
}

export default App;
