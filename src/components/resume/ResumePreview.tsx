import { forwardRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Building, Calendar } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import Image from "next/image";

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
      });
    };

    return (
      <div ref={ref} id="resume-preview" className="space-y-6">
        <div className="flex items-start gap-6">
          {data.basics.avatar && (
            <div className="w-[120px] aspect-square flex-shrink-0">
              <Image
                src={data.basics.avatar}
                alt="Avatar"
                width={120}
                height={120}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold truncate">
              {data.basics.name || "姓名"}
            </h1>
            <p className="text-xl text-muted-foreground mt-1">
              {data.basics.label || "职位"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {data.basics.email && (
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4" />
              {data.basics.email}
            </div>
          )}
          {data.basics.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" />
              {data.basics.phone}
            </div>
          )}
          {data.basics.location && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              {data.basics.location}
            </div>
          )}
        </div>

        {data.experience.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4">工作经验</h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {exp.company}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.position}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </div>
                    </div>
                    {exp.highlights.length > 0 && (
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {exp.highlights.map((highlight, hIndex) => (
                          <li key={hIndex}>{highlight}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {data.education.length > 0 && (
          <>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4">教育背景</h2>
              <div className="space-y-6">
                {data.education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {edu.institution}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.studyType} · {edu.area}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {data.basics.summary && (
          <>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-4">个人简介</h2>
              <p className="text-sm">{data.basics.summary}</p>
            </div>
          </>
        )}
      </div>
    );
  }
);

// 添加显示名称，这是 React 开发模式的最佳实践
ResumePreview.displayName = "ResumePreview";
