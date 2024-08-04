const db = require("../utils/db");

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY,
      uid TEXT,
      email TEXT,
      date TEXT,
      mood INTEGER,
      anxiety INTEGER,
      sleep INTEGER,
      activity INTEGER,
      interactions INTEGER,
      symptoms INTEGER
    )
  `,
    (err) => {
      if (err) {
        console.error("Error creating logs table:", err.message);
      } else {
        console.log("Logs table ready or already exists.");
      }
    }
  );
});

exports.createLog = (logData) => {
  const { uid, email, mood, anxiety, sleep, activity, interactions, symptoms } =
    logData;
  const date = new Date().toISOString();

  return new Promise((resolve, reject) => {
    db.run(
      `
      INSERT INTO logs (uid, email, date, mood, anxiety, sleep, activity, interactions, symptoms)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        uid,
        email,
        date,
        mood,
        anxiety,
        sleep,
        activity,
        interactions,
        symptoms,
      ],
      function (err) {
        if (err) {
          console.error("Error creating log:", err.message);
          return reject(new Error("Database error: Unable to create log."));
        }
        resolve({ id: this.lastID });
      }
    );
  });
};

exports.getLogs = (email) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM logs WHERE email = ?", [email], (err, rows) => {
      if (err) {
        console.error("Error fetching logs:", err.message);
        return reject(new Error("Database error: Unable to fetch logs."));
      }

      if (!rows.length) {
        console.warn(`No logs found for email ID: ${email}`);
      }
      resolve(rows);
    });
  });
};

const closeDbConnection = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing the database connection:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
};

process.on("SIGINT", () => {
  console.log("Process terminated. Closing database connection...");
  closeDbConnection();
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Process terminated. Closing database connection...");
  closeDbConnection();
  process.exit(0);
});
