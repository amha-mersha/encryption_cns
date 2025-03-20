export default function GenerateKeyButton({ algorithm, setKey, setKeyLength }) {
  const handleGenerateKey = () => {
    // Call API to generate key
    console.log("Generating key for:", algorithm);
  };

  return (
    <button
      onClick={handleGenerateKey}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
    >
      Generate Key
    </button>
  );
}
