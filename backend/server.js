const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const encryptionRouter = require("./routes/encryptionRoute");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/encryption", encryptionRouter);

// Error handling
//app.use((err, req, res, next) => {
//  console.error(err.stack);
//  res.status(500).json({ error: "Something went wrong!" });
//});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Encryption service running on port ${PORT}`);
});
