export default function timeSlice(from: Date, to: Date) {
  const allTimes = [
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
  ];

  // return from;

  return allTimes.filter((date) => {
    return (
      from.getHours() <= date.getHours() && to.getHours() > date.getHours()
    );
  });
}
