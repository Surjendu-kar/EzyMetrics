import React, { useState } from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
import {
  PerformanceWidget,
  LeadSummaryWidget,
  NewWidget,
} from "./WidgetComponents";

interface Widget {
  id: string;
  title: string;
  content: React.ReactNode;
}

const initialWidgets: Widget[] = [
  {
    id: "performance",
    title: "Performance",
    content: <PerformanceWidget />,
  },
  {
    id: "leads",
    title: "Lead Summary",
    content: <LeadSummaryWidget />,
  },
];

const Dashboard: React.FC = () => {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);

  const addWidget = () => {
    const newWidget: Widget = {
      id: `widget-${widgets.length + 1}`,
      title: `New Widget ${widgets.length + 1}`,
      content: <NewWidget />,
    };
    setWidgets([...widgets, newWidget]);
  };

  return (
    <Box>
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
    </Box>
  );
};

export default Dashboard;
