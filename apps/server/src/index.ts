import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import { initSocketIO } from "./socket";
import { authRouter } from "./routes/auth";
import { vehiclesRouter } from "./routes/vehicles";
import { dashboardRouter } from "./routes/dashboard";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/vehicles", vehiclesRouter);
app.use("/api/dashboard", dashboardRouter);

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", service: "FleetForce Express Backend", time: new Date() });
});

// Initialize Socket.IO & GPS Simulator
initSocketIO(httpServer);

httpServer.listen(PORT, () => {
  console.log(`[FleetForce Backend Server] Running on http://localhost:${PORT}`);
});
