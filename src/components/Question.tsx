
import React from 'react';
import { Question as QuestionType } from '../data/questions';

interface QuestionProps {
  question: QuestionType;
  selectedChoice: string | null;
  onSelectChoice: (choiceId: string) => void;
}

const Question: React.FC<QuestionProps> = ({ 
  question, 
  selectedChoice, 
  onSelectChoice 
}) => {
  const IconComponent = question.icon;

  const renderChoices = () => {
    switch (question.type) {
      case 'multiple-choice':
      case 'scenario':
      case 'tradeoff':
        return (
          <div className="space-y-3 mt-4">
            {question.choices.map((choice) => (
              <div 
                key={choice.id}
                className={`radio-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                onClick={() => onSelectChoice(choice.id)}
              >
                <div className="flex items-start">
                  <div className="h-5 w-5 shrink-0 mt-0.5">
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      selectedChoice === choice.id 
                        ? 'bg-accent border-accent' 
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedChoice === choice.id && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <span className="text-gray-800">{choice.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'likert-scale':
        return (
          <div className="mt-6 space-y-4">
            {question.choices.map((choice) => (
              <div 
                key={choice.id}
                className={`radio-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                onClick={() => onSelectChoice(choice.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{choice.text}</span>
                  <div className="h-5 w-5">
                    <div className={`h-5 w-5 rounded-full border-2 ${
                      selectedChoice === choice.id 
                        ? 'bg-accent border-accent' 
                        : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {selectedChoice === choice.id && (
                        <div className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        {IconComponent && <IconComponent className="h-5 w-5 text-accent" />}
        <h3 className="text-xl font-semibold text-gray-800">
          {question.question}
        </h3>
      </div>
      
      {question.description && (
        <p className="text-gray-600 mb-4">{question.description}</p>
      )}
      
      {renderChoices()}
    </div>
  );
};

export default Question;
