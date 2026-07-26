# 🏗️ FleetForce — Industrial Enterprise Fleet Management System

![FleetForce Banner](https://img.shields.io/badge/JCB-Industrial%20Premium-FFCC00?style=for-the-badge&logoColor=111111)
![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)
![Socket.IO](https://img.shields.io/badge/Socket.io-Realtime-010101?style=for-the-badge&logo=socket.io)

**FleetForce** is a production-ready, enterprise-grade Fleet Management Web Application inspired by the bold, premium design language of **JCB** (#FFCC00 yellow accent, dark glassmorphism, micro-animations, and industrial aesthetics).

Designed for construction equipment companies like **JCB, Caterpillar, Komatsu, Volvo Construction, and Tata Hitachi**.

---

## 🌟 Key Features

### 🌐 1. JCB-Style Landing Website
- **Hero Section**: Animated excavator illustration, real-time signal pulses, bold typography, call-to-actions.
- **Company & Services**: Interactive service cards covering Live GPS, Maintenance, Fuel Analytics, and Driver Scoring.
- **Animated Statistics**: Dynamic count-up metrics for kilometers tracked, active vehicles, and fuel saved.
- **Projects & Testimonials**: Showcase major infrastructure projects and customer reviews carousel.
- **Full Responsiveness & Dark Mode Support**.

### 🔐 2. Authentication & RBAC
- Role-based login (Admin, Manager, Supervisor, Dispatcher, Operator, Driver).
- Demo account auto-fill.
- Granular permission matrix per module.

### 📊 3. Modern Admin Dashboard
- **12 Live Stat Cards**: Total Vehicles, Running, Idle, Under Maintenance, Drivers on Duty, Fuel Consumption, Trips Today, Distance Covered, Inventory Stock, Active Alerts, GPS Online.
- **Interactive Charts**: Vehicle usage area chart, monthly trips bar chart, fuel analytics line chart, category donut breakdown.
- **Recent Activity Feed**: Real-time operational logs and alerts.
- **Mini Map Preview**: Quick spatial view of machine locations.

### 🛰️ 4. GPS Live Tracking & Simulator
- **Leaflet / OpenStreetMap Integration** (CartoDB Dark tiles, free, no API key required).
- **Socket.IO Live GPS Simulator**: Moves markers every 3 seconds with speed variation and fuel depletion.
- **Status Markers**: Distinct colors for Running (Green), Idle (Yellow), Stopped (Red), and Offline (Gray).
- **Vehicle Popups**: Click any machine for instant speed, fuel, driver, location, and navigation buttons.

### 🛠️ 5. Complete Fleet Operations Modules
- **Fleet Management**: CRUD operations, specifications, compliance expiries (Insurance, Fitness, Pollution), QR codes.
- **Driver Management**: Driver scoring, license expiries, skills matrix, assigned machine tracking.
- **Trip Management**: Route planning, start/end locations, distance, duration, and average speed analytics.
- **Maintenance Module**: Preventive, breakdown, and scheduled service tracking with cost calculations.
- **Fuel Analytics**: Refuel logs, rate tracking, total expenditure, and mileage (km/L) charts.
- **Inventory Module**: Parts stock, SKU tracking, low stock warnings, suppliers, and transaction history.
- **Alerts & System Logs**: Overspeed, geofence exit, maintenance due, and low fuel alerts with one-click resolution.
- **Reports Export**: Configurable exports for PDF, Excel, and CSV with live document preview.
- **AI Fleet Assistant**: Natural language query interface ("Where is AP39AB1234?", "Show idle vehicles", "Predict maintenance").

---

## 🚀 Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Leaflet, Recharts, Lucide Icons, React Icons.
- **Backend**: Node.js, Express 5, Prisma ORM, Socket.IO, JWT, bcryptjs, Helmet.
- **Database**: PostgreSQL (Supabase).
- **Deployment**: Vercel ready for frontend, Supabase for DB & Auth.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### 1. Clone & Install
```bash
# Frontend dependencies
cd apps/web
npm install

# Backend dependencies
cd ../server
npm install
```

### 2. Run Locally

**Frontend:**
```bash
cd apps/web
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

**Backend Server with GPS Simulator:**
```bash
cd apps/server
npm run dev
```
Runs on `http://localhost:5000` with WebSocket server at `ws://localhost:5000`.

---

## 📝 License
Built with ❤️ for Heavy Equipment Fleet Operations.
