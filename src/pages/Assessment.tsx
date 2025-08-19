import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentState, AssessmentResponse } from '@/types/assessment';
import { assessmentQuestions, sectionTitles, sectionDescriptions } from '@/data/questions';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { SectionIntro } from '@/components/assessment/SectionIntro';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { calculateScores } from '@/utils/scoring';

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AssessmentState>({
    currentSection: 1,
    currentQuestion: 0,
    responses: {},
    isComplete: false
  });

  const [showSectionIntro, setShowSectionIntro] = useState(true);

  // Group questions by section
  const sections = {
    psychometric: assessmentQuestions.filter(q => q.category === 'psychometric'),
    technical: assessmentQuestions.filter(q => q.category === 'technical'),
    wiscar: assessmentQuestions.filter(q => q.category === 'wiscar')
  };

  const sectionKeys = Object.keys(sections) as Array<keyof typeof sections>;
  const currentSectionKey = sectionKeys[state.currentSection - 1];
  const currentSectionQuestions = sections[currentSectionKey];
  const currentQuestion = currentSectionQuestions[state.currentQuestion];

  const handleAnswer = (response: AssessmentResponse) => {
    setState(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [response.questionId]: response
      }
    }));
  };

  const handleNext = () => {
    if (state.currentQuestion < currentSectionQuestions.length - 1) {
      // Next question in current section
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else if (state.currentSection < sectionKeys.length) {
      // Move to next section
      setState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
      setShowSectionIntro(true);
    } else {
      // Assessment complete
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (state.currentSection > 1) {
      const prevSectionKey = sectionKeys[state.currentSection - 2];
      const prevSectionQuestions = sections[prevSectionKey];
      setState(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSectionQuestions.length - 1
      }));
      setShowSectionIntro(false);
    }
  };

  const completeAssessment = () => {
    const results = calculateScores(state.responses);
    setState(prev => ({
      ...prev,
      isComplete: true,
      results
    }));
    
    // Store results in localStorage for the results page
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    navigate('/results');
  };

  const currentResponse = state.responses[currentQuestion?.id];
  const canProceed = currentResponse !== undefined;

  if (showSectionIntro && !state.isComplete) {
    return (
      <SectionIntro
        title={sectionTitles[currentSectionKey]}
        description={sectionDescriptions[currentSectionKey]}
        sectionKey={currentSectionKey}
        onStart={() => setShowSectionIntro(false)}
      />
    );
  }

  if (state.isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Assessment Complete!</h1>
          <p className="text-muted-foreground mb-6">Calculating your results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-4 py-8">
        <ProgressBar
          currentQuestion={state.currentQuestion + 1}
          totalQuestions={currentSectionQuestions.length}
          currentSection={state.currentSection}
          totalSections={sectionKeys.length}
          sectionName={sectionTitles[currentSectionKey]}
        />

        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            response={currentResponse}
            onAnswer={handleAnswer}
          />
        </div>

        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={state.currentSection === 1 && state.currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {state.currentQuestion + 1} of {currentSectionQuestions.length}
            </span>
          </div>

          <Button
            variant="assessment"
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {state.currentQuestion === currentSectionQuestions.length - 1 && 
             state.currentSection === sectionKeys.length ? 'Complete Assessment' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;