import { TEMPERATURE_UNITS } from "../constants/temperatureUnits";

export function convertFromCelsius(valueC, unit) {
  if (valueC === null || valueC === undefined) return valueC;

  switch (unit) {
    case TEMPERATURE_UNITS.FAHRENHEIT:
      return valueC * 9 / 5 + 32;
    case TEMPERATURE_UNITS.KELVIN:
      return valueC + 273.15;
    case TEMPERATURE_UNITS.CELSIUS:
    default:
      return valueC;
  }
}

export function formatTemp(value, decimals = 0) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  return Number(value).toFixed(decimals);
}