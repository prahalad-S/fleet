import { Server as HttpServer } from "http";
import { Server as SocketServer, Socket } from "socket.io";
import { GPSSimulator } from "../simulator/gps-simulator";

export function initSocketIO(server: HttpServer) {
  const io = new SocketServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  // Start GPS simulator
  const simulator = new GPSSimulator(io);
  simulator.startSimulation();

  return io;
}
