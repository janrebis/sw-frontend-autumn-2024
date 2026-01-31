import { configureStore } from "@reduxjs/toolkit";
import { weatherReducer } from "./slices/weatherSlice.js";

const STORAGE_KEY = "weatherAppState_v1";

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    return parsed;
  } catch {
    return undefined;
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
  }
}

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    weather: {
      temperatureUnits: state.weather.temperatureUnits,
      favorites: state.weather.favorites,
    },
  });
});