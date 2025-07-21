import React from "react";
import GoalCard from "./GoalCard";
// rendering the list of goal cards.
function GoalList({ goals, onDeleteGoal }) {
  return (
    <div className="goal-list">
      {/* Map over the 'goals' array passed as a prop. */}
      {goals.map((goal) => (
        // For each goal in the array, render a GoalCard component.
        // The 'key' prop is essential for React to efficiently update the list.
        <GoalCard key={goal.id} goal={goal} onDeleteGoal={onDeleteGoal} />
      ))}
    </div>
  );
}

export default GoalList;
