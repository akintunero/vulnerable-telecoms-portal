const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

// Initialize database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    email TEXT UNIQUE
  )`);
  
  db.run(`CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

// Vulnerable JWT secret
const JWT_SECRET = 'telleakisp_social_secret_key';

// Routes
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, hashedPassword, email],
    function(err) {
      if (err) {
        return res.status(400).json({ error: 'Registration failed' });
      }
      res.json({ message: 'User registered successfully' });
    }
  );
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    res.json({ token });
  });
});

app.post('/posts', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { content } = req.body;
    
    db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)',
      [decoded.id, content],
      function(err) {
        if (err) {
          return res.status(400).json({ error: 'Failed to create post' });
        }
        res.json({ message: 'Post created successfully' });
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

app.get('/posts', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    db.all('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC',
      [decoded.id],
      (err, posts) => {
        if (err) {
          return res.status(400).json({ error: 'Failed to fetch posts' });
        }
        res.json(posts);
      }
    );
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Vulnerable endpoint - SQL injection possible
app.get('/search', (req, res) => {
  const { query } = req.query;
  db.all(`SELECT * FROM users WHERE username LIKE '%${query}%'`, (err, users) => {
    if (err) {
      return res.status(400).json({ error: 'Search failed' });
    }
    res.json(users);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Social media service running on port ${PORT}`);
}); 