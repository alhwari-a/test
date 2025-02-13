const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const contactMessagesRoutes = require("./routes/contactMessagesRoutes");
const contactRoutes = require("./routes/contactRoutes");
const OrderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const AdoptionRoutes = require("./routes/adoptionRoutes");
const adoptionOrderRoutes = require("./routes/adoptionOrderRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const clinicOrderRoutes = require("./routes/clinicOrderRoutes");

dotenv.config();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", serviceRoutes);
app.use("/api", contactMessagesRoutes);
app.use("/api", contactRoutes);
app.use("/api", OrderRoutes);
app.use("/api", userRoutes);
app.use("/api", AdoptionRoutes);
app.use("/api", adoptionOrderRoutes);
app.use("/api", clinicRoutes);
app.use("/api", clinicOrderRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
