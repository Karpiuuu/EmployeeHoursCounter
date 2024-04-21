require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//LOGIN-SESSION

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const sqlQuery = "SELECT * FROM users WHERE username = ?";
    db.query(sqlQuery, [username], async (err, result) => {
      if (err) {
        res.status(500).send('Błąd serwera');
      } else if (result.length === 0) {
        res.status(401).send('Nieprawidłowa nazwa użytkownika lub hasło');
      } else {
        const user = result[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
          res.status(401).send('Nieprawidłowa nazwa użytkownika lub hasło');
        } else {
          const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
          res.json({ token });
        }
      }
    });
  });

//WORK-SESSION

app.post('/api/work-session', (req, res) => {
  const { userId, taskDescription, startTime, endTime } = req.body;
  
  const sql = "INSERT INTO WorkSessions (user_id, start_time, end_time) VALUES (?, ?, ?)";
  db.query(sql, [userId, startTime, endTime], (err, result) => {
    if (err) {
      return res.status(500).send('Błąd serwera');
    }
    const sessionId = result.insertId;
    const sqlTask = "INSERT INTO Tasks (session_id, description) VALUES (?, ?)";
    db.query(sqlTask, [sessionId, taskDescription], (err, result) => {
      if (err) {
        return res.status(500).send('Błąd serwera');
      }
      res.status(200).send('Sesja pracy zapisana');
    });
  });
});



app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);
});
