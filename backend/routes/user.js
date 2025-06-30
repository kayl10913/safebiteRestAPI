const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const bcrypt = require('bcrypt');

// Create a new user
router.post('/newuser', async (req, res) => {
  try {
    const { first_name, last_name, username, email, password } = req.body;

    // Basic validation
    if (!first_name || !last_name || !username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const newUser = {
        first_name,
        last_name,
        username,
        email,
        password_hash,
    };

    await db.query('INSERT INTO users SET ?', newUser);
    res.json({ success: true, message: 'User created successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ success: false, message: 'Username or email already exists.' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    // Login successful, return a token or session ID
    // Note: You would need to implement token generation (e.g., using JWT)
    res.json({ success: true, message: 'Login successful', user_id: user.user_id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      res.status(404).json({ success: false, error: 'User not found' });
    } else {
      res.json({ success: true, user: rows[0] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json({ success: true, users: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;