const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'jannadstazik',
  password: 'jan123456',
  database: 'anotes'
});

connection.connect();

const secretKey = 'JanNadstazik2002';

// Weryfikacja tokenu
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
      req.userId = decoded.id;
      next();
    });
  };
  
// POST /login - Generuje token dostepu dla użytkownika
app.post('/login', (req, res) => {

    const token = jwt.sign({ id: '123' }, secretKey, { expiresIn: 8640000 });
    res.status(200).send({ auth: true, token: token });

});

  
// GET /note - Zwraca wszystkie notatki
app.get('/note', verifyToken, (req, res) => {
    connection.query('SELECT * FROM notes', (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'There was a problem retrieving the notes.' });
      }
      console.log(`IP: ` + req.ip + ` success: Notes sent. `)
      res.status(200).send(result);
    });
  });
  
// GET /note/:id - Zwraca notatkę po ID
app.get('/note/:id', verifyToken, (req, res) => {
    connection.query('SELECT * FROM notes WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'There was a problem retrieving the note.' });
      }
      if (result.length === 0) {
        return res.status(404).send({ message: 'Note not found.' });
      }
      console.log(`IP: ` + req.ip + ` success: Note `+ req.params.id +` sent. `)
      res.status(200).send(result[0]);
    });
  });
  
// POST /note - Tworzy nową notatkę
app.post('/note', verifyToken, (req, res) => {
    connection.query('INSERT INTO notes SET ?', [req.query], (err, result) => {
      console.log(req)
      if (err) {
        return res.status(500).send({ message: 'There was a problem adding the note.' });
      }
      console.log(`IP: ` + req.ip + ` success: Created new note.`)
      res.status(201).send({ id: result.insertId });
    });
  });
  
// PUT /note/:id - Aktualizuje notatkę po ID
app.put('/note/:id', verifyToken, (req, res) => {
    connection.query('UPDATE notes SET ? WHERE id = ?', [req.query, req.params.id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: 'There was a problem updating the note.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Note not found.' });
      }
      console.log(`IP: ` + req.ip + ` success: Updated note.`)
      res.status(200).send();
    });
  });
  
// DELETE /note/:id - Usuwa notatkę po ID
app.delete('/note/:id', verifyToken, (req, res) => {
    connection.query('DELETE FROM notes WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'There was a problem deleting the note.' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: 'Note not found.' });
      }
      console.log(`IP: ` + req.ip + ` success: Removed note. `)
      res.status(204).send();
    });
  });
  
  app.listen(3001);