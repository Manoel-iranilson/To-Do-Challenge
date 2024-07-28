import { configureStore, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../mock/tasks";

const todoSlice = createSlice({
  name: "todo",
  initialState: tasks,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    update: (state, action) => {
      const { id, name, description, completed, taskDate } = action.payload;
      const task = state.find((todo) => todo.id === id);
      if (task) {
        task.name = name;
        task.description = description;
        task.completed = completed;
        task.taskDate = taskDate;
      }
    },
  },
});

export const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
});

export const { add, remove, update } = todoSlice.actions;
export default todoSlice.reducer;
