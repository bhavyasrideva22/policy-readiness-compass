import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  currentSection: number;
  totalSections: number;
  sectionName: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentQuestion,
  totalQuestions,
  currentSection,
  totalSections,
  sectionName
}) => {
  const overallProgress = ((currentSection - 1) / totalSections + (currentQuestion / totalQuestions) / totalSections) * 100;
  const sectionProgress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full space-y-4 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            Section {currentSection} of {totalSections}: {sectionName}
          </h3>
          <p className="text-xs text-muted-foreground">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-primary">
            {Math.round(overallProgress)}% Complete
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Overall Progress</span>
          <span className="text-xs text-muted-foreground">{Math.round(overallProgress)}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Current Section</span>
          <span className="text-xs text-muted-foreground">{Math.round(sectionProgress)}%</span>
        </div>
        <Progress value={sectionProgress} className="h-1" />
      </div>
    </div>
  );
};