import { Label } from "@radix-ui/react-label";
import { Textarea } from "./ui/textarea";

export default function OutputDisplay({ targetLable }: { targetLable: string }) {
  return (
    <div>
      <Label htmlFor={targetLable}>Output</Label>
      <Textarea id="output1" value={targetLable} readOnly className="min-h-[100px] bg-muted italic" disabled />
    </div>
  );
};

