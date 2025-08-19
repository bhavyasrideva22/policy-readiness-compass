export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'ranking';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  scenarios?: string;
  required: boolean;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string | string[];
}

export interface WISCARScores {
  Will: number;
  Interest: number;
  Skill: number;
  CognitiveReadiness: number;
  AbilityToLearn: number;
  RealWorldAlignment: number;
}

export interface AssessmentResults {
  psychometricFitScore: number;
  technicalReadinessScore: number;
  wiscarScores: WISCARScores;
  overallConfidenceScore: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  confidenceLevel: number;
  nextSteps: string[];
  careerSuggestions: string[];
  alternativePaths: string[];
  reportGenerated: string;
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  responses: Record<string, AssessmentResponse>;
  isComplete: boolean;
  results?: AssessmentResults;
}