import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import type { ChartOptions } from "chart.js";

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

export function CollegePieReq() {
  const [students, setStudents] = useState<object[]>([]);
  const [chartData, setChartData] = useState(initialChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>(
    {
      plugins: {
        legend: {
          position: "right"
        }
      }
    }
  );

  useEffect(() => {
    axios.get("/api/studentprofile").then(({ data }) => {
      if (data) {
        setStudents(data);
      }
    });
  }, []);

  useEffect(() => {
    let ccsCount = 0;
    let cedCount = 0;
    let cebaCount = 0;
    let cassCount = 0;
    let chsCount = 0;
    let coeCount = 0;
    let csmCount = 0;
    students.forEach((student: any) => {
      if (student.college === "ccs") ccsCount++;
      else if (student.college === "ced") cedCount++;
      else if (student.college === "ceba") cebaCount++;
      else if (student.college === "cass") cassCount++;
      else if (student.college === "chs") chsCount++;
      else if (student.college === "coe") coeCount++;
      else if (student.college === "csm") csmCount++;
    });

    setChartData({
      labels: ["CCS", "CED", "CEBA", "CASS", "CHS", "COE", "CSM"],
      datasets: [
        {
          label: "Number of Students",
          data: [
            ccsCount,
            cedCount,
            cebaCount,
            cassCount,
            chsCount,
            chsCount,
            coeCount,
            csmCount,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
        },
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "right"
        }
      }
    })
  }, [students]);

  return (
    <div className="h-[30rem] w-[30rem]">
      <Pie options={chartOptions} data={chartData} />
    </div>
  );
}
