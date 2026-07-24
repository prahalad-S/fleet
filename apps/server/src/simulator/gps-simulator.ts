import { Server as SocketServer } from "socket.io";

export interface SimulatedVehicle {
  id: string;
  vehicleNumber: string;
  driverName: string;
  lat: number;
  lng: number;
  speed: number;
  fuelLevel: number;
  status: "RUNNING" | "IDLE" | "STOPPED";
  heading: number;
}

const initialSimulatorVehicles: SimulatedVehicle[] = [
  { id: "1", vehicleNumber: "AP39AB1234", driverName: "Ravi Kumar", lat: 17.385, lng: 78.4867, speed: 35, fuelLevel: 72, status: "RUNNING", heading: 45 },
  { id: "2", vehicleNumber: "TS09CD5678", driverName: "Suresh Reddy", lat: 19.076, lng: 72.8777, speed: 12, fuelLevel: 58, status: "RUNNING", heading: 120 },
  { id: "3", vehicleNumber: "MH12EF9012", driverName: "Amit Sharma", lat: 18.5204, lng: 73.8567, speed: 0, fuelLevel: 45, status: "IDLE", heading: 0 },
  { id: "4", vehicleNumber: "KA01GH3456", driverName: "Rajesh Kumar", lat: 12.9716, lng: 77.5946, speed: 0, fuelLevel: 90, status: "STOPPED", heading: 0 },
  { id: "5", vehicleNumber: "TN22IJ7890", driverName: "Mohan Das", lat: 13.0827, lng: 80.2707, speed: 28, fuelLevel: 63, status: "RUNNING", heading: 210 },
];

export class GPSSimulator {
  private io: SocketServer;
  private vehicles: SimulatedVehicle[] = initialSimulatorVehicles;
  private intervalId: NodeJS.Timeout | null = null;

  constructor(io: SocketServer) {
    this.io = io;
  }

  public startSimulation() {
    console.log("[GPS Simulator] Started broadcasting live vehicle updates every 3 seconds.");
    this.intervalId = setInterval(() => {
      this.vehicles = this.vehicles.map((v) => {
        if (v.status === "RUNNING") {
          // Slight movement
          const deltaLat = (Math.random() - 0.5) * 0.005;
          const deltaLng = (Math.random() - 0.5) * 0.005;
          const speedVar = Math.max(5, Math.min(80, Math.floor(v.speed + (Math.random() - 0.5) * 6)));
          const fuelDec = Math.max(5, v.fuelLevel - (Math.random() > 0.7 ? 0.1 : 0));

          return {
            ...v,
            lat: v.lat + deltaLat,
            lng: v.lng + deltaLng,
            speed: speedVar,
            fuelLevel: parseFloat(fuelDec.toFixed(1)),
          };
        }
        return v;
      });

      this.io.emit("gps:live_updates", this.vehicles);
    }, 3000);
  }

  public stopSimulation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log("[GPS Simulator] Stopped.");
    }
  }
}
