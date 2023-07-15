import express, { json } from 'express';
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./routes/users.route.js";
import { dbConnect } from "./db/connect.js";

config();

const app = express();

app.use(json());
app.use(cors());
app.use(morgan("combined"));
app.use(helmet());

app.use("/api/users", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    dbConnect();
    console.log(`Connected to port ${port}`);
});