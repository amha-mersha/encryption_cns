import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ModeSelector from "./ModeSelector";
import { aesDecrypt, otpDecrypt, rsaDecrypt, tripleDesDecrypt } from "@/utils/api";
import KeyGenerator from "./KeyGenerator";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

type DecryptionMethod = "OTP" | "3DES" | "AES192" | "AES256" | "AES128" | "RSA";
export default function DecryptionForm({ updateOutput }: { updateOutput: Dispatch<SetStateAction<string>> }) {
  const [algorithm, setAlgorithm] = useState<DecryptionMethod>("OTP");
  const [data, setData] = useState<string>("");
  const [key, setKey] = useState<string>("")
  const [iv, setIv] = useState<string>("")
  const isKeyValid = () => {
    if (algorithm === "OTP") {
      try {
        const decodedData = atob(data);
        return key.length === decodedData.length;
      } catch (error) {
        return false
      }
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

  const handleDecrypt = async () => {
    try {
      switch (algorithm) {
        case "OTP":
          const otpResult = await otpDecrypt(data, key);
          updateOutput(otpResult);
          break;
        case "3DES":
          const tripleDesResult = await tripleDesDecrypt(data, key, iv);
          updateOutput(tripleDesResult);
          break;
        case "AES192":
          const aes192Result = await aesDecrypt(data, key, iv, 'aes-192-cbc');
          updateOutput(aes192Result);
          break;
        case "AES128":
          const aes128Result = await aesDecrypt(data, key, iv, 'aes-128-cbc');
          updateOutput(aes128Result);
          break;
        case "AES256":
          const aes256Result = await aesDecrypt(data, key, iv, 'aes-256-cbc');
          updateOutput(aes256Result);
          break;
        case "RSA":
          const rsaResult = await rsaDecrypt(data);
          updateOutput(rsaResult)
          break;
        default:
          break;
      }
    } catch (err) {
      updateOutput(err instanceof Error ? err.message : "An error occured at `handleDecrypt`")
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="encrypt" className="font-bold">Decrypt Data</Label>
        <ModeSelector method={algorithm} setMethod={setAlgorithm} />
        <Textarea
          id="encrypt"
          placeholder="Enter data to encrypt"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="min-h-[60px] italic"
        />
        <Button onClick={handleDecrypt} className="flex-1 font-bold active:bg-zinc-900" >
          Decrypt
        </Button>
      </div>

      <div className="flex w-full items-end gap-4">
        {
          ["AES128", "AES192", "AES256", "3DES", "OTP"].includes(algorithm) && (
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
          )}
        {
          ["AES128", "AES192", "AES256", "3DES"].includes(algorithm) && (
            <div className="flex-1 space-y-2">
              <Label
                htmlFor="key2"
                className="font-bold"
              >
                IV
              </Label>
              <Input
                id="key2"
                placeholder="Enter iv"
                value={iv}
                onChange={(e) => setIv(e.target.value)}
                className="italic"
              />
            </div>
          )
        }
      </div>
      {
        ["AES128", "AES192", "AES256", "3DES", "OTP"].includes(algorithm) && (
          <KeyGenerator lengthOTP={data.length} />)
      }
    </div >
  )
}
