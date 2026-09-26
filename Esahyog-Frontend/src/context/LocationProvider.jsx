import { useCallback, useEffect, useRef, useState } from "react";

import { LocationContext } from "./LocationContext";

const LOCATION_CACHE_KEY = "esahyog_location_cache";
const LOCATION_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REVERSE_GEOCODE_TIMEOUT = 5000; // 5 seconds

export function LocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);
  const [locationAddress, setLocationAddress] = useState("");
  const [loading, setLoading] = useState(() => Boolean(navigator.geolocation));
  const [error, setError] = useState(null);

  const requestStartedRef = useRef(false);
  const requestIdRef = useRef(0);

  const reverseGeocode = useCallback(async (lat, lng) => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, REVERSE_GEOCODE_TIMEOUT);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve address.");
      }

      const data = await response.json();

      return data.display_name || "";
    } catch (err) {
      if (err.name === "AbortError") {
        console.warn("Reverse geocoding request timed out.");
      } else {
        console.error("Reverse geocoding error:", err);
      }

      return "";
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLoading(false);
      setError("Geolocation is not supported by this browser.");
      return;
    }

    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const location = {
          lat,
          lng,
        };

        setUserLocation(location);
        setLoading(false);

        try {
          const cached = sessionStorage.getItem(LOCATION_CACHE_KEY);

          if (cached) {
            const parsed = JSON.parse(cached);

            const isRecent =
              Date.now() - parsed.timestamp < LOCATION_CACHE_DURATION;

            const isNearby =
              Math.abs(parsed.lat - lat) < 0.001 &&
              Math.abs(parsed.lng - lng) < 0.001;

            if (isRecent && isNearby) {
              setLocationAddress(parsed.address);
              return;
            }
          }
        } catch (err) {
          console.warn("Location cache error:", err);
        }

        const address = await reverseGeocode(lat, lng);

        if (requestId !== requestIdRef.current) {
          return;
        }

        if (address) {
          setLocationAddress(address);

          try {
            sessionStorage.setItem(
              LOCATION_CACHE_KEY,
              JSON.stringify({
                lat,
                lng,
                address,
                timestamp: Date.now(),
              }),
            );
          } catch (err) {
            console.warn("Unable to cache location:", err);
          }
        }
      },

      (err) => {
        console.error("Geolocation error:", err);

        if (requestId !== requestIdRef.current) {
          return;
        }

        let message = "Unable to determine your location.";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            message =
              "Location permission was denied. Please allow location access.";
            break;

          case err.POSITION_UNAVAILABLE:
            message = "Your current location is unavailable.";
            break;

          case err.TIMEOUT:
            message = "Location request timed out. Please try again.";
            break;

          default:
            message = "Unable to determine your location.";
        }

        setError(message);
        setLoading(false);
      },

      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000,
      },
    );
  }, [reverseGeocode]);

  useEffect(() => {
    if (requestStartedRef.current) {
      return;
    }

    requestStartedRef.current = true;

    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        locationAddress,
        loading,
        error,
        getCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
