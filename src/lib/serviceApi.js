import { apiClient } from "./apiClient";

// Returns an array of { id, categoryId, name, description, basePrice, ... }
export const listServices = () => apiClient.get("/services/all");

// Returns an array of { id, name, ... }
export const listServiceCategories = () => apiClient.get("/service-categories/all");
