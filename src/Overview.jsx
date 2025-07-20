import React from "react";
import dayjs from "dayjs";

// This component displays a high-level summary of all goals.
function Overview({ goals }) {
  // Calculate total amount saved across all goals using reduce.
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  // Count the number of completed goals by filtering the array.
  const completed = goals.filter(g => g.savedAmount >= g.targetAmount).length;
  // Count goals with deadlines approaching (within 30 days) and not yet met.
  const warnings = goals.filter(g => dayjs(g.deadline).diff(dayjs(), "day") <= 30 && g.savedAmount < g.targetAmount);
  // Count goals that are past their deadline and not yet met.
  const overdue = goals.filter(g => dayjs(g.deadline).isBefore(dayjs()) && g.savedAmount < g.targetAmount);

  // Render the overview statistics.
  return (
    <div className="overview">
      <p>📊 Total Goals: {goals.length}</p>
      <p>💵 Total Saved: ${totalSaved}</p>
      <p>✅ Goals Completed: {completed}</p>
      <p>⚠️ Upcoming Deadlines: {warnings.length}</p>
      <p>🚨 Overdue Goals: {overdue.length}</p>
    </div>
  );
}

export default Overview;
