import { AssessmentResponse, WISCARScores, AssessmentResults } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const calculateScores = (responses: Record<string, AssessmentResponse>): AssessmentResults => {
  // Calculate psychometric fit score
  const psychometricQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const psychometricResponses = psychometricQuestions.map(q => {
    const value = responses[q.id]?.value;
    return typeof value === 'number' ? value : (typeof value === 'string' ? 3 : 0);
  });
  const psychometricFitScore = calculateCategoryScore(psychometricResponses, psychometricQuestions.length);

  // Calculate technical readiness score
  const technicalQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const technicalScore = calculateTechnicalScore(technicalQuestions, responses);

  // Calculate WISCAR scores
  const wiscarScores = calculateWISCARScores(responses);

  // Calculate overall confidence score
  const overallConfidenceScore = Math.round(
    (psychometricFitScore * 0.3) + 
    (technicalScore * 0.3) + 
    (Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6 * 0.4)
  );

  // Determine recommendation
  const recommendation = getRecommendation(overallConfidenceScore);
  const confidenceLevel = Math.min(95, Math.max(60, overallConfidenceScore + Math.random() * 10 - 5));

  return {
    psychometricFitScore: Math.round(psychometricFitScore),
    technicalReadinessScore: Math.round(technicalScore),
    wiscarScores,
    overallConfidenceScore,
    recommendation,
    confidenceLevel: Math.round(confidenceLevel),
    nextSteps: getNextSteps(recommendation, overallConfidenceScore),
    careerSuggestions: getCareerSuggestions(recommendation),
    alternativePaths: getAlternativePaths(recommendation),
    reportGenerated: new Date().toISOString()
  };
};

const calculateCategoryScore = (responses: number[], questionCount: number): number => {
  if (responses.length === 0) return 0;
  
  const total = responses.reduce((sum: number, response) => {
    return sum + (response / 5 * 100); // Convert 1-5 scale to 0-100
  }, 0);
  
  return total / questionCount;
};

const calculateTechnicalScore = (questions: any[], responses: Record<string, AssessmentResponse>): number => {
  let score = 0;
  let maxScore = 0;

  questions.forEach(q => {
    const response = responses[q.id];
    maxScore += 100;
    
    if (!response) return;

    // Score based on "correct" or optimal answers
    switch (q.id) {
      case 'tech-1':
        score += response.value === 'Reject the report - it violates the 30-day rule' ? 100 : 60;
        break;
      case 'tech-2':
        score += response.value === 'Purpose and scope of the policy' ? 100 : 60;
        break;
      case 'tech-3':
        score += response.value === 'Clarity and enforceability over complexity' ? 100 : 60;
        break;
      case 'tech-4':
        score += response.value === 'Facilitate a meeting to find common ground' ? 100 : 80;
        break;
      default:
        score += 70; // Default score
    }
  });

  return maxScore > 0 ? (score / maxScore) * 100 : 0;
};

const calculateWISCARScores = (responses: Record<string, AssessmentResponse>): WISCARScores => {
  const wiscarCategories = ['Will', 'Interest', 'Skill', 'CognitiveReadiness', 'AbilityToLearn', 'RealWorldAlignment'];
  const scores: WISCARScores = {
    Will: 0,
    Interest: 0,
    Skill: 0,
    CognitiveReadiness: 0,
    AbilityToLearn: 0,
    RealWorldAlignment: 0
  };

  wiscarCategories.forEach(category => {
    const categoryQuestions = assessmentQuestions.filter(
      q => q.category === 'wiscar' && q.subcategory === category
    );
    
    const categoryResponses = categoryQuestions.map(q => {
      const value = responses[q.id]?.value;
      return typeof value === 'number' ? value : (typeof value === 'string' ? 3 : 0);
    });
    scores[category as keyof WISCARScores] = Math.round(calculateCategoryScore(categoryResponses, categoryQuestions.length));
  });

  return scores;
};

const getRecommendation = (score: number): 'Yes' | 'Maybe' | 'No' => {
  if (score >= 80) return 'Yes';
  if (score >= 50) return 'Maybe';
  return 'No';
};

const getNextSteps = (recommendation: string, score: number): string[] => {
  if (recommendation === 'Yes') {
    return [
      'Start with "Introduction to Policy Frameworks" course',
      'Practice drafting sample organizational policies',
      'Join policy development communities and forums',
      'Seek mentorship from experienced policy professionals'
    ];
  } else if (recommendation === 'Maybe') {
    return [
      'Strengthen foundational knowledge in compliance and regulatory frameworks',
      'Improve technical writing skills through practice and feedback',
      'Develop stakeholder communication and mediation skills',
      'Consider policy-adjacent roles to build relevant experience'
    ];
  } else {
    return [
      'Explore foundational courses in business writing and communication',
      'Consider roles in operations or process improvement',
      'Develop analytical and detail-oriented thinking skills',
      'Reassess interest in policy development after gaining more organizational experience'
    ];
  }
};

const getCareerSuggestions = (recommendation: string): string[] => {
  if (recommendation === 'Yes') {
    return [
      'Internal Policy Developer',
      'Compliance Policy Coordinator',
      'HR Policy Specialist',
      'Governance Framework Advisor',
      'Risk & Controls Documentation Analyst'
    ];
  } else if (recommendation === 'Maybe') {
    return [
      'Policy Research Assistant',
      'Compliance Support Specialist',
      'Process Documentation Coordinator',
      'Internal Communications Specialist'
    ];
  } else {
    return [
      'Operations Coordinator',
      'Project Support Specialist',
      'Administrative Analyst',
      'Customer Success Coordinator'
    ];
  }
};

const getAlternativePaths = (recommendation: string): string[] => {
  return [
    'HR Operations Specialist',
    'Corporate Communications Coordinator',
    'Process Improvement Analyst',
    'Organizational Development Assistant',
    'Quality Assurance Coordinator'
  ];
};