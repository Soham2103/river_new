const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Health Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'River Insights Backend is Running'
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        mongodb: mongoose.connection.readyState
    });
});

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error("❌ MONGODB_URI environment variable is missing.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);

        console.log("✅ Connected to MongoDB");

    } catch (err) {

        console.error("❌ MongoDB Connection Error:");
        console.error(err.message);

        // Retry after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

connectDB();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});