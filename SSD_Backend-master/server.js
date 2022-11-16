require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();
const userRouter = require("./routes/users");
const messageRouter = require("./routes/messages");
const fileRouter = require("./routes/files");

const options = {
  key: fs.readFileSync("./Certificates/localhost-key.pem"), // Replace with the path to your key
  cert: fs.readFileSync("./Certificates/localhost.pem"), // Replace with the path to your certificate
};

app.use(cors());
app.use(bodyParser.json({ extended: false }));


app.use(cors());
app.use(express.json());

//configuring dotenv variables
const PORT = 4000;
const MONGO_URI = process.env.DATABASE_URL;

//setting routes
app.use("/messages", messageRouter);
app.use("/users", userRouter);
app.use("/files", fileRouter);


//creating express server
app.listen(PORT, async () => {
  //mongoDB connection
  mongoose.connect(MONGO_URI, err => {
    if (err) {
      return console.error(err);
    }
    console.log("MongoDB connected!🔥");
  });
  console.log(`Express server running at PORT ${PORT} 😍`);
});