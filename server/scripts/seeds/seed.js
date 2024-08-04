const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const dbPath = path.join(__dirname, "../../utils/database.db");

const fs = require("fs");
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Utility functions
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomDate = () => {
  const start = new Date("2024-01-01");
  const end = new Date("2024-08-02");
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

const emailId = "harshal.vaidya300@gmail.com";

// Seed database
const seedDatabase = () => {
  console.log("Starting to seed database...");

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Create table if it doesn't exist
      db.run(
        `
        CREATE TABLE IF NOT EXISTS logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          uid TEXT NOT NULL,
          email TEXT NOT NULL,
          date TEXT NOT NULL,
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
            console.error("Error creating table:", err.message);
            return reject(new Error("Database error: Unable to create table."));
          }
          console.log("Table created or already exists.");
        }
      );

      // Prepare statement
      const stmt = db.prepare(`
        INSERT INTO logs (uid, email, date, mood, anxiety, sleep, activity, interactions, symptoms)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const numRecords = 365; // Number of records to insert
      let insertedCount = 0; // Counter for successfully inserted records

      // Insert records
      for (let i = 0; i < numRecords; i++) {
        const uid = "iIFMIg2UwNdpsEkppELSvpZTfCW2";
        const email = "harshal.vaidya300@gmail.com";
        const date = getRandomDate();
        const mood = getRandomInt(1, 5);
        const anxiety = getRandomInt(1, 5);
        const sleep = getRandomInt(1, 5);
        const activity = getRandomInt(1, 5);
        const interactions = getRandomInt(1, 5);
        const symptoms = getRandomInt(1, 5);

        stmt.run(
          uid,
          email,
          date,
          mood,
          anxiety,
          sleep,
          activity,
          interactions,
          symptoms,
          function (err) {
            if (err) {
              console.error("Error inserting data:", err.message);
            } else {
              console.log(`Inserted log with ID: ${this.lastID}`);
              insertedCount++;
            }
          }
        );
      }

      stmt.finalize((err) => {
        if (err) {
          console.error("Error finalizing statement:", err.message);
          db.close((closeErr) => {
            if (closeErr)
              console.error("Error closing database:", closeErr.message);
            reject(new Error("Database error: Unable to finalize statement."));
          });
          return;
        }

        // Query to verify inserted data
        db.all("SELECT * FROM logs where email = ?", [emailId], (err, rows) => {
          if (err) {
            console.error("Error fetching data:", err.message);
            db.close((closeErr) => {
              if (closeErr)
                console.error("Error closing database:", closeErr.message);
              reject(new Error("Database error: Unable to fetch data."));
            });
            return;
          }
          console.log("Fetched rows after seeding:", rows);
          // Close database connection
          db.close((err) => {
            if (err) {
              console.error("Error closing database:", err.message);
              reject(new Error("Database error: Unable to close database."));
              return;
            }
            console.log(
              `Database seeded successfully with ${insertedCount} records.`
            );
            resolve(
              `Database seeded successfully with ${insertedCount} records.`
            );
          });
        });
      });
    });
  });
};

// Execute the seeding process
seedDatabase().then(console.log).catch(console.error);
