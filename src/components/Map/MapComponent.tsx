"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";
import { useAssignments } from "@/context/AssignmentsContext";
import Link from "next/link";
import { CgExpand } from "react-icons/cg";

const UserLocationMarker = () => {
  const [position, setPosition] = useState<[number, number] | null>(() => {
    const cachedPosition = localStorage.getItem("userPosition");
    return cachedPosition ? JSON.parse(cachedPosition) : null;
  });

  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties | null>(
    null
  );

  const map = useMap();

  useEffect(() => {
    const updatePosition = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPosition: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(newPosition);
          localStorage.setItem("userPosition", JSON.stringify(newPosition));
        },
        (err) => {
          console.error("Error getting user location:", err);
        }
      );
    };

    updatePosition();

    const intervalId = setInterval(updatePosition, 1000); // Updates every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (position) {
      const updateRipplePosition = () => {
        const point = map.latLngToContainerPoint(position); // Convert LatLng to container point
        setRippleStyle({
          position: "absolute",
          left: `${point.x - 50}px`, // Center the ripple horizontally
          top: `${point.y - 50}px`, // Center the ripple vertically
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "rgba(0, 123, 255, 0.3)",
          pointerEvents: "none",
          zIndex: 1000,
        });
      };

      updateRipplePosition();
      map.on("move", updateRipplePosition);
      map.on("zoom", updateRipplePosition);

      return () => {
        map.off("move", updateRipplePosition);
        map.off("zoom", updateRipplePosition);
      };
    }
  }, [position, map]);

  if (!position || !rippleStyle) return null;

  return (
    <>
      {/* Animated Ripple Effect */}
      <motion.div
        style={rippleStyle}
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* User Marker */}
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: "/images/user-marker-icon_new.png",
          iconSize: [15, 15],
          iconAnchor: [7.5, 7.5],
          popupAnchor: [0, -15],
        })}
      >
        <Popup>Je bent hier</Popup>
      </Marker>
    </>
  );
};

const MapEvents = () => {
  const map = useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      const newCenter: [number, number] = [center.lat, center.lng];
      localStorage.setItem("mapCenter", JSON.stringify(newCenter));
    },
    zoomend: () => {
      const zoom = map.getZoom();
      localStorage.setItem("mapZoom", JSON.stringify(zoom));
    },
  });

  return null;
};

const MapComponent = () => {
  const { locations } = useAssignments();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapCenter, setMapCenter] = useState<[number, number]>(() => {
    const cachedCenter = localStorage.getItem("mapCenter");
    return cachedCenter ? JSON.parse(cachedCenter) : [53.2194, 6.5665]; // Default to Groningen
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mapZoom, setMapZoom] = useState<number>(() => {
    const cachedZoom = localStorage.getItem("mapZoom");
    return cachedZoom ? JSON.parse(cachedZoom) : 14; // Default zoom level
  });

  // Define the bounding box for Groningen
  const groningenBounds: L.LatLngBoundsExpression = [
    [53.1, 6.4], // Southwest corner
    [53.3, 6.8], // Northeast corner
  ];

  return (
    <div className="flex items-center justify-center min-h-screen">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="map-container"
        maxBounds={groningenBounds}
        maxBoundsViscosity={1.0}
        minZoom={12}
        maxZoom={16}
      >
        <MapEvents />

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
              <Link
                href={`/view/${location.id}`}
                className="flex items-center justify-center w-full my-2"
              >
                <div className="p-2 bg-white rounded-full shadow-md">
                  <CgExpand className="text-md text-nav" />
                </div>
              </Link>

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
                  Je hebt{" "}
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
