export interface ResumeData {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    avatar: string;
  };
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{
    name: string;
    level: string;
  }>;
} 