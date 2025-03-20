import React from "react";

type AlgorithmSelectorProps = {
  algorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
};

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  algorithm,
  onAlgorithmChange,
}) => {
  return (
    <div>
      <label htmlFor="algorithm">Algorithm: </label>
      <select
        id="algorithm"
        value={algorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
      >
        <option value="OTP">OTP</option>
        <option value="AES">AES</option>
        <option value="3DES">3DES</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
