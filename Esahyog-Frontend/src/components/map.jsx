import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  Loader2,
  LocateFixed,
  Plus,
  Minus,
  Navigation,
  Box,
} from "lucide-react";
import L from "leaflet";
import { useLocation } from "../context/useLocation";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapController = ({ userLocation, is3D, onRefreshLocation }) => {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => clearTimeout(timer);
  }, [map, is3D]);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleRecenter = () => {
    if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 16, {
        duration: 1.5,
      });
    } else {
      onRefreshLocation();
    }
  };

  return (
    <div className="absolute bottom-4 right-4 z-1000 flex flex-col gap-2">
      <div className="flex flex-col bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <button
          type="button"
          onClick={handleZoomIn}
          className="p-2.5 hover:bg-slate-100 transition-colors border-b border-slate-100 text-slate-600"
          aria-label="Zoom in"
        >
          <Plus size={18} />
        </button>

        <button
          type="button"
          onClick={handleZoomOut}
          className="p-2.5 hover:bg-slate-100 transition-colors text-slate-600"
          aria-label="Zoom out"
        >
          <Minus size={18} />
        </button>
      </div>

      <button
        type="button"
        onClick={handleRecenter}
        className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all active:scale-90 flex items-center justify-center"
        aria-label="Recenter map"
      >
        <LocateFixed size={18} />
      </button>
    </div>
  );
};

const createSubtleLocationIcon = (is3D) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div class="flex items-center justify-center" style="transform: ${
        is3D ? "rotateX(-45deg)" : "none"
      }">
        <div class="absolute w-8 h-8 bg-indigo-500/30 rounded-full animate-ping"></div>
        <div class="relative w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-md"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const MapComponent = () => {
  const { userLocation, loading, error, getCurrentLocation } = useLocation();
  const CARTO_API_KEY = import.meta.env.VITE_CARTO_API_KEY;

  const [is3D, setIs3D] = useState(false);

  const fallbackPosition = [30.9, 75.857];
  const initialZoom = 15;

  const centerPosition = userLocation
    ? [userLocation.lat, userLocation.lng]
    : fallbackPosition;

  if (loading) {
    return (
      <div className="h-full w-full bg-slate-900 flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3" />

        <p className="text-indigo-200/50 text-xs font-medium tracking-widest uppercase">
          Detecting Location
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      <div
        className={`w-full h-full transition-all duration-700 ease-in-out ${
          is3D ? "perspective-active" : ""
        }`}
        style={{
          perspective: is3D ? "1000px" : "none",
        }}
      >
        <div
          className="w-full h-full transition-transform duration-700"
          style={{
            transform: is3D
              ? "rotateX(45deg) scale(1.2)"
              : "rotateX(0deg) scale(1)",
            transformOrigin: "bottom center",
          }}
        >
          <MapContainer
            center={centerPosition}
            zoom={initialZoom}
            zoomControl={false}
            attributionControl={false}
            style={{
              height: "100%",
              width: "100%",
              background: "#1a1a1a",
            }}
            className="z-0"
          >
            <MapController
              userLocation={userLocation}
              is3D={is3D}
              onRefreshLocation={getCurrentLocation}
            />

            <TileLayer
              attribution="&copy; OpenStreetMap contributors &copy; CARTO"
              url={
                is3D
                  ? `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`
                  : `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`
              }
            />

            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={createSubtleLocationIcon(is3D)}
              >
                <Popup minWidth={150}>
                  <div className="p-1 text-slate-700">
                    <span className="font-bold text-sm flex items-center gap-2">
                      <Navigation size={14} className="text-indigo-600" />
                      Current Location
                    </span>

                    <div className="text-xs mt-2 text-slate-500">
                      <div>Lat: {userLocation.lat.toFixed(6)}</div>

                      <div>Lng: {userLocation.lng.toFixed(6)}</div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      </div>

      <div className="absolute top-3 right-3 z-1000">
        <button
          type="button"
          onClick={() => setIs3D((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all shadow-lg ${
            is3D
              ? "bg-indigo-600 border-indigo-400 text-white"
              : "bg-white/90 border-slate-200 text-slate-600"
          }`}
        >
          <Box size={16} className={is3D ? "animate-bounce" : ""} />

          <span className="text-[10px] font-bold uppercase tracking-wider">
            {is3D ? "2D View" : "3D View"}
          </span>
        </button>
      </div>

      <div className="absolute top-3 left-3 z-1000">
        <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              userLocation ? "bg-cyan-400 animate-pulse" : "bg-slate-500"
            }`}
          />

          <span className="text-[10px] font-bold text-cyan-100 uppercase tracking-widest">
            {userLocation ? "Live Tracking" : "Static Mode"}
          </span>
        </div>
      </div>

      {/* Location error */}
      {error && !userLocation && (
        <div className="absolute bottom-3 left-3 right-3 z-1000">
          <div className="bg-red-900/90 text-red-100 text-xs rounded-lg px-3 py-2">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
