import React from "react";

interface OutputDisplayProps {
  value?: string; // Encrypted data or success message
  error?: string; // Error message
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ value }) => {
  return (
    <div>
      <textarea
        id="output"
        value={value || ""}
        readOnly
        className="min-h-[50px] bg-muted italic w-full rounded-sm"
        disabled
      />
    </div>
  );
};

export default OutputDisplay;
