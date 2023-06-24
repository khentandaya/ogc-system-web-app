export default function toDayString(index: number) {
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  if (index >= 0 && index < days.length) {
    return days[index];
  } else return "";
}
