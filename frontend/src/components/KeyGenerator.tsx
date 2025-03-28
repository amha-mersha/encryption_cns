import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { generateKey } from "@/utils/api";
import OutputDisplay from "./OutputDisplay";

export default function KeyGenerator({ lengthOTP }: { lengthOTP: number }) {
  const [keyType, setKeyType] = useState<string>(""); // Selected key type
  const [output, setOutput] = useState<string>(""); // Generated key or error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  const handleKeyGenerate = async () => {
    if (!keyType) return; // Ensure a key type is selected

    setIsLoading(true);
    try {
      let length: number;

      // Calculate length based on the selected algorithm
      switch (keyType) {
        case "OTP":
          length = lengthOTP;
          break;
        case "3DES":
          length = 192; // Example: 3DES keys are 24 bytes
          break;
        case "AES-128":
          length = 128; // AES-128 uses 16-byte keys
          break;
        case "AES-192":
          length = 192; // AES-192 uses 24-byte keys
          break;
        case "AES-256":
          length = 256; // AES-256 uses 32-byte keys
          break;
        default:
          throw new Error("Invalid algorithm selected");
      }

      const key = await generateKey(keyType, length);
      setOutput(key);
    } catch (err) {
      setOutput(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 gap-2">
          <p className="font-bold">Key Type</p>
          <Select value={keyType} onValueChange={setKeyType}>
            <SelectTrigger id="keyType" className="w-full">
              <SelectValue placeholder="Select key type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="OTP">OTP</SelectItem>
              <SelectItem value="3DES">3DES</SelectItem>
              <SelectItem value="AES-128">AES-128</SelectItem>
              <SelectItem value="AES-192">AES-192</SelectItem>
              <SelectItem value="AES-256">AES-256</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleKeyGenerate}
          disabled={!keyType || isLoading} // Disable if no key type is selected or while loading
          className="mt-6"
        >
          {isLoading ? "Generating..." : "Get Key"}
        </Button>
      </div>

      <OutputDisplay value={output} />
    </div>
  );
}
