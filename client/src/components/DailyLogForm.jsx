import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useData } from "../contexts/dataContext";
import { io } from "socket.io-client";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/system";

const SOCKET_URL = "http://localhost:5000";
const INITIAL_FORM_STATE = {
  mood: "",
  anxiety: "",
  sleep: "",
  activity: "",
  interactions: "",
  symptoms: "",
};

const TOOLTIP_TEXT = {
  mood: `Rate your overall Mood:
  1: Very Bad
  2: Bad
  3: Neutral
  4: Good
  5: Very Good`,
  anxiety: `Rate your Anxiety level:
  1: Very Low
  2: Low
  3: Moderate
  4: High
  5: Very High`,
  sleep: `Rate your Sleep quality:
  1: Very Poor
  2: Poor
  3: Average
  4: Good
  5: Very Good`,
  activity: `Rate your Physical activity level:
  1: Very Low
  2: Low
  3: Moderate
  4: High
  5: Very High`,
  interactions: `Rate the quality of your Social interactions:
  1: Very Poor
  2: Poor
  3: Average
  4: Good
  5: Very Good`,
  symptoms: `Rate the severity of your Symptoms:
  1: Very Mild
  2: Mild
  3: Moderate
  4: Severe
  5: Very Severe`,
};

const StyledPaper = styled(Paper)({
  padding: "20px",
  margin: "20px auto",
  maxWidth: "600px",
  textAlign: "center",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
});

const DailyLogForm = ({ user }) => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const { setLogs } = useData();

  const validateInput = (name, value) => {
    if (!value || isNaN(value) || value < 1 || value > 5) {
      return "Value must be a number between 1 and 5";
    }
    return "";
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      // Validate inputs
      const newErrors = {};
      let hasError = false;

      Object.keys(form).forEach((key) => {
        const error = validateInput(key, form[key]);
        if (error) {
          newErrors[key] = error;
          hasError = true;
        }
      });

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      // Show confirmation dialog if no validation errors
      const confirmSubmission = window.confirm(
        "Are you sure you want to submit this log? This action cannot be undone."
      );

      if (!confirmSubmission) {
        return;
      }

      try {
        await axios.post(`${SOCKET_URL}/api/log`, {
          ...form,
          uid: user.uid,
          email: user.email,
        });
        setForm(INITIAL_FORM_STATE); // Clear form fields
        setErrors({});
      } catch (error) {
        console.error("Error submitting log", error);
      }
    },
    [form, user.uid]
  );

  useEffect(() => {
    // Connect to the socket.io server
    const socket = io(SOCKET_URL);

    socket.on("logUpdate", (newLog) => {
      setLogs((prevLogs) => [...prevLogs, newLog]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, [setLogs]);

  return (
    <Container>
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Daily Log Form
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Please rate the following categories on a scale from 1 to 5:
          <br />
          <strong>1:</strong> Very Poor / Very Bad / Very Low / Very Mild
          <br />
          <strong>2:</strong> Poor / Bad / Low / Mild
          <br />
          <strong>3:</strong> Average / Neutral / Moderate
          <br />
          <strong>4:</strong> Good / High / Severe
          <br />
          <strong>5:</strong> Very Good / Very High / Very Severe
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(INITIAL_FORM_STATE).map((field) => (
              <Grid item xs={12} key={field}>
                <Tooltip
                  title={
                    <span
                      style={{ whiteSpace: "pre-line", fontSize: "0.875rem" }}
                    >
                      {TOOLTIP_TEXT[field]}
                    </span>
                  }
                  arrow
                  placement="right"
                >
                  <StyledTextField
                    fullWidth
                    type="number"
                    name={field}
                    label={capitalizeFirstLetter(field)}
                    value={form[field]}
                    onChange={handleChange}
                    inputProps={{ min: 1, max: 5 }}
                    error={!!errors[field]}
                    helperText={errors[field]}
                  />
                </Tooltip>
              </Grid>
            ))}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "16px" }}
          >
            Submit
          </Button>
        </form>
      </StyledPaper>
    </Container>
  );
};

const capitalizeFirstLetter = (string) => {
  return (
    string.charAt(0).toUpperCase() +
    string
      .slice(1)
      .replace(/([A-Z])/g, " $1")
      .toLowerCase()
  );
};

export default DailyLogForm;
