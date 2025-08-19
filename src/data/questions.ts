import { Question } from "@/types/assessment";

export const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: "psych-1",
    type: "likert",
    category: "psychometric",
    subcategory: "conscientiousness",
    question: "I prefer to follow structured processes and detailed procedures in my work.",
    required: true
  },
  {
    id: "psych-2",
    type: "likert",
    category: "psychometric",
    subcategory: "attention-to-detail",
    question: "I naturally notice inconsistencies and errors in documents or processes.",
    required: true
  },
  {
    id: "psych-3",
    type: "scenario",
    category: "psychometric",
    subcategory: "ethical-reasoning",
    question: "You discover a policy loophole that could be exploited by employees for personal gain. What do you do?",
    scenarios: "You must choose between: A) Quietly document it for future reference, B) Immediately escalate to management, C) Draft a policy amendment and propose it through proper channels, D) Discuss with colleagues to gauge severity",
    options: ["Document quietly", "Escalate immediately", "Draft amendment", "Discuss with colleagues"],
    required: true
  },
  {
    id: "psych-4",
    type: "likert",
    category: "psychometric",
    subcategory: "communication",
    question: "I can explain complex rules and regulations in simple, understandable terms.",
    required: true
  },
  {
    id: "psych-5",
    type: "multiple-choice",
    category: "psychometric",
    subcategory: "motivation",
    question: "What motivates you most in a work environment?",
    options: [
      "Creating order and clarity from chaos",
      "Building relationships and consensus",
      "Solving complex analytical problems",
      "Leading teams and driving change"
    ],
    required: true
  },

  // Technical & Aptitude Section
  {
    id: "tech-1",
    type: "multiple-choice",
    category: "technical",
    subcategory: "logical-reasoning",
    question: "A policy states: 'Employees must submit expense reports within 30 days of incurring the expense, unless traveling internationally, in which case they have 45 days.' An employee submits a domestic expense report 35 days after the expense. What should happen?",
    options: [
      "Approve the report - it's close enough",
      "Reject the report - it violates the 30-day rule",
      "Request justification for the delay",
      "Escalate to the employee's manager"
    ],
    required: true
  },
  {
    id: "tech-2",
    type: "scenario",
    category: "technical",
    subcategory: "policy-writing",
    question: "You need to write a policy about remote work arrangements. Which element should come FIRST in your policy structure?",
    scenarios: "Consider the logical flow of policy development and user comprehension.",
    options: [
      "Detailed procedures for requesting remote work",
      "Purpose and scope of the policy",
      "Consequences for policy violations",
      "Technology requirements for remote work"
    ],
    required: true
  },
  {
    id: "tech-3",
    type: "multiple-choice",
    category: "technical",
    subcategory: "compliance-knowledge",
    question: "Which principle is most important when drafting internal policies?",
    options: [
      "Comprehensive coverage of every possible scenario",
      "Clarity and enforceability over complexity",
      "Alignment with industry best practices only",
      "Flexibility to allow for individual interpretation"
    ],
    required: true
  },
  {
    id: "tech-4",
    type: "scenario",
    category: "technical",
    subcategory: "stakeholder-management",
    question: "Two departments want conflicting policy requirements. HR wants strict attendance tracking, while Engineering wants flexible hours. How do you proceed?",
    scenarios: "You need to balance competing stakeholder needs while maintaining policy integrity.",
    options: [
      "Side with HR since they handle compliance",
      "Create separate policies for each department",
      "Facilitate a meeting to find common ground",
      "Escalate the decision to senior leadership"
    ],
    required: true
  },

  // WISCAR Framework Section
  {
    id: "wiscar-will-1",
    type: "likert",
    category: "wiscar",
    subcategory: "Will",
    question: "I persist through tedious tasks like reviewing lengthy documents for accuracy.",
    required: true
  },
  {
    id: "wiscar-will-2",
    type: "likert",
    category: "wiscar",
    subcategory: "Will",
    question: "I can maintain focus during long policy review sessions.",
    required: true
  },
  {
    id: "wiscar-interest-1",
    type: "likert",
    category: "wiscar",
    subcategory: "Interest",
    question: "I find organizational governance and compliance genuinely interesting.",
    required: true
  },
  {
    id: "wiscar-interest-2",
    type: "likert",
    category: "wiscar",
    subcategory: "Interest",
    question: "I enjoy reading about regulatory frameworks and legal structures.",
    required: true
  },
  {
    id: "wiscar-skill-1",
    type: "likert",
    category: "wiscar",
    subcategory: "Skill",
    question: "I can write clear, concise explanations of complex procedures.",
    required: true
  },
  {
    id: "wiscar-skill-2",
    type: "scenario",
    category: "wiscar",
    subcategory: "Skill",
    question: "Rate your confidence in mediating between departments with conflicting policy needs.",
    scenarios: "Consider your ability to facilitate compromise and find solutions.",
    options: ["Very Low", "Low", "Moderate", "High", "Very High"],
    required: true
  },
  {
    id: "wiscar-cognitive-1",
    type: "multiple-choice",
    category: "wiscar",
    subcategory: "CognitiveReadiness",
    question: "When reviewing a complex policy framework, what's your natural approach?",
    options: [
      "Break it down into logical components and analyze systematically",
      "Look for patterns and connections across different sections",
      "Focus on practical implementation challenges",
      "Consider stakeholder impact and communication needs"
    ],
    required: true
  },
  {
    id: "wiscar-learn-1",
    type: "likert",
    category: "wiscar",
    subcategory: "AbilityToLearn",
    question: "I actively seek feedback on my written work and incorporate suggestions.",
    required: true
  },
  {
    id: "wiscar-learn-2",
    type: "likert",
    category: "wiscar",
    subcategory: "AbilityToLearn",
    question: "I adapt my communication style based on the audience (executives vs. frontline staff).",
    required: true
  },
  {
    id: "wiscar-real-1",
    type: "scenario",
    category: "wiscar",
    subcategory: "RealWorldAlignment",
    question: "How comfortable are you with the typical policy development cycle of: draft → review → revise → approve → communicate → monitor → update?",
    scenarios: "This cycle can take months and involves multiple stakeholders.",
    options: ["Very uncomfortable", "Somewhat uncomfortable", "Neutral", "Somewhat comfortable", "Very comfortable"],
    required: true
  },
  {
    id: "wiscar-real-2",
    type: "likert",
    category: "wiscar",
    subcategory: "RealWorldAlignment",
    question: "I'm comfortable working within hierarchical organizational structures.",
    required: true
  }
];

export const likertOptions = [
  "Strongly Disagree",
  "Disagree", 
  "Neutral",
  "Agree",
  "Strongly Agree"
];

export const sectionTitles = {
  psychometric: "Personality & Work Style Assessment",
  technical: "Technical Knowledge & Aptitude",
  wiscar: "WISCAR Framework Analysis"
};

export const sectionDescriptions = {
  psychometric: "Understanding your personality traits and work preferences that align with policy development roles.",
  technical: "Evaluating your knowledge of policy frameworks, compliance, and technical writing abilities.",
  wiscar: "Comprehensive analysis across six key dimensions: Will, Interest, Skill, Cognitive Readiness, Ability to Learn, and Real-World Alignment."
};