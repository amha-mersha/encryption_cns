import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Button } from "./ui/button";
import OutputDisplay from "./OutputDisplay";

export default function DecryptionForm({ method }: { method: string }) {
  const [inputText, setInputText] = useState("")
  const [key2, setKey2] = useState("")
  const [output1, setOutput1] = useState("")
  const isOtpKeyValid1 = method !== "OTP" || key2.length >= inputText.length
  const [aesMode, setAesMode] = useState("CBC")
  const handleDecrypt = () => {
    setOutput1(`Decrypted with ${method}${method === "AES" ? `-${aesMode}` : ""}: ${inputText}`)
  }
  return (
    <div className="space-y-4">
      <div className="grid w-full gap-2">
        <Label htmlFor="input1" className="font-bold">Decrypt Data</Label>
        <Textarea
          id="input2"
          placeholder="Enter data to decrypt"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-[100px]"
        />
        <Button onClick={handleDecrypt} className="flex-1" disabled={method === "OTP" && !isOtpKeyValid1}>
          Decrypt
        </Button>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Label htmlFor="key2" className={cn(method === "OTP" && !isOtpKeyValid1 ? "text-destructive" : "")}>
            Key {method === "OTP" && !isOtpKeyValid1 && "(must match input length)"}
          </Label>
          <Input
            id="key2"
            placeholder="Enter key"
            value={key2}
            onChange={(e) => setKey2(e.target.value)}
            className={cn(method === "OTP" && !isOtpKeyValid1 ? "border-destructive" : "")}
          />
        </div>

        {method === "AES" && (
          <div className="w-1/3">
            <Label htmlFor="aesMode1" className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">Mode</Label>
            <Select value={aesMode} onValueChange={setAesMode}>
              <SelectTrigger id="aesMode1">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CBC">CBC</SelectItem>
                <SelectItem value="ECB">ECB</SelectItem>
                <SelectItem value="CTR">CTR</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <OutputDisplay targetLable={output1} />
    </div>
  )
}
