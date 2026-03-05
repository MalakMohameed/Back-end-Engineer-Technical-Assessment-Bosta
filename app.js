const express = require("express");
const rateLimit = require("express-rate-limit");
const sequelize = require("./config/db");
const models = require("./models"); 

const bookRoutes = require("./routes/bookRoutes");
const borrowerRoutes = require("./routes/borrowerRoutes");
const borrowingRoutes = require("./routes/borrowingRoutes");
const errorHandler = require("./middleware/errorHandler");
const auth = require("./middleware/auth");

const app = express();
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, slow down!" }
});

app.use("/api/books/search", limiter);
app.use("/api/borrowers", limiter);
app.use("/api/books", auth, bookRoutes);
app.use("/api/borrowers", auth, borrowerRoutes);
app.use("/api/borrowings", auth, borrowingRoutes);

app.use(errorHandler);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000"));
});
