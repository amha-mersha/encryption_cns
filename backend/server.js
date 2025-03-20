const express = require("express");
const bodyParser = require("body-parser");
const encryptionRoutes = require("./routes/encryptionRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/encrypt", encryptionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
