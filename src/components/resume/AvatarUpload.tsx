import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";

interface AvatarUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const AvatarUpload = ({ value, onChange }: AvatarUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("图片大小不能超过 10MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-muted">
          {value ? (
            <Image
              src={value}
              alt="Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <Camera className="w-8 h-8" />
            </div>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => inputRef.current?.click()}
        >
          更换头像
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
