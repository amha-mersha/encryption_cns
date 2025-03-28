import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ModeSelector from "./ModeSelector";
import { aesDecrypt, otpDecrypt, tripleDesDecrypt } from "@/utils/api";
import KeyGenerator from "./KeyGenerator";
import { Dispatch, SetStateAction } from "react";

type DecryptionMethod = "OTP" | "3DES" | "AES192" | "AES256" | "AES128";
export default function DecryptionForm({ updateOutput }: { updateOutput: Dispatch<SetStateAction<string>> }) {
  const [algorithm, setAlgorithm] = useState<DecryptionMethod>("OTP");
  const [data, setData] = useState<string>("");
  const [key, setKey] = useState("")
  const [iv, setIv] = useState("")
  //const isKeyValid = () => {
  //  if (algorithm === "OTP") {
  //    return key.length === data.length;
  //  } else if (algorithm === "3DES") {
  //    return key.length === 24;
  //  } else if (algorithm === "AES192") {
  //    return key.length === 24;
  //  } else if (algorithm === "AES128") {
  //    return key.length === 16;
  //  } else if (algorithm === "AES256") {
  //    return key.length === 32;
  //  }
  //  return false;
  //  // comment 
  //  if (algorithm === "OTP") {
  //    return key.length === data.length;
  //  } else if (algorithm === "3DES") {
  //    return key.length === 24;
  //  } else if (algorithm === "AES") {
  //    const requiredLength = parseInt(aesMode, 10) / 8;
  //    return key.length === requiredLength;
  //  }
  //  return false;
  //};
  //const [aesMode, setAesMode] = useState<string>("");

  const handleDecrypt = async () => {
    try {
      switch (algorithm) {
        case "OTP":
          const otpResult = await otpDecrypt(data, key);
          updateOutput(otpResult);
          break;
        case "3DES":
          const tripleDesResult = await tripleDesDecrypt(data, key, iv);
          updateOutput(JSON.stringify(tripleDesResult));
          break;
        case "AES192":
          const aes192Result = await aesDecrypt(data, key, iv);
          updateOutput(JSON.stringify(aes192Result));
          break;
        case "AES128":
          const aes128Result = await aesDecrypt(data, key, iv);
          updateOutput(JSON.stringify(aes128Result));
          break;
        case "AES256":
          const aes256Result = await aesDecrypt(data, key, iv);
          updateOutput(JSON.stringify(aes256Result));
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
        <div className="flex-1 space-y-2">
          <Label
            htmlFor="key1"
          //className={cn(!isKeyValid() ? "text-destructive font-bold" : "font-bold")}
          >
            Key {/*!isKeyValid() && "(must be valid length)"*/}
          </Label>
          <Input
            id="key1"
            placeholder="Enter key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          //className={cn(!isKeyValid() ? "border-destructive italic" : "italic")}
          />
        </div>

        {/* algorithm === "AES" && (
          <div className="w-[120px]">
            <Select value={aesMode} onValueChange={setAesMode}>
              <SelectTrigger className="w-full border border-gray-300 bg-white rounded-md px-3 py-2">
                <SelectValue placeholder="Key length" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg">
                <SelectItem value="128">128 bits</SelectItem>
                <SelectItem value="192">192 bits</SelectItem>
                <SelectItem value="256">256 bits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) */}
      </div>
      {
        ["AES128", "AES192", "AES256", "3DES"].includes(algorithm) && (
          <div className="flex w-full items-end gap-4">
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
                value={key}
                onChange={(e) => setIv(e.target.value)}
                className="italic"
              />
            </div>
          </div>
        )
      }
      <KeyGenerator lengthOTP={data.length} />
    </div >
  )
}
