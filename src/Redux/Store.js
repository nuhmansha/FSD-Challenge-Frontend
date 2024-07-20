import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';
import tasksReducer from './TasksSlice'; // Assume tasksSlice exists

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer, // Add tasks reducer
  },
});

export default store;
