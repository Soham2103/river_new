const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working!"
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});