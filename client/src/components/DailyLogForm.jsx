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
  mood: "Rate your overall mood from 1 (very bad) to 5 (very good)",
  anxiety: "Rate your anxiety level from 1 (very low) to 5 (very high)",
  sleep: "Rate your sleep quality from 1 (very poor) to 5 (very good)",
  activity:
    "Rate your physical activity level from 1 (very low) to 5 (very high)",
  interactions:
    "Rate the quality of your social interactions from 1 (very poor) to 5 (very good)",
  symptoms:
    "Rate the severity of your symptoms from 1 (very mild) to 5 (very severe)",
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

const ErrorText = styled(Typography)({
  color: "red",
  fontSize: "0.875rem",
  margin: "8px 0",
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

      try {
        await axios.post(`${SOCKET_URL}/api/log`, { ...form, uid: user.uid });
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
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {Object.keys(INITIAL_FORM_STATE).map((field) => (
              <Grid item xs={12} key={field}>
                <Tooltip
                  title={
                    <span style={{ whiteSpace: "pre-line" }}>
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
