import React, { useEffect, useState } from "react";
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
import { useUser } from "../contexts/userContext";
import { useData } from "../contexts/dataContext";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DataVisualization = () => {
  const { user } = useUser();
  const { logs } = useData();
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

  useEffect(() => {
    const chartData = formatChartData(logs);
    console.log("chartData is", chartData);
    setData(chartData);
  }, [logs, parameters, view]);

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
        grouped[timePeriod] = { timePeriod };
        Object.keys(parameters).forEach((param) => {
          if (parameters[param]) {
            grouped[timePeriod][param] = [];
          }
        });
      }

      Object.keys(parameters).forEach((param) => {
        if (parameters[param]) {
          grouped[timePeriod][param].push(log[param]);
        }
      });
    });

    // Calculate average for each time period and parameter
    return Object.values(grouped).map((group) => {
      const result = { timePeriod: group.timePeriod };
      Object.keys(parameters).forEach((param) => {
        if (parameters[param]) {
          const values = group[param];
          result[param] =
            values.length > 0
              ? values.reduce((acc, value) => acc + value, 0) / values.length
              : 0;
        }
      });
      return result;
    });
  };

  const getWeekOfYear = (date) => {
    const dt = new Date(date);
    const start = new Date(dt.getFullYear(), 0, 1);
    const days = Math.floor((dt - start) / (24 * 60 * 60 * 1000));
    const week = Math.ceil((days + start.getDay() + 1) / 7);
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
      setParameters({ ...parameters, [param]: false });
    } else if (selectedCount < 3) {
      setParameters({ ...parameters, [param]: true });
    } else {
      alert("You can select a maximum of three parameters.");
    }
  };

  if (!user) {
    return <p>Please sign in to see your data.</p>;
  }

  return (
    <div>
      <h2>Data Visualization</h2>
      <div>
        <button onClick={() => setView("weekly")}>Weekly View</button>
        <button onClick={() => setView("monthly")}>Monthly View</button>
      </div>
      <div>
        {Object.keys(parameters).map((param) => (
          <label key={param}>
            <input
              type="checkbox"
              checked={parameters[param]}
              onChange={() => handleCheckboxChange(param)}
            />
            {param.charAt(0).toUpperCase() + param.slice(1)}
          </label>
        ))}
      </div>
      {data.labels ? <Line data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default DataVisualization;
