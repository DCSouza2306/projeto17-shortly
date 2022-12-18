import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlsRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use(urlRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server runging in port ${port}`));
