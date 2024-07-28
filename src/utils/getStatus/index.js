import { endOfDay, isBefore, startOfDay } from "date-fns";

export const getStatus = (task) => {
  if (task.completed) {
    return "Concluída";
  }
  const taskDate = new Date(task.taskDate);
  const todayStart = startOfDay(new Date());
  const todayEnd = endOfDay(new Date());
  if (isBefore(taskDate, todayStart)) {
    return "Pendente (Atrasada)";
  } else if (taskDate >= todayStart && taskDate <= todayEnd) {
    return "Pendente";
  }
  return "Pendente";
};
