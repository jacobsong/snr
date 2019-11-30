const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const getRoutes = require("./routes/getRoutes");


// Initialize express and routes
const app = express();
app.use("/api", getRoutes);


// Connect MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => { console.log("MongoDB connected...\n"); },
  err => { console.log("MongoDB could not connect...\n" + err); }
);


// Start server
const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
