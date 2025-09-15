const express = require("express");
const cors = require("cors");

// Lidhja me DB
const connectDB = require("./db");

// Routes
const produktiRoutes = require("./routes/produktiRoutes");
const produktVariacioniRoutes = require("./routes/produktVariacioniRoutes");
const furnitoriRoutes = require("./routes/furnitoriRoutes");

const app = express();
const PORT = 5000; // hiq process.env.PORT për test

// Middleware
app.use(cors());
app.use(express.json());

// **Middleware për debug: printon çdo kërkesë**
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// API routes
app.use("/api/produkte", produktiRoutes);
app.use("/api/variacione", produktVariacioniRoutes);
app.use("/api/furnitore", furnitoriRoutes);

// Lidhja me DB dhe startimi i serverit
connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
