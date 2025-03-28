const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const encryptionRouter = require("./routes/encryptionRoute");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/encryption", encryptionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Encryption service running on port ${PORT}`);
});
