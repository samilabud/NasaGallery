/**
 * Get a formated date to being used with datepicker
 * @param {date} date - The date to be formated.
 */
export const getDateFormated = (date) => {
  if (!date) {
    return "";
  }
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
