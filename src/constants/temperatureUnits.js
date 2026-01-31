export const TEMPERATURE_UNITS = {
  FAHRENHEIT: "F",
  CELSIUS: "C",
  KELVIN: "K",
  getAll: () => ["C", "F", "K"],
  isValid: (value) => ["C", "F", "K"].includes(value),
};