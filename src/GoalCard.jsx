import React from "react";
import dayjs from "dayjs";

// This component displays a single goal card.
function GoalCard({ goal, onDeleteGoal }) {
  // Destructure properties from the goal object for easier access.
  const { name, category, targetAmount, savedAmount, deadline } = goal;

  // Calculate the completion percentage. Math.min ensures it doesn't exceed 100%.
  const completion = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);
  // Calculate the amount still needed to reach the target.
  const remainingAmount = targetAmount - savedAmount;
  // Calculate the number of days left until the deadline using dayjs.
  const daysLeft = dayjs(deadline).diff(dayjs(), "day");

  // Determine the status of the goal based on time and amount saved.
  const overdue = daysLeft < 0 && savedAmount < targetAmount;
  const warning = daysLeft <= 30 && !overdue && savedAmount < targetAmount;
  const completed = completion === 100;

  // Create a user-friendly string for the days left.
  const daysLeftText = overdue ? `${Math.abs(daysLeft)} days overdue` : `${daysLeft} days left`;

  // Render the goal card JSX.
  return (
    // Dynamically apply CSS classes based on the goal's status.
    <div className={`goal-card ${overdue ? "overdue" : warning ? "warning" : ""}`}>
        {/* The delete button calls the handler passed down from App.jsx. */}
        <button className="delete-btn" onClick={() => onDeleteGoal(goal.id)}>
          🗑️
        </button>
        <h3>{name} <span>({category})</span></h3>
        <p>Target: ${targetAmount}</p>
        <p>Saved: ${savedAmount}</p>
        {/* Display the remaining amount or a celebration emoji if complete. */}
        <p>Remaining: ${remainingAmount > 0 ? `$${remainingAmount}` : "🎉"}</p>
        <p>Deadline: {dayjs(deadline).format("YYYY-MM-DD")} ({daysLeftText})</p>
        {/* A progress bar to visually represent completion. */}
        <progress value={savedAmount} max={targetAmount}></progress>
        <p>{completion}% complete</p>
        {/* Conditionally render status messages. */}
        {overdue && <p className="status overdue">🚨 Overdue</p>}
        {warning && <p className="status warning">⚠️ Deadline approaching</p>}
        {completed && !overdue && <p className="status completed">✅ Completed!</p>}
     </div>
  );
}

export default GoalCard;
