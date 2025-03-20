import { useState } from "react";
import KeyInput from "./KeyInput";
import GenerateKeyButton from "./GenerateKeyButton";

export default function EncryptionForm({ algorithm, key, setKey, keyLength, setKeyLength }) {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");

  const handleEncrypt = () => {
    // Call API to encrypt data
    console.log("Encrypting:", inputData);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Encryption</h2>
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data to encrypt"
        className="w-full bg-gray-700 text-white p-2 rounded mb-4"
        rows={4}
      />
      <KeyInput
        algorithm={algorithm}
        key={key}
        setKey={setKey}
        keyLength={keyLength}
        setKeyLength={setKeyLength}
        inputData={inputData}
      />
      <GenerateKeyButton algorithm={algorithm} setKey={setKey} setKeyLength={setKeyLength} />
      <button
        onClick={handleEncrypt}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mt-4"
      >
        Encrypt
      </button>
      {outputData && (
        <div className="mt-4">
          <h3 className="font-semibold">Encrypted Data:</h3>
          <p className="bg-gray-700 p-2 rounded break-words">{outputData}</p>
        </div>
      )}
    </div>
  );
}
