const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
// Centralized error handling middleware
const { errorHandler } = require("./middleware/errorWithAsync");

require("dotenv").config();

// Load passport config
require("./config/passport")(passport);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.js");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }),
);

// Auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Routes
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require("./routes/itemRoutes");

console.log(
  `Routes mountes successfully. User routes type: ${typeof userRoutes}`,
); // Debugging line to check the type of userRoutes

// Root route (Render/health-check friendly)
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    name: "cse341_final_project",
    env: process.env.NODE_ENV || "development",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);

// Fallback 404 handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status = 404;
  next(error);
});

// Error handler
app.use(errorHandler);

// Connect to database and start server
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      const mode = process.env.NODE_ENV || "development";
      console.log(`Server is running in ${mode} || mode on port ${port}`);
    });
  } catch (err) {
    console.error("Database connection falied:", err);
  }
};

start();
