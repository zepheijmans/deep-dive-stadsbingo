"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useAssignments } from "@/context/AssignmentsContext";

const UserLocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.error("Error getting user location:", err);
        }
      );
    };

    updatePosition();

    const intervalId = setInterval(updatePosition, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={L.icon({
        iconUrl: "/images/new-user-marker-icon.png",
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [1, -34],
      })}
    >
      <Popup>Je bent hier</Popup>
    </Marker>
  );
};

const MapComponent = () => {
  const { locations } = useAssignments();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <MapContainer
        center={[53.2194, 6.5665]} // Centered on Groningen
        zoom={14}
        className="map-container"
      >
        <TileLayer
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render markers for each location */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={L.icon({
              iconUrl: location.assignments.every(
                (assignment) => assignment.completed
              )
                ? "/images/marker-success-icon.png"
                : location.assignments.some(
                    (assignment) => assignment.completed
                  )
                ? "/images/marker-warning-icon.png"
                : "/images/marker-danger-icon.png",
              iconSize: [25, 25],
              iconAnchor: [12, 25],
              popupAnchor: [1, -34],
            })}
          >
            <Popup>
              <h3 className="font-bold">{location.title}</h3>

              {location.assignments.every(
                (assignment) => assignment.completed
              ) ? (
                <p className="text-success-300">
                  Je hebt alle opdrachten voltooid!
                </p>
              ) : location.assignments.some(
                  (assignment) => assignment.completed
                ) ? (
                <p className="text-warning-300">
                  Je hebt {" "}
                  {
                    location.assignments.filter(
                      (assignment) => assignment.completed
                    ).length
                  }{" "}
                  van de {location.assignments.length} opdrachten voltooid!
                </p>
              ) : (
                <p className="text-danger-300">
                  Je hebt nog geen opdrachten voltooid.
                </p>
              )}
            </Popup>
          </Marker>
        ))}

        <UserLocationMarker />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
