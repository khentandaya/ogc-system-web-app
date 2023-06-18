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

export function YrlevelPieReq() {
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


  useEffect(()=>{
    axios.get("/api/studentprofile").then(({ data }) => {
      if (data) {
        setStudents(data);
      }
    });
  },[])

  useEffect(() => {
    let firstCount = 0;
    let secondCount = 0;
    let thirdCount = 0;
    let fourthCount = 0;
    students.forEach((student: any)=>{
      if(student.yrlevel === "1st") firstCount++;
      else if(student.yrlevel === "2nd") secondCount++;
      else if(student.yrlevel === "3rd") thirdCount++;
      else if(student.yrlevel === "4th") fourthCount++;
    })
    setChartData({
      labels: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
      datasets: [
        {
          label: "Number of Students",
          data: [firstCount, secondCount, thirdCount, fourthCount],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(153, 102, 255, 1)",
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
