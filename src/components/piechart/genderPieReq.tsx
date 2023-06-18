import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import type { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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

export function GenderPieReq() {
  const [students, setStudents] = useState<object[]>([]);
  const [chartData, setChartData] = useState(initialChartData);
  const [chartOptions, setChartOptions] = useState<ChartOptions>({
    plugins: {
      legend: {
        position: "right",
      },
    },
  });

  useEffect(() => {
    axios.get("/api/studentprofile").then(({ data }) => {
      if (data) {
        setStudents(data);
      }
    });
  }, []);

  useEffect(() => {
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;
    students.forEach((student: any) => {
      if (student.sex.toLowerCase() === "male") maleCount++;
      else if (student.sex.toLowerCase() === "female") femaleCount++;
      else if (student.sex.toLowerCase() === "other") otherCount++;
    });

    setChartData({
      labels: ["Male", "Female", "Other"],
      datasets: [
        {
          label: "Number of Students",
          data: [maleCount, femaleCount, otherCount],
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

    setChartOptions({
      plugins: {
        legend: {
          position: "right",
        },
      },
    });
  }, [students]);

  return (
    <div className="h-[30rem] w-[30rem]">
      <Pie options={chartOptions} data={chartData} />
    </div>
  );
}
