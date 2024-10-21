import React from "react";
import { Paper, Typography } from "@mui/material";
import { Bar, Line, Pie } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ title, children }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {children}
  </Paper>
);

interface BarChartProps {
  title: string;
  data: ChartData<"bar">;
  options?: ChartOptions<"bar">;
}

export const BarChart: React.FC<BarChartProps> = ({ title, data, options }) => (
  <ChartWrapper title={title}>
    <Bar data={data} options={options} />
  </ChartWrapper>
);

interface LineChartProps {
  title: string;
  data: ChartData<"line">;
  options?: ChartOptions<"line">;
}

export const LineChart: React.FC<LineChartProps> = ({
  title,
  data,
  options,
}) => (
  <ChartWrapper title={title}>
    <Line data={data} options={options} />
  </ChartWrapper>
);

interface PieChartProps {
  title: string;
  data: ChartData<"pie">;
  options?: ChartOptions<"pie">;
}

export const PieChart: React.FC<PieChartProps> = ({ title, data, options }) => (
  <ChartWrapper title={title}>
    <Pie data={data} options={options} />
  </ChartWrapper>
);
