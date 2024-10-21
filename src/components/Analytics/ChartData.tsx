import { ChartData } from "chart.js";

export const barChartData: ChartData<"bar"> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
  ],
};

export const lineChartData: ChartData<"line"> = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Website Visits",
      data: [1000, 1500, 2000, 1800, 2200, 2500],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

export const pieChartData: ChartData<"pie"> = {
  labels: ["New", "Contacted", "Qualified", "Lost"],
  datasets: [
    {
      data: [30, 50, 15, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};
