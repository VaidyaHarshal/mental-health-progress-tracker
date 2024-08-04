# Mental Health Progress Tracker Application

A React application for tracking daily mental health metrics. This app allows users to log their mood, anxiety, sleep, activity, social interactions, and symptoms. The application visualizes the data using charts and connects in real-time using Socket.IO.

## Table of Contents

1. [Features](#features)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Database Seed](#database-seed)

## Features

- **Daily Log Form:** Users can submit daily ratings for various mental health metrics.
- **Real-Time Updates:** Data updates in real-time using Socket.IO.
- **Data Visualization:** Display of logged data in charts for weekly and monthly views.
- **User Authentication:** Users need to sign in to view and submit their data.

## Technologies

- **React:** JavaScript library for building user interfaces.
- **Material-UI:** React components for faster and easier web development.
- **Socket.IO:** Real-time, bidirectional, and event-based communication.
- **Axios:** Promise-based HTTP client for the browser and Node.js.
- **Chart.js:** JavaScript library for creating dynamic and interactive charts.

## Installation

### Client Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/mental-health-tracker.git
   ```

2. **Navigate into the client directory:**

   ```bash
   cd mental-health-progress-tracker/client
   ```

3. **Install client dependencies:**

   ```bash
   npm install
   ```

4. **Run the client application:**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:5173/`.

### Server Setup

1. **Navigate into the server directory:**

   ```bash
   cd mental-health-tracker/server
   ```

2. **Install server dependencies:**

   ```bash
   npm install
   ```

3. **Run the server application:**

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:5000`.

## Configuration

1. **API Configuration:**

   Update the `SOCKET_URL` constant in the `DailyLogForm.js` file to point to your server URL.

   ```js
   const SOCKET_URL = "http://localhost:5000";
   ```

2. **Backend Setup:**

   Ensure that your backend server is set up to handle the following endpoints:

   - `POST /api/log`: Endpoint for submitting daily logs.

3. **Environment Variables:**

   Set up any required environment variables (e.g., API keys, database connection strings) in a `.env` file at the root of your project.

## Usage

1. **Sign In:**

   - Users need to sign in to access the application. Implement authentication as per your requirements.

2. **Submit Daily Logs:**

   - Use the Daily Log Form to submit ratings for mood, anxiety, sleep, activity, interactions, and symptoms.
   - The data is validated to ensure values are between 1 and 5.

3. **View Data:**

   - Navigate to the chart view to see visual representations of your logged data. You can switch between weekly and monthly views.

## API Endpoints

### POST /api/log

- **Description:** Submit a new daily log entry.
- **Request Body:**
  ```json
  {
    "mood": 3,
    "anxiety": 2,
    "sleep": 4,
    "activity": 5,
    "interactions": 3,
    "symptoms": 2,
    "uid": "user-id",
    "email": "user-email"
  }
  ```
- **Response:** Success or error message.

## Database Seed

To populate your SQLite3 database with initial data, follow these steps:

1. **Navigate to the server directory:**

   ```bash
   cd mental-health-progress-tracker
   ```

2. **Locate the Seed File:**

   Ensure you have a seed file for SQLite3, usually named something like `seed.js`. This file contains the initial data for populating your database.

   ```bash
   cd server/scripts/seeds
   ```

3. **Run the Seed File:**

   Go to the directory where the seed file is located and run the seed file.

   ```bash
   node seed.js
   ```

This will execute the SQL commands in seed.sql and populate your SQLite3 database with the initial data.

4. **Verify Data:**

After running the seed file, verify that the data has been correctly inserted into your database. You can do this by using a database browser or running queries directly against your SQLite3 database.
