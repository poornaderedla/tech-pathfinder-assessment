
import React from 'react';
import { ResultProfile } from '../data/results';
import { Button } from "@/components/ui/button";
import { Share2, Award, ChevronRight } from 'lucide-react';
import ShareCard from './ShareCard';

interface ResultsProps {
  primaryMatch: ResultProfile;
  secondaryMatch: ResultProfile;
  percentages: Record<string, number>;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ 
  primaryMatch, 
  secondaryMatch, 
  percentages,
  onRestart
}) => {
  const [showShareCard, setShowShareCard] = React.useState(false);

  return (
    <div className="animate-scale-in">
      <div className="text-center mb-8">
        <div className="inline-block p-2 rounded-full bg-accent/10 mb-4">
          <Award className="h-12 w-12 text-accent" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Tech Path Match</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Based on your responses, we've identified your ideal tech career path.
          Here's a personalized breakdown of your results.
        </p>
      </div>

      {/* Primary Match */}
      <div className="assessment-card mb-8 border-t-4 border-accent">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm font-medium text-accent/80">PRIMARY MATCH</span>
            <h3 className="text-2xl font-bold text-gray-800">{primaryMatch.title}</h3>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Match Strength</span>
            <p className="text-2xl font-bold text-accent">{percentages[primaryMatch.id]}%</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          {primaryMatch.description}
        </p>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Your Key Strengths:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {primaryMatch.strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-accent"></div>
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-800 mb-2">Potential Roles:</h4>
          <div className="flex flex-wrap gap-2">
            {primaryMatch.roles.map((role, index) => (
              <span key={index} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Match */}
      <div className="assessment-card mb-8 border-t-4 border-gray-400">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm font-medium text-gray-500">SECONDARY MATCH</span>
            <h3 className="text-xl font-bold text-gray-800">{secondaryMatch.title}</h3>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Match Strength</span>
            <p className="text-xl font-bold text-gray-600">{percentages[secondaryMatch.id]}%</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          {secondaryMatch.description}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button 
          onClick={() => setShowShareCard(true)} 
          variant="outline" 
          className="flex-1"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share Your Results
        </Button>
        <Button className="flex-1 bg-accent hover:bg-accent/90">
          Explore Training Options
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="text-center mb-8">
        <button 
          onClick={onRestart}
          className="text-gray-500 hover:text-gray-800 text-sm underline"
        >
          Retake Assessment
        </button>
      </div>

      {showShareCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <ShareCard 
            result={primaryMatch} 
            percentage={percentages[primaryMatch.id]}
            onClose={() => setShowShareCard(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Results;
