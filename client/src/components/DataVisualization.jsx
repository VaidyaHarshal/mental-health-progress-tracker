import React, { useEffect, useState, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { useUser } from "../contexts/userContext";
import { io } from "socket.io-client";
import {
  Container,
  Typography,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

// ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Styled FormGroup for horizontal layout
const HorizontalFormGroup = styled(FormGroup)({
  display: "flex",
  flexDirection: "row",
  gap: "16px",
  flexWrap: "wrap",
});

// Container for the chart to maintain size consistency
const ChartContainer = styled("div")({
  position: "relative",
  width: "100%",
  height: "500px",
});

const DataVisualization = () => {
  const { user } = useUser();
  const [data, setData] = useState({});
  const [parameters, setParameters] = useState({
    mood: true,
    anxiety: true,
    sleep: true,
    activity: false,
    interactions: false,
    symptoms: false,
  });
  const [view, setView] = useState("weekly");

  const fetchLogs = useCallback(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/api/logs?uid=${user.uid}`)
      .then((response) => {
        const logs = response.data;
        const chartData = formatChartData(logs);
        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching logs", error);
      });
  }, [user, parameters, view]);

  useEffect(() => {
    fetchLogs();
    const socket = io("http://localhost:5000");

    socket.on("logUpdate", () => {
      fetchLogs();
    });

    return () => {
      socket.disconnect();
    };
  }, [fetchLogs]);

  const formatChartData = (logs) => {
    const selectedParameters = Object.keys(parameters).filter(
      (param) => parameters[param]
    );
    const groupedLogs = groupLogsByTime(logs, view);
    const datasets = selectedParameters.map((param) => ({
      label: param.charAt(0).toUpperCase() + param.slice(1),
      data: groupedLogs.map((log) => ({ x: log.timePeriod, y: log[param] })),
      borderColor: getColorForParam(param),
      backgroundColor: getColorForParam(param, 0.2),
      fill: false,
      pointBackgroundColor: getColorForParam(param),
    }));

    return {
      labels: groupedLogs.map((log) => log.timePeriod),
      datasets,
    };
  };

  const groupLogsByTime = (logs, view) => {
    const grouped = {};
    logs.forEach((log) => {
      const timePeriod =
        view === "weekly" ? getWeekOfYear(log.date) : getMonthYear(log.date);
      if (!grouped[timePeriod]) {
        grouped[timePeriod] = { timePeriod, counts: {}, totals: {} };
        Object.keys(parameters).forEach((param) => {
          if (parameters[param]) {
            grouped[timePeriod].counts[param] = 0;
            grouped[timePeriod].totals[param] = 0;
          }
        });
      }
      Object.keys(parameters).forEach((param) => {
        if (parameters[param]) {
          grouped[timePeriod].totals[param] += log[param];
          grouped[timePeriod].counts[param] += 1;
        }
      });
    });

    return Object.values(grouped).map((group) => {
      const result = { timePeriod: group.timePeriod };
      Object.keys(parameters).forEach((param) => {
        if (parameters[param]) {
          result[param] =
            group.counts[param] > 0
              ? group.totals[param] / group.counts[param]
              : 0;
        }
      });
      return result;
    });
  };

  const getWeekOfYear = (date) => {
    const dt = new Date(date);
    const start = new Date(dt.getFullYear(), 0, 1);
    const week = Math.ceil(((dt - start) / 86400000 + 1) / 7);
    return `Week ${week} ${dt.getFullYear()}`;
  };

  const getMonthYear = (date) => {
    const dt = new Date(date);
    return `${dt.toLocaleString("default", {
      month: "long",
    })} ${dt.getFullYear()}`;
  };

  const getColorForParam = (param, alpha = 1) => {
    const colors = {
      mood: "rgba(75, 192, 192, 1)",
      anxiety: "rgba(153, 102, 255, 1)",
      sleep: "rgba(255, 159, 64, 1)",
      activity: "rgba(255, 99, 132, 1)",
      interactions: "rgba(54, 162, 235, 1)",
      symptoms: "rgba(255, 206, 86, 1)",
    };
    return colors[param]
      ? colors[param].replace(
          /rgba\((\d+), (\d+), (\d+), (\d+)\)/,
          (match, r, g, b, a) => `rgba(${r}, ${g}, ${b}, ${alpha})`
        )
      : "rgba(0, 0, 0, 1)";
  };

  const handleCheckboxChange = (param) => {
    const selectedCount = Object.values(parameters).filter(Boolean).length;

    if (parameters[param]) {
      setParameters((prev) => ({ ...prev, [param]: false }));
    } else if (selectedCount < 3) {
      setParameters((prev) => ({ ...prev, [param]: true }));
    } else {
      alert("You can select a maximum of three parameters.");
    }
  };

  const options = {
    scales: {
      y: {
        min: 0,
        max: 5,
      },
    },
    plugins: {
      legend: {
        onClick: (e, legendItem, legend) => {
          e.stopPropagation();
        },
      },
    },
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h6" color="textPrimary">
          Please sign in to see your data.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Mental Health Insights
      </Typography>
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Button
          variant={view === "weekly" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setView("weekly")}
        >
          Weekly View
        </Button>
        <Button
          variant={view === "monthly" ? "contained" : "outlined"}
          color="primary"
          onClick={() => setView("monthly")}
        >
          Monthly View
        </Button>
      </Paper>
      <FormControl component="fieldset" style={{ marginBottom: "16px" }}>
        <HorizontalFormGroup>
          {Object.keys(parameters).map((param) => (
            <FormControlLabel
              key={param}
              control={
                <Checkbox
                  checked={parameters[param]}
                  onChange={() => handleCheckboxChange(param)}
                />
              }
              label={param.charAt(0).toUpperCase() + param.slice(1)}
            />
          ))}
        </HorizontalFormGroup>
      </FormControl>
      <ChartContainer>
        {data.labels ? (
          <Line data={data} options={options} />
        ) : (
          <CircularProgress />
        )}
      </ChartContainer>
    </Container>
  );
};

export default DataVisualization;
