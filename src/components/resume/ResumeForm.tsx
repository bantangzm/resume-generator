import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { ResumeData } from "@/types/resume";
import { AvatarUpload } from "./AvatarUpload";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeForm = ({ data, onChange }: ResumeFormProps) => {
  const updateBasics = (field: keyof ResumeData["basics"], value: string) => {
    onChange({
      ...data,
      basics: {
        ...data.basics,
        [field]: value,
      },
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          highlights: [""],
        },
      ],
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const addHighlight = (experienceIndex: number) => {
    const newExperience = [...data.experience];
    newExperience[experienceIndex] = {
      ...newExperience[experienceIndex],
      highlights: [...newExperience[experienceIndex].highlights, ""],
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const updateHighlight = (
    experienceIndex: number,
    highlightIndex: number,
    value: string
  ) => {
    const newExperience = [...data.experience];
    newExperience[experienceIndex] = {
      ...newExperience[experienceIndex],
      highlights: newExperience[experienceIndex].highlights.map((h, i) =>
        i === highlightIndex ? value : h
      ),
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const removeExperience = (index: number) => {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== index),
    });
  };

  const removeHighlight = (experienceIndex: number, highlightIndex: number) => {
    const newExperience = [...data.experience];
    newExperience[experienceIndex] = {
      ...newExperience[experienceIndex],
      highlights: newExperience[experienceIndex].highlights.filter(
        (_, i) => i !== highlightIndex
      ),
    };
    onChange({
      ...data,
      experience: newExperience,
    });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          institution: "",
          area: "",
          studyType: "",
          startDate: "",
          endDate: "",
        },
      ],
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    onChange({
      ...data,
      education: newEducation,
    });
  };

  const removeEducation = (index: number) => {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">基本信息</h2>
        <div className="flex flex-col items-center mb-6">
          <AvatarUpload
            value={data.basics.avatar}
            onChange={(value) => updateBasics("avatar", value)}
          />
        </div>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">姓名</Label>
            <Input
              id="name"
              value={data.basics.name}
              onChange={(e) => updateBasics("name", e.target.value)}
              placeholder="输入你的姓名"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="label">职位</Label>
            <Input
              id="label"
              value={data.basics.label}
              onChange={(e) => updateBasics("label", e.target.value)}
              placeholder="期望职位"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              value={data.basics.email}
              onChange={(e) => updateBasics("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">电话</Label>
            <Input
              id="phone"
              value={data.basics.phone}
              onChange={(e) => updateBasics("phone", e.target.value)}
              placeholder="联系电话"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">地址</Label>
            <Input
              id="location"
              value={data.basics.location}
              onChange={(e) => updateBasics("location", e.target.value)}
              placeholder="所在城市"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">工作经验</h2>
          <Button variant="outline" size="sm" onClick={addExperience}>
            <Plus className="w-4 h-4 mr-2" />
            添加经验
          </Button>
        </div>

        <div className="space-y-6">
          {data.experience.map((exp, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeExperience(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>公司名称</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    placeholder="公司名称"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>职位</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(index, "position", e.target.value)
                    }
                    placeholder="职位名称"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>开始时间</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(index, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>结束时间</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>工作内容</Label>
                {exp.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-2">
                    <Input
                      value={highlight}
                      onChange={(e) =>
                        updateHighlight(index, hIndex, e.target.value)
                      }
                      placeholder="添加工作内容..."
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeHighlight(index, hIndex)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => addHighlight(index)}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  添加工作内容
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">教育背景</h2>
          <Button variant="outline" size="sm" onClick={addEducation}>
            <Plus className="w-4 h-4 mr-2" />
            添加教育
          </Button>
        </div>
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border rounded-lg relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onClick={() => removeEducation(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>学校名称</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(index, "institution", e.target.value)
                    }
                    placeholder="学校名称"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>专业方向</Label>
                  <Input
                    value={edu.area}
                    onChange={(e) =>
                      updateEducation(index, "area", e.target.value)
                    }
                    placeholder="专业方向"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>学历</Label>
                  <Input
                    value={edu.studyType}
                    onChange={(e) =>
                      updateEducation(index, "studyType", e.target.value)
                    }
                    placeholder="学历类型"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>开始时间</Label>
                  <Input
                    type="date"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(index, "startDate", e.target.value)
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <Label>结束时间</Label>
                  <Input
                    type="date"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(index, "endDate", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h2 className="text-2xl font-semibold mb-4">个人简介</h2>
        <div className="grid gap-2">
          <Textarea
            id="summary"
            value={data.basics.summary}
            onChange={(e) => updateBasics("summary", e.target.value)}
            placeholder="简单介绍一下自己..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};
