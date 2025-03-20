export default function KeyInput({ algorithm, key, setKey, keyLength, setKeyLength, inputData }) {
  const isValidKey = () => {
    if (algorithm === "OTP") {
      return key.length === inputData.length;
    } else if (algorithm === "AES") {
      return [16, 24, 32].includes(key.length);
    } else if (algorithm === "3DES") {
      return key.length === 24;
    }
    return false;
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Enter key"
        className={`w-full p-2 rounded ${isValidKey() ? "bg-green-700" : "bg-red-700"
          } text-white`}
      />
      {algorithm === "AES" && (
        <select
          value={keyLength}
          onChange={(e) => setKeyLength(Number(e.target.value))}
          className="w-full bg-gray-700 text-white p-2 rounded mt-2"
        >
          <option value={128}>128 bits</option>
          <option value={192}>192 bits</option>
          <option value={256}>256 bits</option>
        </select>
      )}
    </div>
  );
}
