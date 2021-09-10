import { pad } from "./pad";

export function formatDate(date) {
  const newDate = new Date(date);

  return `${newDate.getFullYear()}-${pad(newDate.getMonth() + 1)}-${pad(
    newDate.getDate()
  )}`;
}
