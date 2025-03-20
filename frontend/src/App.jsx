import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [algorithm, setAlgorithm] = useState("AES");
  const [key, setKey] = useState("");
  const [length, setLength] = useState(16);
  const [data, setData] = useState("");
  const [encryptedData, setEncryptedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);
  const [generatedKey, setGeneratedKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateKey = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:3000/api/encrypt/generate-key", {
        algorithm,
        length: algorithm === "OTP" ? length : undefined
      });
      setGeneratedKey(response.data.generatedKey);
      setKey(response.data.generatedKey);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error generating key");
    }
  };

  const handleEncrypt = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:3000/api/encrypt/encrypt", {
        algorithm,
        data,
        key
      });
      setEncryptedData(response.data.encryptedData);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error encrypting data");
    }
  };

  const handleDecrypt = async () => {
    try {
      setErrorMessage("");
      const response = await axios.post("http://localhost:3000/api/encrypt/decrypt", {
        algorithm,
        data: encryptedData,
        key
      });
      setDecryptedData(response.data.decryptedData);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || "Error decrypting data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-center mb-4">Encryption and Decryption</h1>

        <div className="mb-4">
          <label htmlFor="algorithm" className="block text-sm font-medium text-gray-700">Algorithm</label>
          <select
            id="algorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="AES">AES</option>
            <option value="3DES">3DES</option>
            <option value="OTP">OTP</option>
          </select>
        </div>

        {algorithm === "OTP" && (
          <div className="mb-4">
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">OTP Key Length</label>
            <input
              type="number"
              id="length"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="key" className="block text-sm font-medium text-gray-700">Key</label>
          <input
            type="text"
            id="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data</label>
          <textarea
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4 flex justify-between">
          <button
            onClick={handleGenerateKey}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Generate Key
          </button>
          <button
            onClick={handleEncrypt}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Encrypt
          </button>
          <button
            onClick={handleDecrypt}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Decrypt
          </button>
        </div>

        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        {generatedKey && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Generated Key</h2>
            <p className="text-sm bg-gray-100 p-2 rounded-md">{generatedKey}</p>
          </div>
        )}

        {encryptedData && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Encrypted Data</h2>
            <p className="text-sm bg-gray-100 p-2 rounded-md">{encryptedData}</p>
          </div>
        )}

        {decryptedData && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Decrypted Data</h2>
            <p className="text-sm bg-gray-100 p-2 rounded-md">{decryptedData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
