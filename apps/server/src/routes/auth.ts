import { Router, Request, Response } from "express";

export const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  res.json({
    token: "mock-jwt-token-fleetforce-enterprise",
    user: {
      id: "u-1",
      email: email || "admin@fleetforce.in",
      name: "Arun Kumar",
      role: role || "admin",
    },
  });
});

authRouter.post("/forgot-password", (req: Request, res: Response) => {
  res.json({ message: "Password reset link sent to registered email." });
});

authRouter.get("/me", (req: Request, res: Response) => {
  res.json({
    id: "u-1",
    name: "Arun Kumar",
    email: "admin@fleetforce.in",
    role: "admin",
  });
});
