import { apiClient } from "./apiClient";

export const US_COUNTRY_CODE = {
  name: "United States",
  dialCode: "+1",
  shortName: "US",
  emoji: "🇺🇸",
};

const TECH = "/auth/technician";

export const authApi = {
  loginSendOtp: (phone, countryCode = US_COUNTRY_CODE) =>
    apiClient.post(`${TECH}/login-send-otp`, { phone, countryCode }),

  loginVerifyOtp: (userToken, otp) =>
    apiClient.post(`${TECH}/login-verify-otp`, { userToken, otp }),

  register: ({ fullName, email, phone, idProof, userToken, referredBy }) =>
    apiClient.post(`${TECH}/register`, { fullName, email, phone, idProof, userToken, referredBy }),

  registerStep2: (payload) => apiClient.post(`${TECH}/register-step2`, payload),

  registerStep3: (services) => apiClient.post(`${TECH}/register-step3`, { services }),

  registerStep4: ({ cityId, serviceZoneId }) =>
    apiClient.post(`${TECH}/register-step4`, { cityId, serviceZoneId }),

  getProfile: () => apiClient.get(`${TECH}/profile`),

  updateProfile: (payload) => apiClient.put(`${TECH}/profile`, payload),

  logout: () => apiClient.post(`${TECH}/logout`),
};
