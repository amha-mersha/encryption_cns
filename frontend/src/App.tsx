import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import ModeSelector from "./components/ModeSelector";
import { useState } from "react";
import EncryptionForm from "./components/EncryptionForm";
import DecryptionForm from "./components/DecryptionFrom";

type EncryptionMethod = "OTP" | "3DES" | "AES";

export default function App() {
  const [method, setMethod] = useState<EncryptionMethod>("OTP")

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Encryption/Decryption App</CardTitle>
        </CardHeader>
        <CardContent>
          <ModeSelector method={method} setMethod={setMethod} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EncryptionForm method={method} />
            <DecryptionForm method={method} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
