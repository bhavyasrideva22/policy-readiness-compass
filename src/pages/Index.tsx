import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, Target, Award, BookOpen } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="w-6 h-6 text-primary" />,
      title: "Psychometric Assessment",
      description: "Evaluate personality traits and work style alignment with policy development roles."
    },
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Technical Knowledge",
      description: "Test your understanding of policy frameworks, compliance, and stakeholder management."
    },
    {
      icon: <Award className="w-6 h-6 text-primary" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis across Will, Interest, Skill, Cognitive Readiness, Ability to Learn, and Real-World Alignment."
    }
  ];

  const careers = [
    "Internal Policy Developer",
    "Compliance Policy Coordinator", 
    "HR Policy Specialist",
    "Governance Framework Advisor",
    "Risk & Controls Documentation Analyst"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Are You Ready to Become an
            <span className="block text-primary bg-gradient-primary bg-clip-text text-transparent">
              Internal Policy Developer?
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover your readiness for policy development roles through our comprehensive assessment 
            covering personality fit, technical knowledge, and career alignment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => navigate('/assessment')}
              className="px-8 py-4 text-lg"
            >
              Start Assessment
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>20-30 minutes</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">18</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Assessment Sections</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Comprehensive Career Assessment
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-medium hover:shadow-large transition-smooth">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            Career Opportunities
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Internal Policy Developers design, draft, and manage organizational policies—ensuring 
            compliance, clarity, and strategic alignment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {careers.map((career, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background shadow-soft">
                <CheckCircle2 className="w-5 h-5 text-success-green shrink-0" />
                <span className="font-medium text-foreground">{career}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto shadow-large">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to Discover Your Policy Career Potential?
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Take our scientifically-designed assessment to get personalized insights, 
                career recommendations, and a detailed development plan.
              </p>
              <Button 
                variant="assessment" 
                size="lg" 
                onClick={() => navigate('/assessment')}
                className="px-8"
              >
                Begin Assessment Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
