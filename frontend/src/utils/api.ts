import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/encrypt";

/**
 * Utility functions for interacting with the backend API using Axios.
 */

/**
 * Generate a key using the specified algorithm and length.
 * @param algorithm - The encryption algorithm (e.g., "AES", "3DES", "OTP").
 * @param length - The key length (e.g., 128, 192, 256).
 * @returns The generated key in hexadecimal format.
 * @throws Error if the request fails.
 */
export const generateKey = async (
  algorithm: string,
  length: number,
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate-key`, {
      algorithm,
      length,
    });

    return response.data.generatedKey;
  } catch (err) {
    throw new Error(
      axios.isAxiosError(err)
        ? err.response?.data?.error || err.message || "An error occurred"
        : err instanceof Error
          ? err.message
          : "An error occurred",
    );
  }
};

/**
 * Encrypt data using the specified algorithm, key, and input data.
 * @param algorithm - The encryption algorithm (e.g., "AES", "3DES", "OTP").
 * @param data - The data to encrypt.
 * @param key - The encryption key.
 * @returns The encrypted data.
 * @throws Error if the request fails.
 */
export const encryptData = async (
  algorithm: string,
  data: string,
  key: string,
  keyLength: number, // Add key length as a parameter
): Promise<{ encryptedData: string; iv: string }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/encrypt`, {
      algorithm,
      data,
      key: {
        value: key, // Key value
        length: keyLength, // Key length (e.g., 128, 192, 256)
      },
    });

    return {
      encryptedData: response.data.encryptedData,
      iv: response.data.iv, // Return the IV for decryption
    };
  } catch (err) {
    throw new Error(
      axios.isAxiosError(err)
        ? err.response?.data?.error || err.message || "Failed to encrypt data"
        : err instanceof Error
          ? err.message
          : "Failed to encrypt data",
    );
  }
};

/**
 * Decrypt data using the specified algorithm, key, IV, and encrypted data.
 * @param algorithm - The encryption algorithm (e.g., "AES", "3DES", "OTP").
 * @param data - The encrypted data to decrypt.
 * @param key - The decryption key.
 * @param iv - The initialization vector (if required by the algorithm).
 * @returns The decrypted data.
 * @throws Error if the request fails.
 */
export const decryptData = async (
  algorithm: string,
  data: string,
  key: string,
  keyLength: number, // Add key length as a parameter
  iv: string, // Add IV as a parameter
): Promise<string> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/decrypt`, {
      algorithm,
      data,
      key: {
        value: key, // Key value
        length: keyLength, // Key length (e.g., 128, 192, 256)
      },
      iv, // Pass the IV
    });

    return response.data.decryptedData;
  } catch (err) {
    throw new Error(
      axios.isAxiosError(err)
        ? err.response?.data?.error || err.message || "Failed to decrypt data"
        : err instanceof Error
          ? err.message
          : "Failed to decrypt data",
    );
  }
};
