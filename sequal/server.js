const express = require("express");
const cors = require("cors");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// student routes
const studentRoutes = require("./app/routes/student.routes.js");
app.use("/", studentRoutes);

// start the server
const PORT = 8088;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
