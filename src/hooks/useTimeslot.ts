import React from "react";

export const useTimeslot = (day: Date | undefined) => {
  let timeslots = [];
  if (day) {
    for (let i = 0; i <= 24; i++) {
      const x = new Date(day);
      x.setHours(i, 0, 0, 0);
      timeslots.push(x);
    }
  }
  const [available, setAvailable] = React.useState<Date[]>(timeslots);

  return {
    available,
  };
};
