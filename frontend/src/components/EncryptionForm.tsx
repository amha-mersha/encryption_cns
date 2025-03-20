import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import OutputDisplay from "./OutputDisplay";

export default function EncryptionForm({ method }: { method: string }) {
  const [inputText, setInputText] = useState("")
  const [key, setKey] = useState("")
  const [output1, setOutput1] = useState("")
  const isKeyValid = () => {
    if (method === "OTP") {
      return key.length === inputText.length;
    } else if (method === "3DES") {
      return key.length === 24;
    } else if (method === "AES") {
      const requiredLength = parseInt(aesMode, 10) / 8;
      return key.length === requiredLength;
    }
    return false;
  };
  const [aesMode, setAesMode] = useState("Key length");
  const handleEncrypt1 = () => {
    setOutput1(`Encrypted with ${method}${method === "AES" ? `-${aesMode}` : ""}: ${inputText}`)
  }
  return (
    <div className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="encrypt" className="font-bold">Encrypt Data</Label>
        <Textarea
          id="encrypt"
          placeholder="Enter data to encrypt"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[100px] italic"
        />
        <Button onClick={handleEncrypt1} className="flex-1 font-bold active:bg-zinc-900" disabled={!isKeyValid()}>
          Encrypt
        </Button>
      </div>

      <div className="flex w-full items-end gap-4">
        <div className="flex-1 space-y-2">
          <Label htmlFor="key1" className={cn(!isKeyValid() ? "text-destructive font-bold" : "font-bold")}>
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

        {method === "AES" && (
          <div className="w-fit">
            <Select value={aesMode} onValueChange={setAesMode}>
              <SelectTrigger>
                <SelectValue placeholder="Key length" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="128">128 bits</SelectItem>
                <SelectItem value="192">192 bits</SelectItem>
                <SelectItem value="256">256 bits</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <OutputDisplay targetLable={output1} />
    </div>
  )
}
