import { apiClient } from "./apiClient";

// Returns { url, fileName, mimetype, size }
const upload = (endpoint, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return apiClient.post(endpoint, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Requires an authenticated session (technician already has a JWT).
export const uploadFile = (file) => upload("/media/upload", file);

// No auth required — for uploads that happen before registration completes
// (e.g. the ID proof photo on PersonalDetails, taken before `register()` runs).
export const uploadFilePublic = (file) => upload("/media/public-upload", file);
