
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Question from './Question';
import ProgressBar from './ProgressBar';
import Results from './Results';
import { questions } from '../data/questions';
import { calculateResults, results } from '../data/results';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Assessment: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleSelectChoice = (choiceId: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: choiceId
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setHasStarted(false);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedChoice = currentQuestion ? answers[currentQuestion.id] : null;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const renderAssessment = () => {
    if (showResults) {
      const result = calculateResults(answers);
      return (
        <Results 
          primaryMatch={results[result.primaryMatch]}
          secondaryMatch={results[result.secondaryMatch]}
          percentages={result.percentages}
          onRestart={handleRestart}
        />
      );
    }

    return (
      <div>
        <ProgressBar currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
        
        <div className="assessment-card">
          {currentQuestion && (
            <Question 
              question={currentQuestion}
              selectedChoice={selectedChoice}
              onSelectChoice={handleSelectChoice}
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          <Button 
            onClick={handlePrevious} 
            disabled={currentQuestionIndex === 0}
            variant="outline"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext} 
            disabled={!selectedChoice}
            className="bg-accent hover:bg-accent/90"
          >
            {isLastQuestion ? 'See Results' : 'Next'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  const renderIntro = () => {
    return (
      <div className="assessment-card text-center animate-scale-in">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Discover Your Tech Career Path</h2>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Find your perfect match in AI, ServiceNow, or Salesforce with our personalized assessment.
          Answer a few questions about your interests, work style, and values to receive your customized recommendation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-purple-50 text-center">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-purple-600 font-bold">AI</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Artificial Intelligence</h3>
            <p className="text-sm text-gray-600">Machine learning, data science, and intelligent systems</p>
          </div>
          
          <div className="p-4 rounded-lg bg-blue-50 text-center">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-blue-600 font-bold">SN</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">ServiceNow</h3>
            <p className="text-sm text-gray-600">Digital workflows, process automation, and IT service management</p>
          </div>
          
          <div className="p-4 rounded-lg bg-green-50 text-center">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 font-bold">SF</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Salesforce</h3>
            <p className="text-sm text-gray-600">Customer relationship management, cloud solutions, and business apps</p>
          </div>
        </div>
        
        <Button onClick={handleStart} className="bg-accent hover:bg-accent/90 px-8 py-6 text-lg">
          Start Assessment
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-xs text-gray-500 mt-4">
          About 5 minutes to complete • 15 questions • Personalized results
        </p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {hasStarted ? renderAssessment() : renderIntro()}
    </div>
  );
};

export default Assessment;
