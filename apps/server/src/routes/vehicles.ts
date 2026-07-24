import { Router, Request, Response } from "express";

export const vehiclesRouter = Router();

const mockVehicles = [
  { id: "1", vehicleNumber: "AP39AB1234", brand: "JCB", model: "3DX Backhoe", status: "RUNNING", driver: "Ravi Kumar", fuelLevel: 72 },
  { id: "2", vehicleNumber: "TS09CD5678", brand: "Caterpillar", model: "320GC Excavator", status: "RUNNING", driver: "Suresh Reddy", fuelLevel: 58 },
  { id: "3", vehicleNumber: "MH12EF9012", brand: "Komatsu", model: "PC200 Excavator", status: "IDLE", driver: "Amit Sharma", fuelLevel: 45 },
];

vehiclesRouter.get("/", (req: Request, res: Response) => {
  res.json({ success: true, count: mockVehicles.length, data: mockVehicles });
});

vehiclesRouter.get("/:id", (req: Request, res: Response) => {
  const v = mockVehicles.find((x) => x.id === req.params.id) || mockVehicles[0];
  res.json({ success: true, data: v });
});

vehiclesRouter.post("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Vehicle added successfully", data: req.body });
});
