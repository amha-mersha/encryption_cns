import axios from "axios";

// Configure Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api/encryption",
  headers: {
    "Content-Type": "application/json",
  },
});

// Error handling
const handleError = (error: any) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    console.error("Response error:", error.response.data);
    throw new Error(error.response.data.error || "An error occurred");
  } else if (error.request) {
    // The request was made but no response was received
    console.error("Request error:", error.request);
    throw new Error("No response received from server");
  } else {
    // Something happened in setting up the request
    console.error("Error:", error.message);
    throw new Error("Error setting up request");
  }
};

// Key Generation API
export const generateKey = async (algorithm?: string, length?: number) => {
  try {
    const params = new URLSearchParams();
    if (algorithm) params.append("algorithm", algorithm);
    if (length) params.append("length", length.toString());

    const response = await api.get("/key/generate", { params });
    return response.data.key;
  } catch (error) {
    handleError(error);
  }
};

// OTP Encryption API
export const otpEncrypt = async (text: string, key: string) => {
  try {
    const response = await api.post("/otp/encrypt", { text, key });
    return response.data.encrypted;
  } catch (error) {
    handleError(error);
  }
};

export const otpDecrypt = async (encryptedText: string, key: string) => {
  try {
    const response = await api.post("/otp/decrypt", { encryptedText, key });
    return response.data.decrypted;
  } catch (error) {
    handleError(error);
  }
};

// 3DES Encryption API
export const tripleDesEncrypt = async (text: string, key: string) => {
  try {
    const response = await api.post("/3des/encrypt", { text, key });
    return {
      iv: response.data.iv,
      encryptedData: response.data.encryptedData,
    };
  } catch (error) {
    handleError(error);
  }
};

export const tripleDesDecrypt = async (
  encryptedData: string,
  key: string,
  iv: string,
) => {
  try {
    const response = await api.post("/3des/decrypt", {
      encryptedData,
      key,
      iv,
    });
    return response.data.decrypted;
  } catch (error) {
    handleError(error);
  }
};

// AES Encryption API
export const aesEncrypt = async (
  text: string,
  key: string,
  algorithm = "aes-256-cbc",
) => {
  try {
    const response = await api.post("/aes/encrypt", { text, key, algorithm });
    return {
      iv: response.data.iv,
      encryptedData: response.data.encryptedData,
    };
  } catch (error) {
    handleError(error);
  }
};

export const aesDecrypt = async (
  encryptedData: string,
  key: string,
  iv: string,
  algorithm = "aes-256-cbc",
) => {
  try {
    const response = await api.post("/aes/decrypt", {
      encryptedData,
      key,
      iv,
      algorithm,
    });
    return response.data.decrypted;
  } catch (error) {
    handleError(error);
  }
};

// RSA Encryption API
export const rsaEncrypt = async (plaintext: string) => {
  try {
    const response = await api.post("/rsa/encrypt", {
      plaintext,
    });
    return response.data.encrypted;
  } catch (error) {
    handleError(error);
  }
};

export const rsaDecrypt = async (encrypted: string) => {
  try {
    const response = await api.post("/rsa/decrypt", {
      encrypted,
    });
    return response.data.decrypted;
  } catch (error) {
    handleError(error);
  }
};

// Utility functions
export const validateKey = (algorithm: string, key: string): boolean => {
  switch (algorithm.toLowerCase()) {
    case "otp":
      return true; // OTP key length is validated during encryption
    case "3des":
      return key.length === 24;
    case "aes-128":
      return key.length === 16;
    case "aes-192":
      return key.length === 24;
    case "aes-256":
      return key.length === 32;
    default:
      return false;
  }
};

export const getDefaultKeyLength = (algorithm: string): number => {
  switch (algorithm.toLowerCase()) {
    case "otp":
      return 32;
    case "3des":
      return 24;
    case "aes-128":
      return 16;
    case "aes-192":
      return 24;
    case "aes-256":
      return 32;
    default:
      return 32;
  }
};

// Add request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log("Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Add response interceptor for logging (optional)
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response?.status, error.config?.url);
    return Promise.reject(error);
  },
);
