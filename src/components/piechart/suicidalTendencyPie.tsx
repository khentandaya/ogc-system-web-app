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

type FormData = {
  needsAssistance: {
    anxiety: number;
    depression: number;
  };
  pushedLimitsResponse: {
    attemptedToEndLife: number;
    thoughtBetterDead: number;
    hurtMySelf: number;
  };
  iFindMyself: {
    havingSuicidal: number;
  };
};

export function SuicidalTendencyPie() {
  const [form, setForm] = useState<FormData>({
    needsAssistance: {
      anxiety: 0,
      depression: 0,
    },
    pushedLimitsResponse: {
      attemptedToEndLife: 0,
      thoughtBetterDead: 0,
      hurtMySelf: 0,
    },
    iFindMyself: {
      havingSuicidal: 0,
    },
  });
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
    axios.get("/api/assessmentform/count").then(({ data }) => {
      if (data) {
        setForm(data);
      }
    });
  }, []);

  useEffect(() => {
    setChartData({
      labels: [
        "Having suicidal thoughts",
        "Anxeity",
        "Deppresion/Sadness",
        "Attempted to end my life",
        "Thought it would be better dead",
        "Hurt myself",
      ],
      datasets: [
        {
          label: "Number or Students",
          data: [form.iFindMyself.havingSuicidal, form.needsAssistance.anxiety, form.needsAssistance.depression, form.pushedLimitsResponse.attemptedToEndLife, form.pushedLimitsResponse.thoughtBetterDead, form.pushedLimitsResponse.hurtMySelf],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
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
  }, [form]);

  return (
    <div className="h-[30rem] w-[30rem]">
      <Pie options={chartOptions} data={chartData} />
    </div>
  );
}
