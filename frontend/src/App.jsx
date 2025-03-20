import { useState } from "react";
import AlgorithmSelector from "./components/AlgorithmSelector";
import EncryptionForm from "./components/EncryptionForm";
import DecryptionForm from "./components/DecryptionForm";

function App() {
  const [algorithm, setAlgorithm] = useState("OTP"); // Default algorithm
  const [key, setKey] = useState("");
  const [keyLength, setKeyLength] = useState(128); // Default key length for AES

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Encryption/Decryption App</h1>
      <AlgorithmSelector algorithm={algorithm} setAlgorithm={setAlgorithm} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <EncryptionForm
          algorithm={algorithm}
          key={key}
          setKey={setKey}
          keyLength={keyLength}
          setKeyLength={setKeyLength}
        />
        <DecryptionForm
          algorithm={algorithm}
          key={key}
          setKey={setKey}
          keyLength={keyLength}
          setKeyLength={setKeyLength}
        />
      </div>
    </div>
  );
}

export default App;
