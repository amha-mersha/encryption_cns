import React from "react";

type KeyInputProps = {
  keyValue: string;
  onKeyChange: (key: string) => void;
  placeholder?: string;
};

const KeyInput: React.FC<KeyInputProps> = ({
  keyValue,
  onKeyChange,
  placeholder = "Enter key",
}) => {
  return (
    <div>
      <label htmlFor="key">Key: </label>
      <input
        id="key"
        type="text"
        value={keyValue}
        onChange={(e) => onKeyChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default KeyInput;
