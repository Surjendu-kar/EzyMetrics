import React from "react";
import { Grid, Typography } from "@mui/material";
import { barChartData, lineChartData, pieChartData } from "./ChartData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BarChart, LineChart, PieChart } from "./ChartComponent";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const Analytics: React.FC = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BarChart
            title="Monthly Sales"
            data={barChartData}
            options={chartOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            title="Website Traffic"
            data={lineChartData}
            options={chartOptions}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChart
            title="Lead Status Distribution"
            data={pieChartData}
            options={chartOptions}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
