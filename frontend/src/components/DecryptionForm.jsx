import { useState } from "react";
import KeyInput from "./KeyInput";
import GenerateKeyButton from "./GenerateKeyButton";

export default function DecryptionForm({ algorithm, key, setKey, keyLength, setKeyLength }) {
  const [inputData, setInputData] = useState("");
  const [outputData, setOutputData] = useState("");

  const handleDecrypt = () => {
    // Call API to decrypt data
    console.log("Decrypting:", inputData);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Decryption</h2>
      <textarea
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
        placeholder="Enter data to decrypt"
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
        onClick={handleDecrypt}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded mt-4"
      >
        Decrypt
      </button>
      {outputData && (
        <div className="mt-4">
          <h3 className="font-semibold">Decrypted Data:</h3>
          <p className="bg-gray-700 p-2 rounded break-words">{outputData}</p>
        </div>
      )}
    </div>
  );
}
