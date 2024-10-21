import React from "react";
import { Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { barChartData, barChartOptions } from "./chartConfig";

export const PerformanceWidget: React.FC = () => (
  <Bar data={barChartData} options={barChartOptions} />
);

export const LeadSummaryWidget: React.FC = () => (
  <Typography variant="body1">
    Total Leads: 150
    <br />
    New Leads: 25
    <br />
    Converted: 10
  </Typography>
);

export const NewWidget: React.FC = () => (
  <Typography>This is a new widget.</Typography>
);
