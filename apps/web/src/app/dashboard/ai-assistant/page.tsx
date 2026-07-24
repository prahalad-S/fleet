"use client";

import { useState } from "react";
import { Bot, Send, User, Sparkles, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  card?: {
    title: string;
    items: { label: string; value: string }[];
  };
}

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "ai",
    text: "Hello! I am FleetForce AI, your assistant for the FleetForce Vehicle Management System. How can I help you with your fleet operations today?",
    timestamp: "Just now",
  },
];

const sampleQueries = [
  "Where is AP39AB1234?",
  "Which vehicles are currently moving?",
  "Show driver Suresh Reddy",
  "Predict maintenance for excavators",
  "Who is Virat Kohli?",
];

// Master Database Records for FleetForce AI
interface VehicleRecord {
  vehicleNumber: string;
  model: string;
  category: string;
  status: string;
  speed: number;
  driver: string;
  location: string;
  fuelLevel: number;
  engineStatus: string;
  tripStatus: string;
  lastUpdated: string;
}

interface DriverRecord {
  name: string;
  empId: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  assignedVehicle: string;
  status: string;
  todaysTrip: string;
}

const vehiclesDatabase: Record<string, VehicleRecord> = {
  AP39AB1234: {
    vehicleNumber: "AP39AB1234",
    model: "JCB 3DX Backhoe Loader",
    category: "Backhoe Loader",
    status: "In Progress",
    speed: 48,
    driver: "Ravi Kumar",
    location: "Near Gachibowli, Hyderabad, Telangana",
    fuelLevel: 72,
    engineStatus: "ON (Normal Temp)",
    tripStatus: "In Progress (Hyderabad → Warangal)",
    lastUpdated: "10:42 AM",
  },
  TS09CD5678: {
    vehicleNumber: "TS09CD5678",
    model: "Caterpillar 320GC Excavator",
    category: "Excavator",
    status: "Moving",
    speed: 62,
    driver: "Suresh Reddy",
    location: "NH-44 Highway, Kamareddy, TS",
    fuelLevel: 58,
    engineStatus: "ON",
    tripStatus: "In Progress",
    lastUpdated: "10:40 AM",
  },
  MH12EF9012: {
    vehicleNumber: "MH12EF9012",
    model: "Komatsu PC200 Excavator",
    category: "Excavator",
    status: "Idle",
    speed: 0,
    driver: "Amit Sharma",
    location: "Pune Bypass Site, Maharashtra",
    fuelLevel: 45,
    engineStatus: "ON (Idling 42m)",
    tripStatus: "On Hold",
    lastUpdated: "10:38 AM",
  },
  KA01GH3456: {
    vehicleNumber: "KA01GH3456",
    model: "Volvo EC210D Excavator",
    category: "Excavator",
    status: "Stopped",
    speed: 0,
    driver: "Rajesh Kumar",
    location: "Bangalore Hub, Karnataka",
    fuelLevel: 90,
    engineStatus: "OFF",
    tripStatus: "Completed",
    lastUpdated: "09:15 AM",
  },
  TN22IJ7890: {
    vehicleNumber: "TN22IJ7890",
    model: "JCB 455ZX Wheel Loader",
    category: "Wheel Loader",
    status: "Moving",
    speed: 37,
    driver: "Mohan Das",
    location: "OMR Expressway, Chennai, Tamil Nadu",
    fuelLevel: 63,
    engineStatus: "ON",
    tripStatus: "In Progress",
    lastUpdated: "10:41 AM",
  },
  AP07KL2345: {
    vehicleNumber: "AP07KL2345",
    model: "Tata Hitachi ZAXIS 120",
    category: "Mini Excavator",
    status: "Available",
    speed: 0,
    driver: "Prakash Rao",
    location: "Vijayawada Depot, Andhra Pradesh",
    fuelLevel: 100,
    engineStatus: "OFF",
    tripStatus: "Planned",
    lastUpdated: "08:00 AM",
  },
  TS05MN6789: {
    vehicleNumber: "TS05MN6789",
    model: "JCB VM115 Compactor",
    category: "Compactor",
    status: "Moving",
    speed: 8,
    driver: "Venkat Rao",
    location: "NH-65 Road Work Site, AP",
    fuelLevel: 34,
    engineStatus: "ON",
    tripStatus: "In Progress",
    lastUpdated: "10:35 AM",
  },
  MH04OP1234: {
    vehicleNumber: "MH04OP1234",
    model: "CAT D6 Bulldozer",
    category: "Bulldozer",
    status: "Idle",
    speed: 0,
    driver: "Ramesh Patil",
    location: "Polavaram Dam Project, AP",
    fuelLevel: 51,
    engineStatus: "ON (Idling 15m)",
    tripStatus: "Active Work Site",
    lastUpdated: "10:30 AM",
  },
};

const driversDatabase: DriverRecord[] = [
  { name: "Ravi Kumar", empId: "DRV-001", phone: "+91 98765 43210", licenseNumber: "AP2420220012345", licenseExpiry: "2027-03-15", assignedVehicle: "AP39AB1234", status: "On Duty", todaysTrip: "Hyderabad → Warangal" },
  { name: "Suresh Reddy", empId: "DRV-002", phone: "+91 98765 43211", licenseNumber: "TS0920210098765", licenseExpiry: "2026-11-20", assignedVehicle: "TS09CD5678", status: "On Duty", todaysTrip: "Mumbai → Pune" },
  { name: "Amit Sharma", empId: "DRV-003", phone: "+91 98765 43212", licenseNumber: "MH1220190054321", licenseExpiry: "2026-08-10", assignedVehicle: "MH12EF9012", status: "On Duty", todaysTrip: "Pune Bypass Construction" },
  { name: "Rajesh Kumar", empId: "DRV-004", phone: "+91 98765 43213", licenseNumber: "KA0120230067890", licenseExpiry: "2028-01-05", assignedVehicle: "KA01GH3456", status: "Available", todaysTrip: "None" },
  { name: "Mohan Das", empId: "DRV-005", phone: "+91 98765 43214", licenseNumber: "TN2220210043210", licenseExpiry: "2026-12-30", assignedVehicle: "TN22IJ7890", status: "On Duty", todaysTrip: "Chennai → Vellore" },
  { name: "Prakash Rao", empId: "DRV-006", phone: "+91 98765 43215", licenseNumber: "AP0720200078901", licenseExpiry: "2027-06-18", assignedVehicle: "AP07KL2345", status: "On Leave", todaysTrip: "None" },
  { name: "Venkat Rao", empId: "DRV-007", phone: "+91 98765 43216", licenseNumber: "TS0520220056789", licenseExpiry: "2027-09-22", assignedVehicle: "TS05MN6789", status: "On Duty", todaysTrip: "NH-65 Compacting" },
  { name: "Ramesh Patil", empId: "DRV-008", phone: "+91 98765 43217", licenseNumber: "MH0420210034567", licenseExpiry: "2026-10-14", assignedVehicle: "MH04OP1234", status: "On Duty", todaysTrip: "Polavaram Project Site" },
];

// Out of scope topics
const forbiddenKeywords = [
  "politics", "election", "president", "prime minister", "government", "vote",
  "religion", "god", "church", "temple", "mosque", "bible", "quran",
  "medical", "doctor", "medicine", "disease", "treatment", "health advice",
  "coding", "programming", "javascript", "python", "tutorial", "code", "html", "css",
  "homework", "math", "equation", "solve", "essay",
  "movie", "film", "actor", "cinema", "hollywood", "bollywood",
  "sports", "cricket", "football", "virat kohli", "messi", "ronaldo", "match", "score",
  "recipe", "cook", "food", "dish", "kitchen",
  "crypto", "bitcoin", "ethereum", "stock market", "trading", "investing",
  "weather", "forecast", "rain", "temperature",
  "shopping", "buy", "amazon", "price of",
];

// Typo correction dictionary for natural language
function normalizeInput(input: string): string {
  let text = input.toLowerCase();
  text = text.replace(/\b(vehical|vehcle|vhicle|machin|macheen)\b/g, "vehicle");
  text = text.replace(/\b(drver|drivr|drivere)\b/g, "driver");
  text = text.replace(/\b(trak|trackin|locaton|locaiton|ware)\b/g, "tracking");
  text = text.replace(/\b(fule|dusel|disel)\b/g, "fuel");
  text = text.replace(/\b(mantenance|maintnance|servic)\b/g, "maintenance");
  return text;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Conversation Context Memory
  const [contextVehicle, setContextVehicle] = useState<string | null>(null);
  const [contextDriver, setContextDriver] = useState<string | null>(null);

  const handleSend = (textToSend?: string) => {
    const rawQuery = textToSend || input;
    if (!rawQuery.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: rawQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiText = "";
      let cardData: Message["card"] | undefined = undefined;

      const lowerQuery = rawQuery.trim().toLowerCase();
      const normalized = normalizeInput(rawQuery);

      // 1. Check for Out of Scope / Forbidden Topics
      const isForbidden = forbiddenKeywords.some((keyword) => lowerQuery.includes(keyword));

      if (isForbidden) {
        aiText = "I'm designed specifically for the FleetForce application and can assist with fleet management tasks such as vehicles, drivers, GPS tracking, maintenance, fuel, and reports. I don't provide answers outside this application's scope.";
      } 
      // 2. Greetings
      else if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|sup|help)\b/i.test(lowerQuery)) {
        aiText = "Hello! I am FleetForce AI. How can I assist you with your fleet operations today? You can ask me about vehicle tracking, driver info, maintenance schedules, fuel consumption, or live alerts.";
      }
      // 3. Search for Specific Vehicle (Registration Number or Fleet ID)
      else if (
        Object.keys(vehiclesDatabase).some((vKey) => lowerQuery.includes(vKey.toLowerCase())) ||
        (/\b[a-z]{2}\d{2}[a-z]{2}\d{4}\b/i.test(lowerQuery))
      ) {
        const foundKey = Object.keys(vehiclesDatabase).find((vKey) => lowerQuery.includes(vKey.toLowerCase()));
        
        if (foundKey && vehiclesDatabase[foundKey]) {
          const v = vehiclesDatabase[foundKey];
          setContextVehicle(foundKey);
          setContextDriver(v.driver);

          aiText = `Vehicle ${v.vehicleNumber} (${v.model}) is currently near ${v.location}.\n` +
                   `• Status: ${v.status}\n` +
                   `• Speed: ${v.speed} km/h\n` +
                   `• Driver: ${v.driver}\n` +
                   `• Fuel: ${v.fuelLevel}%\n` +
                   `• Engine Status: ${v.engineStatus}\n` +
                   `• Trip Status: ${v.tripStatus}\n` +
                   `• Last Updated: ${v.lastUpdated}`;

          cardData = {
            title: `Vehicle ${v.vehicleNumber} Telemetry`,
            items: [
              { label: "Vehicle Number", value: v.vehicleNumber },
              { label: "Machine Model", value: v.model },
              { label: "Status", value: v.status },
              { label: "Current Speed", value: `${v.speed} km/h` },
              { label: "Assigned Driver", value: v.driver },
              { label: "Location", value: v.location },
              { label: "Fuel Level", value: `${v.fuelLevel}%` },
              { label: "Engine Status", value: v.engineStatus },
              { label: "Trip Status", value: v.tripStatus },
              { label: "Last Updated", value: v.lastUpdated },
            ],
          };
        } else {
          const matchedNo = (rawQuery.match(/[a-z0-9]{6,10}/i) || [rawQuery])[0];
          aiText = `No vehicle matching '${matchedNo}' was found in the FleetForce system.`;
        }
      }
      // 4. Search Driver by Name or ID
      else if (
        lowerQuery.includes("driver") ||
        driversDatabase.some((d) => lowerQuery.includes(d.name.toLowerCase()) || lowerQuery.includes(d.empId.toLowerCase()))
      ) {
        const foundDriver = driversDatabase.find(
          (d) => lowerQuery.includes(d.name.toLowerCase()) || lowerQuery.includes(d.empId.toLowerCase())
        );

        if (foundDriver) {
          setContextDriver(foundDriver.name);
          setContextVehicle(foundDriver.assignedVehicle);

          aiText = `Driver ${foundDriver.name} (${foundDriver.empId}):\n` +
                   `• Assigned Vehicle: ${foundDriver.assignedVehicle}\n` +
                   `• Current Status: ${foundDriver.status}\n` +
                   `• Today's Trip: ${foundDriver.todaysTrip}\n` +
                   `• License Expiry: ${foundDriver.licenseExpiry}\n` +
                   `• Contact: ${foundDriver.phone}`;

          cardData = {
            title: `Driver Record — ${foundDriver.name}`,
            items: [
              { label: "Driver Name", value: foundDriver.name },
              { label: "Employee ID", value: foundDriver.empId },
              { label: "Assigned Vehicle", value: foundDriver.assignedVehicle },
              { label: "Current Status", value: foundDriver.status },
              { label: "Today's Trip", value: foundDriver.todaysTrip },
              { label: "License Expiry", value: foundDriver.licenseExpiry },
              { label: "Contact Phone", value: foundDriver.phone },
            ],
          };
        } else if (lowerQuery.includes("show driver") || lowerQuery.includes("who is driver") || lowerQuery.includes("find driver")) {
          const namePart = rawQuery.replace(/show|driver|who|is|find|the/gi, "").trim();
          aiText = `No driver named "${namePart || rawQuery}" was found in the system.`;
        } else {
          // General drivers info
          aiText = "Here are the on-duty drivers currently assigned to active fleet vehicles:\n" +
                   "• Ravi Kumar — AP39AB1234 (Hyderabad → Warangal)\n" +
                   "• Suresh Reddy — TS09CD5678 (Mumbai → Pune)\n" +
                   "• Amit Sharma — MH12EF9012 (Pune Bypass Site)\n" +
                   "• Mohan Das — TN22IJ7890 (Chennai Expressway)";
        }
      }
      // 5. Context Memory Follow-up (e.g. "Who is the driver?" or "What is its fuel?")
      else if (
        contextVehicle &&
        (lowerQuery.includes("who is the driver") || lowerQuery.includes("driver") || lowerQuery.includes("fuel") || lowerQuery.includes("speed") || lowerQuery.includes("where"))
      ) {
        const v = vehiclesDatabase[contextVehicle];
        aiText = `For Vehicle ${v.vehicleNumber}:\n` +
                 `• Assigned Driver: ${v.driver}\n` +
                 `• Current Speed: ${v.speed} km/h\n` +
                 `• Fuel Level: ${v.fuelLevel}%\n` +
                 `• Location: ${v.location}`;
      }
      // 6. Moving / Running Vehicles
      else if (normalized.includes("moving") || normalized.includes("running") || normalized.includes("motion")) {
        const moving = Object.values(vehiclesDatabase).filter((v) => v.speed > 0);
        aiText = "Here are the vehicles currently in motion:\n" +
                 moving.map((v) => `• ${v.vehicleNumber} (${v.model}) — ${v.speed} km/h (Driver: ${v.driver})`).join("\n");
      }
      // 7. Idle Vehicles
      else if (normalized.includes("idle") || normalized.includes("idling")) {
        const idle = Object.values(vehiclesDatabase).filter((v) => v.status === "Idle");
        aiText = "Here are the vehicles currently idling:\n" +
                 idle.map((v) => `• ${v.vehicleNumber} — ${v.location} (Engine Status: ${v.engineStatus})`).join("\n");
      }
      // 8. Highest Fuel / Fuel Consumption
      else if (normalized.includes("highest fuel") || normalized.includes("fuel consumption") || normalized.includes("fuel")) {
        aiText = "Based on the available fleet data, Driver Suresh Reddy's assigned vehicle (TS09CD5678) recorded the highest fuel consumption during the selected period (620 Liters total).";
      }
      // 9. Maintenance Records & Predictions
      else if (normalized.includes("maintenance") || normalized.includes("predict") || normalized.includes("service")) {
        aiText = "Recorded Maintenance Summary:\n" +
                 "• AP39AB1234: Oil Change + Filter (Completed 2026-07-20)\n" +
                 "• TS09CD5678: Hydraulic System Inspection (Scheduled 2026-07-28)\n" +
                 "• MH12EF9012: Engine Repair (In Progress at Komatsu Service Center)";
      }
      // 10. General Fleet Analytics / Numbers
      else if (normalized.includes("analytics") || normalized.includes("stats") || normalized.includes("how many") || normalized.includes("total")) {
        aiText = "FleetForce Overview Statistics:\n" +
                 "• Total Active Machines: 127\n" +
                 "• Currently Moving: 84\n" +
                 "• Idling: 18\n" +
                 "• Under Maintenance: 12\n" +
                 "• Drivers On Duty: 82";
      }
      // 11. Catch-all: Politely explain limit of scope & redirect
      else {
        aiText = "I can help only with FleetForce fleet management tasks such as vehicles, drivers, trips, maintenance, fuel, GPS tracking, reports, and dashboard information. Please let me know how I can assist with your fleet!";
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        card: cardData,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col bg-surface rounded-2xl border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-dark text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base flex items-center gap-2">
              FleetForce AI Assistant
              <span className="px-2 py-0.5 bg-primary text-dark text-[10px] font-bold rounded-full uppercase">
                Conversational Intelligence
              </span>
            </h2>
            <p className="text-xs text-white/50">Production-ready AI assistant for fleet telemetry, tracking & reports</p>
          </div>
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="p-3 bg-background border-b border-border flex items-center gap-2 overflow-x-auto">
        <span className="text-xs font-bold text-text-muted shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-primary" /> Suggestions:
        </span>
        {sampleQueries.map((q) => (
          <button
            key={q}
            onClick={() => handleSend(q)}
            className="px-3 py-1 bg-surface hover:bg-primary/10 border border-border rounded-lg text-xs font-medium text-text-secondary hover:text-dark transition-all whitespace-nowrap"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === "user" ? "bg-dark text-primary" : "bg-primary text-dark"
              }`}
            >
              {msg.sender === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={`max-w-xl space-y-2 ${msg.sender === "user" ? "text-right" : ""}`}>
              <div
                className={`inline-block p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-dark text-white rounded-tr-none"
                    : "bg-background border border-border text-dark rounded-tl-none shadow-card"
                }`}
              >
                <p>{msg.text}</p>

                {msg.card && (
                  <div className="mt-3 p-3 bg-surface rounded-xl border border-primary/30 text-left">
                    <h4 className="font-heading font-bold text-xs text-primary mb-2 uppercase">
                      {msg.card.title}
                    </h4>
                    <div className="space-y-1 text-xs">
                      {msg.card.items.map((item) => (
                        <div key={item.label} className="flex justify-between border-b border-border/50 pb-1">
                          <span className="text-text-muted">{item.label}:</span>
                          <span className="font-bold text-dark">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-text-muted px-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-dark flex items-center justify-center">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="bg-background border border-border p-3 rounded-2xl text-xs text-text-muted flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" /> FleetForce AI is querying fleet database...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-border bg-surface">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI e.g. 'Where is AP39AB1234?', 'Which driver oversped today?', or 'Who is Virat Kohli?'"
            className="flex-1 px-4 py-3 bg-background rounded-xl border border-border text-sm focus:border-primary outline-none transition-colors"
          />
          <button type="submit" className="btn-primary py-3">
            <Send className="w-4 h-4" /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
