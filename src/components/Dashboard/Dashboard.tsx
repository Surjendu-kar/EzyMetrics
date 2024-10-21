import React, { useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Widget {
  id: string;
  title: string;
  content: React.ReactNode;
}

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>([
    {
      id: "performance",
      title: "Performance",
      content: (
        <Bar
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                label: "Sales",
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top" as const,
              },
              title: {
                display: true,
                text: "Monthly Sales",
              },
            },
          }}
        />
      ),
    },
    {
      id: "leads",
      title: "Lead Summary",
      content: (
        <Typography variant="body1">
          Total Leads: 150
          <br />
          New Leads: 25
          <br />
          Converted: 10
        </Typography>
      ),
    },
  ]);

  const addWidget = () => {
    const newWidget: Widget = {
      id: `widget-${widgets.length + 1}`,
      title: `New Widget ${widgets.length + 1}`,
      content: <Typography>This is a new widget.</Typography>,
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={addWidget}
        sx={{ mb: 2 }}
      >
        Add Widget
      </Button>
      <Grid container spacing={3}>
        {widgets.map((widget) => (
          <Grid item xs={12} md={6} lg={4} key={widget.id}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Typography variant="h6" gutterBottom>
                {widget.title}
              </Typography>
              {widget.content}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
