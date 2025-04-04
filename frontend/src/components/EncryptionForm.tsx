import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ModeSelector from "./ModeSelector";
import KeyGenerator from "./KeyGenerator";
import { Dispatch, SetStateAction } from "react";
import { aesEncrypt, otpEncrypt, rsaEncrypt, tripleDesEncrypt } from "@/utils/api";

type EncryptionAlgorithm = "OTP" | "3DES" | "AES192" | "AES256" | "AES128" | "RSA";
export default function EncryptionForm({ updateOutput }: { updateOutput: Dispatch<SetStateAction<string>> }) {
  const [algorithm, setAlgorithm] = useState<EncryptionAlgorithm>("OTP");
  const [data, setData] = useState<string>("");
  const [key, setKey] = useState("")
  const isKeyValid = () => {
    if (algorithm === "OTP") {
      return key.length === data.length;
    } else if (algorithm === "3DES") {
      return key.length === 24;
    } else if (algorithm === "AES192") {
      return key.length === 24;
    } else if (algorithm === "AES128") {
      return key.length === 16;
    } else if (algorithm === "AES256") {
      return key.length === 32;
    } else if (algorithm === "RSA") {
      return true
    }
    return false;
  };

  const handleEncrypt = async () => {
    try {
      switch (algorithm) {
        case "OTP":
          const otpResult = await otpEncrypt(data, key);
          updateOutput(otpResult);
          break;
        case "3DES":
          const tripleDesResult = await tripleDesEncrypt(data, key);
          updateOutput(
            tripleDesResult ?
              Object.entries(tripleDesResult)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n") : "No data available"
          );
          break;
        case "AES192":
          const aes192Result = await aesEncrypt(data, key, 'aes-192-cbc');
          updateOutput(
            aes192Result ?
              Object.entries(aes192Result)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n") : "No data available"
          );
          break;
        case "AES128":
          const aes128Result = await aesEncrypt(data, key, 'aes-128-cbc');
          updateOutput(
            aes128Result ?
              Object.entries(aes128Result)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n") : "No data available"
          );
          break;
        case "AES256":
          const aes256Result = await aesEncrypt(data, key, 'aes-256-cbc');
          updateOutput(
            aes256Result ?
              Object.entries(aes256Result)
                .map(([key, value]) => `${key}: ${value}`)
                .join("\n") : "No data available"
          );
          break;
        case "RSA":
          const rsaResult = await rsaEncrypt(data);
          updateOutput(
            rsaResult
          )
          break;
        default:
          break;
      }
    } catch (err) {
      updateOutput(err instanceof Error ? err.message : "An error occured at `handleEncrypt`")
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="encrypt" className="font-bold">Encrypt Data</Label>
        <ModeSelector method={algorithm} setMethod={setAlgorithm} />
        <Textarea
          id="encrypt"
          placeholder="Enter data to encrypt"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="min-h-[60px] italic"
        />
        <Button onClick={handleEncrypt} className="flex-1 font-bold active:bg-zinc-900" disabled={!isKeyValid()}>
          Encrypt
        </Button>
      </div>

      <div className="flex w-full items-end gap-4">
        <div className="flex-1 space-y-2">
          <Label
            htmlFor="key1"
            className={cn(!isKeyValid() ? "text-destructive font-bold" : "font-bold")}
          >
            Key {!isKeyValid() && "(must be valid length)"}
          </Label>
          <Input
            id="key1"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className={cn(!isKeyValid() ? "border-destructive italic" : "italic")}
          />
        </div>
      </div>
      <KeyGenerator lengthOTP={data.length} />
    </div>
  )
}
