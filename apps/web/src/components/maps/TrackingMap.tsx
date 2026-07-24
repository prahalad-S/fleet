"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Vehicle {
  id: string;
  number: string;
  driver: string;
  status: string;
  speed: number;
  fuel: number;
  lat: number;
  lng: number;
  model: string;
}

interface TrackingMapProps {
  vehicles: Vehicle[];
  selectedVehicle: string | null;
}

// Custom colored markers
function createMarkerIcon(status: string) {
  const colors: Record<string, string> = {
    running: "#22C55E",
    idle: "#F59E0B",
    stopped: "#EF4444",
    offline: "#9CA3AF",
  };
  const color = colors[status] || "#9CA3AF";

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position:relative;width:32px;height:32px;">
        <div style="
          width:28px;height:28px;
          background:${color};
          border:3px solid white;
          border-radius:50%;
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          display:flex;align-items:center;justify-content:center;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
            <path d="M15 18H9"/>
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
            <circle cx="17" cy="18" r="2"/>
            <circle cx="7" cy="18" r="2"/>
          </svg>
        </div>
        ${status === "running" ? `
        <div style="
          position:absolute;inset:-4px;
          border-radius:50%;
          border:2px solid ${color};
          opacity:0.4;
          animation:ping 2s ease-in-out infinite;
        "></div>` : ""}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
}

function FlyToVehicle({ vehicle }: { vehicle: Vehicle | null }) {
  const map = useMap();
  useEffect(() => {
    if (vehicle) {
      map.flyTo([vehicle.lat, vehicle.lng], 14, { duration: 1 });
    }
  }, [vehicle, map]);
  return null;
}

export default function TrackingMap({ vehicles, selectedVehicle }: TrackingMapProps) {
  const selected = vehicles.find((v) => v.id === selectedVehicle) || null;

  // Center of India
  const center: [number, number] = [17.385, 78.4867];

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
      `}</style>
      <MapContainer
        center={center}
        zoom={6}
        className="w-full h-full"
        zoomControl={false}
        style={{ background: "#1a1a1a" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FlyToVehicle vehicle={selected} />

        {vehicles.map((vehicle) => (
          <Marker
            key={vehicle.id}
            position={[vehicle.lat, vehicle.lng]}
            icon={createMarkerIcon(vehicle.status)}
          >
            <Popup
              className="custom-popup"
              maxWidth={280}
              closeButton={false}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  padding: "4px",
                  minWidth: "220px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: "800",
                      color: "#111",
                      margin: 0,
                    }}
                  >
                    {vehicle.number}
                  </h3>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      padding: "2px 8px",
                      borderRadius: "999px",
                      textTransform: "uppercase",
                      background:
                        vehicle.status === "running"
                          ? "#dcfce7"
                          : vehicle.status === "idle"
                          ? "#fef9c3"
                          : vehicle.status === "stopped"
                          ? "#fee2e2"
                          : "#f3f4f6",
                      color:
                        vehicle.status === "running"
                          ? "#16a34a"
                          : vehicle.status === "idle"
                          ? "#ca8a04"
                          : vehicle.status === "stopped"
                          ? "#dc2626"
                          : "#6b7280",
                    }}
                  >
                    {vehicle.status}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    margin: "0 0 8px",
                  }}
                >
                  {vehicle.model}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
                    fontSize: "11px",
                  }}
                >
                  <div>
                    <span style={{ color: "#999" }}>Driver: </span>
                    <strong style={{ color: "#111" }}>{vehicle.driver}</strong>
                  </div>
                  <div>
                    <span style={{ color: "#999" }}>Speed: </span>
                    <strong
                      style={{
                        color: vehicle.speed > 0 ? "#16a34a" : "#999",
                      }}
                    >
                      {vehicle.speed} km/h
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: "#999" }}>Fuel: </span>
                    <strong
                      style={{
                        color:
                          vehicle.fuel > 50
                            ? "#16a34a"
                            : vehicle.fuel > 20
                            ? "#ca8a04"
                            : "#dc2626",
                      }}
                    >
                      {vehicle.fuel}%
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: "#999" }}>Coords: </span>
                    <strong style={{ color: "#111" }}>
                      {vehicle.lat.toFixed(2)}, {vehicle.lng.toFixed(2)}
                    </strong>
                  </div>
                </div>
                <button
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    padding: "6px",
                    background: "#FFCC00",
                    color: "#111",
                    fontWeight: "700",
                    fontSize: "11px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Navigate
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
