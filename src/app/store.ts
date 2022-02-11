import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

/**
 * Infer types for further usage
 */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
