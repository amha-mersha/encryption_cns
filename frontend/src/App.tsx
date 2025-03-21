import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import ModeSelector from "./components/ModeSelector";
import EncryptionForm from "./components/EncryptionForm";
import DecryptionForm from "./components/DecryptionFrom";


export default function App() {

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Encryption/Decryption App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EncryptionForm />
            <DecryptionForm />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
