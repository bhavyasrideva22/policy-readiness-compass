import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Brain, BookOpen, Target } from 'lucide-react';

interface SectionIntroProps {
  title: string;
  description: string;
  sectionKey: string;
  onStart: () => void;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({
  title,
  description,
  sectionKey,
  onStart
}) => {
  const getIcon = () => {
    switch (sectionKey) {
      case 'psychometric':
        return <Brain className="w-8 h-8 text-primary" />;
      case 'technical':
        return <BookOpen className="w-8 h-8 text-primary" />;
      case 'wiscar':
        return <Target className="w-8 h-8 text-primary" />;
      default:
        return <CheckCircle2 className="w-8 h-8 text-primary" />;
    }
  };

  const getSectionDetails = () => {
    switch (sectionKey) {
      case 'psychometric':
        return {
          duration: '5-7 minutes',
          questions: '5 questions',
          focus: 'Personality traits, work preferences, and ethical reasoning'
        };
      case 'technical':
        return {
          duration: '6-8 minutes',
          questions: '4 questions',
          focus: 'Policy knowledge, logical reasoning, and stakeholder management'
        };
      case 'wiscar':
        return {
          duration: '8-10 minutes',
          questions: '9 questions',
          focus: 'Comprehensive readiness across six key dimensions'
        };
      default:
        return {
          duration: '5 minutes',
          questions: 'Various',
          focus: 'General assessment'
        };
    }
  };

  const details = getSectionDetails();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-large">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>
          <CardTitle className="text-2xl font-bold text-foreground mb-2">
            {title}
          </CardTitle>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-light-blue rounded-lg">
              <div className="text-2xl font-bold text-primary">{details.questions}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center p-4 bg-light-blue rounded-lg">
              <div className="text-2xl font-bold text-primary">{details.duration}</div>
              <div className="text-sm text-muted-foreground">Duration</div>
            </div>
            <div className="text-center p-4 bg-light-blue rounded-lg">
              <div className="text-2xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Focus Required</div>
            </div>
          </div>
          
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-foreground mb-2">This section focuses on:</h4>
            <p className="text-muted-foreground">{details.focus}</p>
          </div>

          <div className="text-center pt-4">
            <Button 
              onClick={onStart}
              variant="assessment"
              size="lg"
              className="w-full md:w-auto px-8"
            >
              Start {title}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};