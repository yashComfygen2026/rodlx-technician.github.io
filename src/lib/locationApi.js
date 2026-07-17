import { apiClient } from "./apiClient";

// Returns { city, serviceZones }
export const getCityZonesByLocation = (lat, lng) =>
  apiClient.get("/service-zones/by-location-city-base-zones", { params: { lat, lng } });

export const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Location services are not available on this device."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
      () => reject(new Error("Couldn't access your location. Please enable location access.")),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });
