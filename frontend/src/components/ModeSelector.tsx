import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type EncryptionMethod = "OTP" | "3DES" | "AES";
type ModeSelectorProps = {
  method: EncryptionMethod;
  setMethod: Dispatch<SetStateAction<EncryptionMethod>>;
};

export default function ModeSelector({ method, setMethod }: ModeSelectorProps) {
  return (
    <div className="flex justify-center space-x-4 mb-6">
      {(["OTP", "3DES", "AES"] as const).map((m) => (
        <Button
          key={m}
          variant={method === m ? "default" : "outline"}
          onClick={() => setMethod(m)}
          className="w-24"
        >
          {m}
        </Button>
      ))}
    </div>
  );
};

