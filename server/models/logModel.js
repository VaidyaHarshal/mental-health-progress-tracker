const db = require("../utils/db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, uid TEXT, date TEXT, mood INTEGER, anxiety INTEGER, sleep INTEGER, activity INTEGER, interactions INTEGER, symptoms INTEGER)"
  );
});

exports.createLog = (logData) => {
  const { uid, mood, anxiety, sleep, activity, interactions, symptoms } =
    logData;
  const date = new Date().toISOString().split("T")[0];
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO logs (uid, date, mood, anxiety, sleep, activity, interactions, symptoms) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [uid, date, mood, anxiety, sleep, activity, interactions, symptoms],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID });
      }
    );
  });
};

exports.getLogs = (uid) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM logs WHERE uid = ?", [uid], (err, rows) => {
      if (err) {
        return reject(err);
      }
      console.log(rows);
      resolve(rows);
    });
  });
};
