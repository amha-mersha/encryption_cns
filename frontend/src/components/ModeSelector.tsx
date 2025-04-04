import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

type EncryptionAlgorithm = "OTP" | "3DES" | "AES192" | "AES256" | "AES128" | "RSA";
type ModeSelectorProps = {
  method: EncryptionAlgorithm;
  setMethod: Dispatch<SetStateAction<EncryptionAlgorithm>>;
};

export default function ModeSelector({ method, setMethod }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap justify-start gap-4 mb-6">
      {(["OTP", "3DES", "AES128", "AES192", "AES256", "RSA"] as const).map((m) => (
        <Button
          key={m}
          variant={method === m ? "default" : "outline"}
          onClick={() => setMethod(m)}
          className="min-w-[80px] px-4 py-2"
        >
          {m}
        </Button>
      ))}
    </div>
  );
};
