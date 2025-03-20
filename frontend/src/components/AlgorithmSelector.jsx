export default function AlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div className="flex justify-center">
      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
        className="bg-gray-700 text-white p-2 rounded"
      >
        <option value="OTP">OTP</option>
        <option value="AES">AES</option>
        <option value="3DES">3DES</option>
      </select>
    </div>
  );
}
