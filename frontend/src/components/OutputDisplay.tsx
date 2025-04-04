import React, { useEffect, useRef } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Clipboard } from "lucide-react";

interface OutputDisplayProps {
  value?: string; // Encrypted data or success message
  error?: string; // Error message
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ value }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px"; // Set to scrollHeight
    }
  }, [value]); // Run every time `value` changes


  return (
    <div>
      <textarea
        id="output"
        value={value || ""}
        readOnly
        ref={textareaRef}
        className="min-h-[50px] bg-muted italic w-full rounded-sm"
        disabled
      />
    </div>
  );
};

export default OutputDisplay;
