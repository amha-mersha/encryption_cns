import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import EncryptionForm from "./components/EncryptionForm";
import DecryptionForm from "./components/DecryptionFrom";
import OutputDisplay from "./components/OutputDisplay";
import { useState } from "react";


export default function App() {
  const [outputVal, setOutputVal] = useState("")

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Encryption/Decryption App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EncryptionForm updateOutput={setOutputVal} />
            <DecryptionForm updateOutput={setOutputVal} />
          </div>
          <p className="font-bold text-xl mt-4">Output</p>
          <OutputDisplay value={outputVal} />
        </CardContent>
      </Card>
    </div>
  );
};
