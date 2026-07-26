"use client";

import { useState } from "react";
import FleetVehicleModal, { FleetVehicleData } from "@/components/3d/FleetVehicleModal";
import { Truck, Rotate3d, Eye, Zap, ShieldCheck } from "lucide-react";

export const jcbFleetData: FleetVehicleData[] = [
  {
    id: "jcb-3dx",
    name: "JCB 3DX EcoXcellence",
    category: "Backhoe Loader",
    power: "76 HP @ 2200 RPM",
    weight: "7,460 kg",
    digDepth: "4.77 meters",
    bucketCap: "1.1 cu.m",
    speed: "36 km/h",
    desc: "India's iconic backhoe loader equipped with ecoMAX fuel-efficient engine, LiveLink telematics, and heavy-duty front loader assembly.",
    features: ["ecoMAX Fuel Saver Engine", "5G LiveLink Telematics Integrated", "Heavy-Duty Curved Boom", "All-Weather AC Operator Cabin"],
    applications: ["Earthmoving", "Road Construction", "Trenching & Excavation", "Material Handling"],
    colorHex: "#F5B400",
  },
  {
    id: "jcb-2dx",
    name: "JCB 2DX Compact",
    category: "Compact Backhoe",
    power: "49 HP Turbo Engine",
    weight: "5,100 kg",
    digDepth: "3.02 meters",
    bucketCap: "0.6 cu.m",
    speed: "28 km/h",
    desc: "Ultra-compact agile backhoe loader designed for narrow urban lanes, municipal work, and tight agricultural spaces.",
    features: ["Narrow Footprint Chassis", "Low Fuel Consumption Rate", "High Maneuverability Steering", "Easy Serviceability Access"],
    applications: ["Urban Infrastructure", "Cable Trenching", "Agricultural Plowing", "Drainage Works"],
    colorHex: "#E5A300",
  },
  {
    id: "jcb-4dx",
    name: "JCB 4DX Heavy Duty",
    category: "Heavy Backhoe Loader",
    power: "92 HP Turbocharged",
    weight: "8,650 kg",
    digDepth: "5.36 meters",
    bucketCap: "1.2 cu.m",
    speed: "40 km/h",
    desc: "Heavy-duty backhoe loader built for rigorous mining, stone quarrying, and high-volume heavy infrastructure earthworks.",
    features: ["Heavy Duty Equal-Sized Tires", "High Dig Force Cylinders", "Smoothshift Automatic Transmission", "ROPS/FOPS Operator Safety"],
    applications: ["Quarrying & Mining", "High-Volume Excavation", "Highway Expansion", "Demolition"],
    colorHex: "#FFB800",
  },
  {
    id: "jcb-5cx",
    name: "JCB 5CX WasteMaster",
    category: "Flagship Heavy Backhoe",
    power: "118 HP Tier 4 Final",
    weight: "9,810 kg",
    digDepth: "6.51 meters",
    bucketCap: "1.3 cu.m",
    speed: "42 km/h",
    desc: "The ultimate flagship backhoe loader with 4-wheel steer, massive loader lift capacity, and heavy waste management capabilities.",
    features: ["All-Wheel Steering & Crab Mode", "TorqueLock Fuel Saver Transmission", "Auto-Leveling Loader Bucket", "360-Degree Work Lights"],
    applications: ["Waste Recycling", "Heavy Construction", "Industrial Logistics", "Bulk Earthworks"],
    colorHex: "#D99B00",
  },
  {
    id: "jcb-mini-19c",
    name: "JCB 19C-1 Mini Excavator",
    category: "Mini Excavator",
    power: "16.5 HP Diesel",
    weight: "1,910 kg",
    digDepth: "2.57 meters",
    bucketCap: "0.04 cu.m",
    speed: "4.5 km/h",
    desc: "Lightweight mini crawler excavator with zero tail swing options, designed for indoor demolition, landscaping, and pipe laying.",
    features: ["100% Steel Body Panels", "Zero Tailswing Radius", "Extendable Undercarriage Track", "Electro-Proportional Controls"],
    applications: ["Indoor Demolition", "Pipe Laying", "Landscaping", "Utility Excavation"],
    colorHex: "#F5B400",
  },
  {
    id: "jcb-backhoe-super",
    name: "JCB 3DX Super",
    category: "High Performance Backhoe",
    power: "92 HP High Torque",
    weight: "7,800 kg",
    digDepth: "5.05 meters",
    bucketCap: "1.1 cu.m",
    speed: "38 km/h",
    desc: "Enhanced power variant of the iconic 3DX loader with higher breakout forces and faster hydraulic cycle times.",
    features: ["High-Pressure Hydraulics", "Heavy-Duty Axles", "Intelligent Auto-Idle", "Ergonomic Servo Joysticks"],
    applications: ["Commercial Construction", "Canal Digging", "Bridge Foundations", "Site Prep"],
    colorHex: "#E5A300",
  },
  {
    id: "jcb-wheel-loader",
    name: "JCB 435S Wheel Loader",
    category: "Wheel Loader",
    power: "252 HP Cummins Engine",
    weight: "14,250 kg",
    digDepth: "3.95m Dump Height",
    bucketCap: "2.7 cu.m",
    speed: "45 km/h",
    desc: "High-output heavy articulated wheel loader designed for fast cycle bulk material handling in ports, mines, and batching plants.",
    features: ["6-Speed PowerShift Transmission", "CommandPlus Quiet Cab", "High-Torque Parallel Lift Arms", "Auto Lubrication System"],
    applications: ["Port Bulk Cargo", "Mining Stockpiles", "Concrete Batching", "Aggregate Loading"],
    colorHex: "#FFB800",
  },
  {
    id: "jcb-compact-55z",
    name: "JCB 55Z-1 Compact",
    category: "Compact Excavator",
    power: "48 HP Perkins Engine",
    weight: "5,360 kg",
    digDepth: "3.84 meters",
    bucketCap: "0.18 cu.m",
    speed: "4.8 km/h",
    desc: "Mid-sized compact midi excavator delivering full-size hydraulic breakout forces with compact footprint maneuverability.",
    features: ["100% Steel Body Panels", "Tilting Operator Cab", "Low Noise & Emissions", "Auxiliary Hydraulic Circuit"],
    applications: ["Urban Highway Repairs", "Foundations", "Water Pipeline Trenching", "Forestry"],
    colorHex: "#D99B00",
  },
  {
    id: "jcb-crawler-nxt215",
    name: "JCB NXT 215LC Crawler",
    category: "Crawler Excavator",
    power: "140 HP Heavy Duty",
    weight: "21,500 kg",
    digDepth: "6.70 meters",
    bucketCap: "1.02 cu.m",
    speed: "5.2 km/h",
    desc: "Heavy 21-ton track crawler excavator engineered for extreme rock digging, deep trench excavation, and quarry loading.",
    features: ["Intelligent Hydraulic Control (IHC)", "Heavy Duty X-Frame Chassis", "Reinforced HD Arm & Boom", "Smart Power Mode Selector"],
    applications: ["Rock Mining", "Deep Canal Works", "Heavy Earth Removal", "Demolition"],
    colorHex: "#F5B400",
  },
  {
    id: "jcb-forklift-930",
    name: "JCB 930 RTFL Forklift",
    category: "Rough Terrain Forklift",
    power: "74 HP EcoMAX",
    weight: "6,340 kg",
    digDepth: "4.5m Lift Height",
    bucketCap: "3,000 kg Payload",
    speed: "29 km/h",
    desc: "Heavy-duty rough terrain forklift engineered to transport heavy loads across unpaved muddy construction sites and industrial yards.",
    features: ["SynchroShuttle Transmission", "4-Wheel Drive Traction", "High Clearance Steel Mast", "Sideshift Fork Attachment"],
    applications: ["Rough Terrain Logistics", "Lumber Yards", "Building Site Supply", "Industrial Plants"],
    colorHex: "#E5A300",
  },
];

export default function OurFleetSection() {
  const [selectedVehicle, setSelectedVehicle] = useState<FleetVehicleData | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="relative py-20 bg-[#302c1a] border-t border-white/10 overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider mb-4">
          <Truck className="w-4 h-4" />
          <span>Heavy Fleet Machinery</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tracking-tight">
          OUR <span className="text-primary">FLEET</span> Showcase
        </h2>
        <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-medium">
          Explore India's leading range of JCB heavy earthmoving equipment, backhoe loaders, excavators, and rough terrain material handlers.
        </p>
      </div>

      {/* CONTINUOUS INFINITE MARQUEE SLIDER (PAUSES RELIABLY ON HOVER) */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Gradient Fades to #302c1a */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#302c1a] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#302c1a] to-transparent z-20 pointer-events-none" />

        {/* Marquee Track (Repeated twice for seamless loop) */}
        <div
          className="flex gap-6 w-max animate-marquee cursor-pointer py-4"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        >
          {[...jcbFleetData, ...jcbFleetData].map((vehicle, index) => (
            <div
              key={`${vehicle.id}-${index}`}
              onClick={() => setSelectedVehicle(vehicle)}
              className="w-[300px] sm:w-[340px] flex-shrink-0 bg-dark-800/90 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:border-primary transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_10px_40px_rgba(255,204,0,0.25)] flex flex-col justify-between group/card"
            >
              {/* Badge & Category */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-[11px] font-bold uppercase tracking-wide">
                    {vehicle.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover/card:bg-primary group-hover/card:text-dark transition-colors">
                    <Rotate3d className="w-4 h-4" />
                  </div>
                </div>

                {/* Vehicle 3D Preview Frame Box */}
                <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-4 relative overflow-hidden group-hover/card:border-primary/50 transition-colors">
                  <div className="text-center">
                    <Truck className="w-12 h-12 text-primary mx-auto mb-2 transform group-hover/card:scale-110 transition-transform" />
                    <span className="text-[11px] font-mono text-white/60 block">Click for 3D Model View</span>
                  </div>

                  {/* Hover Overlay Badge */}
                  <div className="absolute inset-0 bg-primary/15 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-primary text-dark font-bold text-xs flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" /> Inspect 3D Model
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-heading font-black text-xl text-white group-hover/card:text-primary transition-colors mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed mb-4">
                  {vehicle.desc}
                </p>
              </div>

              {/* Quick Specs Footer */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-white/40 text-[10px] block uppercase font-bold">Power</span>
                  <span className="text-white font-bold">{vehicle.power.split(" ")[0]} HP</span>
                </div>
                <div>
                  <span className="text-white/40 text-[10px] block uppercase font-bold">Dig Depth</span>
                  <span className="text-white font-bold">{vehicle.digDepth.split(" ")[0]}m</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive 3D Model Popup Modal */}
      <FleetVehicleModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </section>
  );
}
