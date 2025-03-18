const express = require('express'); 
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Database Connection Pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'donation_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



// Check MySQL connection
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database ');
    connection.release(); // Release the connection
});

// Root Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

// User Registration (Sign Up)
app.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

    db.query(sql, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
            console.error('Error signing up:', err);
            return res.status(500).json({ error: 'Database error. Please try again later.' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});


// User Login (Sign In)
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required!' });
    }
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role }, // Include role in token
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token, role: user.role }); // Send role
    });
});

// Add a Donation (POST)
app.post('/donate', (req, res) => {
    const { name, email, amount, message } = req.body;
    if (!name || !email || !amount) {
        return res.status(400).json({ error: 'Name, email, and amount are required!' });
    }
    const sql = 'INSERT INTO donors (name, email, amount, message) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, amount, message], (err, result) => {
        if (err) {
            console.error('Error inserting donation:', err);
            return res.status(500).json({ error: 'Database error. Please try again later.' });
        }
        res.status(201).json({ message: 'Donation successful', donorId: result.insertId });
    });
});

// Get All Donors (GET)
app.get('/donors', (req, res) => {
    const sql = 'SELECT * FROM donors ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching donors:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length === 0) {
            return res.json({ message: 'No donations found yet.' });
        }
        res.json(results);
    });
});


// Get All Recipients (Mock Data for Now)
app.get('/recipients', (req, res) => {
    const recipients = [
        { id: 1, name: 'Rahim Uddin', location: 'Dhaka', itemsReceived: 'Clothes' },
        { id: 2, name: 'Amina Begum', location: 'Chittagong', itemsReceived: 'Food' },
        { id: 3, name: 'Faruk Ahmed', location: 'Khulna', itemsReceived: 'Clothes & Food' }
    ];
    res.json(recipients);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
