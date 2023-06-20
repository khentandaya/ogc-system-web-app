import React from "react";

export const useTimeslot = (day: Date | undefined) => {
  const [available, setAvailable] = React.useState<Date[]>([
    new Date(new Date().setHours(0, 0, 0, 0)),
    new Date(new Date().setHours(1, 0, 0, 0)),
    new Date(new Date().setHours(2, 0, 0, 0)),
    new Date(new Date().setHours(3, 0, 0, 0)),
    new Date(new Date().setHours(4, 0, 0, 0)),
    new Date(new Date().setHours(5, 0, 0, 0)),
    new Date(new Date().setHours(6, 0, 0, 0)),
    new Date(new Date().setHours(7, 0, 0, 0)),
    new Date(new Date().setHours(8, 0, 0, 0)),
    new Date(new Date().setHours(9, 0, 0, 0)),
    new Date(new Date().setHours(10, 0, 0, 0)),
    new Date(new Date().setHours(11, 0, 0, 0)),
    new Date(new Date().setHours(12, 0, 0, 0)),
    new Date(new Date().setHours(13, 0, 0, 0)),
    new Date(new Date().setHours(14, 0, 0, 0)),
    new Date(new Date().setHours(15, 0, 0, 0)),
    new Date(new Date().setHours(16, 0, 0, 0)),
    new Date(new Date().setHours(17, 0, 0, 0)),
    new Date(new Date().setHours(18, 0, 0, 0)),
    new Date(new Date().setHours(19, 0, 0, 0)),
    new Date(new Date().setHours(20, 0, 0, 0)),
    new Date(new Date().setHours(21, 0, 0, 0)),
    new Date(new Date().setHours(22, 0, 0, 0)),
    new Date(new Date().setHours(23, 0, 0, 0)),
  ]);

  function setDate(date: Date) {
    setAvailable([
      new Date(date.setHours(0, 0, 0, 0)),
      new Date(date.setHours(1, 0, 0, 0)),
      new Date(date.setHours(2, 0, 0, 0)),
      new Date(date.setHours(3, 0, 0, 0)),
      new Date(date.setHours(4, 0, 0, 0)),
      new Date(date.setHours(5, 0, 0, 0)),
      new Date(date.setHours(6, 0, 0, 0)),
      new Date(date.setHours(7, 0, 0, 0)),
      new Date(date.setHours(8, 0, 0, 0)),
      new Date(date.setHours(9, 0, 0, 0)),
      new Date(date.setHours(10, 0, 0, 0)),
      new Date(date.setHours(11, 0, 0, 0)),
      new Date(date.setHours(12, 0, 0, 0)),
      new Date(date.setHours(13, 0, 0, 0)),
      new Date(date.setHours(14, 0, 0, 0)),
      new Date(date.setHours(15, 0, 0, 0)),
      new Date(date.setHours(16, 0, 0, 0)),
      new Date(date.setHours(17, 0, 0, 0)),
      new Date(date.setHours(18, 0, 0, 0)),
      new Date(date.setHours(19, 0, 0, 0)),
      new Date(date.setHours(20, 0, 0, 0)),
      new Date(date.setHours(21, 0, 0, 0)),
      new Date(date.setHours(22, 0, 0, 0)),
      new Date(date.setHours(23, 0, 0, 0)),
    ]);
  }

  function disableTimeslot(date: Date) {
    setAvailable((old) => {
      return old.filter((e) => {
        return e.getHours() !== date.getHours();
      });
    });
  }

  return {
    available,
    disableTimeslot,
    setDate,
  };
};
