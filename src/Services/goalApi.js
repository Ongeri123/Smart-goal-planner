export const fetchGoals = async () => {
  const response = await fetch('/db.json');
  const data = await response.json();
  return { data: data.goals };
};

export const addGoal = (goal) => {
  console.log('Add goal (static mode):', goal);
  return Promise.resolve({ data: { id: Date.now().toString(), ...goal } });
};

export const updateGoal = (id, updates) => {
  console.log('Update goal (static mode):', id, updates);
  return Promise.resolve({ data: { id, ...updates } });
};

export const deleteGoal = (id) => {
  console.log('Delete goal (static mode):', id);
  return Promise.resolve({ data: { id } });
};
