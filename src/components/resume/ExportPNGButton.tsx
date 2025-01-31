import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";
import domtoimage from "dom-to-image";

export const ExportPNGButton = () => {
  const exportToPNG = async () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      console.error("未找到预览元素");
      return;
    }

    try {
      const container = document.createElement("div");
      Object.assign(container.style, {
        position: "absolute",
        left: "-9999px",
        width: "210mm",
        padding: "10mm",
        backgroundColor: "white",
      });

      const clone = element.cloneNode(true) as HTMLElement;
      Object.assign(clone.style, {
        width: "100%",
        backgroundColor: "white",
        color: "black",
        fontFamily: "sans-serif",
        margin: "0",
        padding: "10mm",
      });

      container.appendChild(clone);
      document.body.appendChild(container);

      const scale = 3; // Increase the scale for better quality
      const dataUrl = await domtoimage.toPng(clone, {
        quality: 1,
        bgcolor: "white",
        width: (element.offsetWidth + 40) * scale,
        height: (element.offsetHeight + 40) * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        },
      });

      document.body.removeChild(container);

      const link = document.createElement("a");
      link.download = "我的简历.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("导出失败:", error);
    }
  };

  return (
    <Button onClick={exportToPNG} variant="outline" className="gap-2">
      <ImageIcon className="w-4 h-4" />
      导出PNG
    </Button>
  );
};
