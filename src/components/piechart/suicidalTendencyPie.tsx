import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const data = {
//   labels: ["css", "ced", "cba"],
//   datasets: [
//     {
//       label: "Number of students",
//       data: [],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
}
const initialChartData: ChartData = {
  labels: [],
  datasets: [],
};

export function SuicidalTendencyPie() {
  const [students, setStudents] = useState<object[]>([]);
  const [chartData, setChartData] = useState(initialChartData);

  useEffect(() => {
    axios.get("/api/studentprofile").then(({ data }) => {
      if (data) {
        setStudents(data);
      }
    });

    setChartData({
      labels: ["1", "2", "3"],
      datasets: [
        {
          label: "Number of Students",
          data: [3, 8, 6],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
        },
      ],
    });
  }, []);

  return (
    <div className="h-[30rem] w-[30rem]">
      <Pie data={chartData} />
    </div>
  );
}
