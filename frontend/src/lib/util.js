export function formatDate(date){
  const validDate = new Date(date);
  if (isNaN(validDate)) return "Invalid Date";
  return validDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}