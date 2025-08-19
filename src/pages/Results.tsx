import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentResults } from '@/types/assessment';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadarChart } from '@/components/assessment/RadarChart';
import { CheckCircle2, AlertCircle, XCircle, Download, ArrowLeft, Target, Lightbulb, TrendingUp } from 'lucide-react';

const Results: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    const storedResults = localStorage.getItem('assessmentResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Loading Results...</h2>
        </div>
      </div>
    );
  }

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'Yes':
        return <CheckCircle2 className="w-8 h-8 text-success-green" />;
      case 'Maybe':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'No':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'text-success-green';
      case 'Maybe':
        return 'text-yellow-600';
      case 'No':
        return 'text-destructive';
    }
  };

  const getRecommendationMessage = () => {
    switch (results.recommendation) {
      case 'Yes':
        return 'You show strong alignment for an Internal Policy Developer role!';
      case 'Maybe':
        return 'You have potential, but some areas need development.';
      case 'No':
        return 'Consider alternative career paths that better match your strengths.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto p-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Policy Readiness Assessment Results
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your responses across psychometric, technical, and WISCAR framework dimensions.
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 shadow-large">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {getRecommendationIcon()}
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${getRecommendationColor()}`}>
                {results.recommendation}
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                {getRecommendationMessage()}
              </p>
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{results.overallConfidenceScore}%</div>
                  <div className="text-sm text-muted-foreground">Overall Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{results.confidenceLevel}%</div>
                  <div className="text-sm text-muted-foreground">Confidence Level</div>
                </div>
              </div>
              <Progress value={results.overallConfidenceScore} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className="font-bold text-primary">{results.psychometricFitScore}%</span>
                </div>
                <Progress value={results.psychometricFitScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className="font-bold text-primary">{results.technicalReadinessScore}%</span>
                </div>
                <Progress value={results.technicalReadinessScore} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">WISCAR Average</span>
                  <span className="font-bold text-primary">
                    {Math.round(Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}%
                  </span>
                </div>
                <Progress 
                  value={Object.values(results.wiscarScores).reduce((sum, score) => sum + score, 0) / 6} 
                  className="h-2" 
                />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Radar Chart */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                WISCAR Framework Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart scores={results.wiscarScores} />
            </CardContent>
          </Card>
        </div>

        {/* Career Guidance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Next Steps */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Career Suggestions */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Career Path Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Primary Recommendations:</h4>
                  <ul className="space-y-2">
                    {results.careerSuggestions.map((career, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success-green shrink-0" />
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Alternative Paths:</h4>
                  <ul className="space-y-2">
                    {results.alternativePaths.map((path, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-4 h-4 rounded-full border-2 border-muted shrink-0" />
                        {path}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Take Assessment Again
          </Button>
          
          <Button
            variant="assessment"
            onClick={() => {
              const dataStr = JSON.stringify(results, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'policy-readiness-assessment-results.json';
              link.click();
            }}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Results
          </Button>
        </div>

        {/* Report Metadata */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Report generated on {new Date(results.reportGenerated).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Results;