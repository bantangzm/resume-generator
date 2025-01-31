"use client";

import { useState } from "react";
import { ResumeForm } from "@/components/resume/ResumeForm";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import type { ResumeData } from "@/types/resume";
import { ExportPNGButton } from "@/components/resume/ExportPNGButton";

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    basics: {
      avatar: "",
      name: "",
      label: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
    },
    experience: [],
    education: [],
    skills: [],
  });

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold animate-fade-in">简历生成器</h1>
          <div className="flex gap-2">
            <ExportPNGButton />
            {/* <ExportButton /> */}
          </div>
        </div>

        <div className="lg:hidden mb-6">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit">编辑</TabsTrigger>
              <TabsTrigger value="preview">预览</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <Card>
                <CardContent className="pt-6">
                  <ResumeForm data={resumeData} onChange={setResumeData} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="preview">
              <Card>
                <CardContent className="pt-6">
                  <ResumePreview data={resumeData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="hidden lg:grid grid-cols-2 gap-8">
          <Card>
            <CardContent className="pt-6">
              <ResumeForm data={resumeData} onChange={setResumeData} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <ResumePreview data={resumeData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
