import React, { useState } from "react";
import {
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  SelectChangeEvent,
} from "@mui/material";

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [format, setFormat] = useState("");

  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as string);
  };

  const handleDateRangeChange = (event: SelectChangeEvent) => {
    setDateRange(event.target.value as string);
  };

  const handleFormatChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string);
  };

  const handleGenerateReport = () => {
    // In a real application, this would trigger the report generation process
    console.log("Generating report:", { reportType, dateRange, format });
    alert(
      `Generating ${format.toUpperCase()} report for ${reportType} over ${dateRange}`
    );
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select value={reportType} onChange={handleReportTypeChange}>
                <MenuItem value="sales">Sales Report</MenuItem>
                <MenuItem value="leads">Leads Report</MenuItem>
                <MenuItem value="performance">Performance Report</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select value={dateRange} onChange={handleDateRangeChange}>
                <MenuItem value="last7days">Last 7 Days</MenuItem>
                <MenuItem value="last30days">Last 30 Days</MenuItem>
                <MenuItem value="lastQuarter">Last Quarter</MenuItem>
                <MenuItem value="lastYear">Last Year</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Format</InputLabel>
              <Select value={format} onChange={handleFormatChange}>
                <MenuItem value="pdf">PDF</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleGenerateReport}
              disabled={!reportType || !dateRange || !format}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Reports;
