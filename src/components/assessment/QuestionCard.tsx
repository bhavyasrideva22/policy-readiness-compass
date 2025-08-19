import React from 'react';
import { Question, AssessmentResponse } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { likertOptions } from '@/data/questions';

interface QuestionCardProps {
  question: Question;
  response?: AssessmentResponse;
  onAnswer: (response: AssessmentResponse) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  response,
  onAnswer
}) => {
  const handleLikertResponse = (value: string) => {
    const numValue = parseInt(value) + 1; // Convert 0-4 to 1-5
    onAnswer({
      questionId: question.id,
      value: numValue
    });
  };

  const handleMultipleChoiceResponse = (value: string) => {
    onAnswer({
      questionId: question.id,
      value: value
    });
  };

  const renderLikertScale = () => (
    <RadioGroup
      value={response?.value ? (response.value as number - 1).toString() : undefined}
      onValueChange={handleLikertResponse}
      className="grid grid-cols-1 gap-3"
    >
      {likertOptions.map((option, index) => (
        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-smooth">
          <RadioGroupItem value={index.toString()} id={`${question.id}-${index}`} />
          <Label 
            htmlFor={`${question.id}-${index}`} 
            className="flex-1 cursor-pointer font-medium"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderMultipleChoice = () => (
    <RadioGroup
      value={response?.value as string || undefined}
      onValueChange={handleMultipleChoiceResponse}
      className="grid grid-cols-1 gap-3"
    >
      {question.options?.map((option, index) => (
        <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-muted/50 transition-smooth">
          <RadioGroupItem value={option} id={`${question.id}-${index}`} />
          <Label 
            htmlFor={`${question.id}-${index}`} 
            className="flex-1 cursor-pointer font-medium leading-relaxed"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderScenario = () => (
    <div className="space-y-4">
      {question.scenarios && (
        <div className="p-4 bg-light-blue rounded-lg border border-primary/20">
          <p className="text-sm text-deep-navy font-medium">{question.scenarios}</p>
        </div>
      )}
      {question.options && renderMultipleChoice()}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-medium">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-foreground leading-relaxed pr-4">
            {question.question}
          </CardTitle>
          {question.required && (
            <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full font-medium shrink-0">
              Required
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {question.type === 'likert' && renderLikertScale()}
        {question.type === 'multiple-choice' && renderMultipleChoice()}
        {question.type === 'scenario' && renderScenario()}
      </CardContent>
    </Card>
  );
};