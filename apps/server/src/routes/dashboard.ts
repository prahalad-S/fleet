import { Router, Request, Response } from "express";

export const dashboardRouter = Router();

dashboardRouter.get("/stats", (req: Request, res: Response) => {
  res.json({
    totalVehicles: 127,
    running: 84,
    idle: 18,
    maintenance: 12,
    availableDrivers: 45,
    driversOnDuty: 82,
    fuelConsumptionLiters: 2450,
    tripsToday: 34,
    distanceKm: 8742,
    inventoryCount: 1234,
    activeAlerts: 7,
    gpsOnline: 115,
  });
});
