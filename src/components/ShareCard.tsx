
import React from 'react';
import { ResultProfile } from '../data/results';
import { Button } from "@/components/ui/button";
import { X, Share2, Facebook, Twitter, Linkedin, Copy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ShareCardProps {
  result: ResultProfile;
  percentage: number;
  onClose: () => void;
}

const ShareCard: React.FC<ShareCardProps> = ({ result, percentage, onClose }) => {
  const { toast } = useToast();
  
  const handleCopyLink = () => {
    const text = `I'm a ${result.badge} with a ${percentage}% match! Find your tech career path with the Niche Tech Interest Matcher.`;
    navigator.clipboard.writeText(text);
    toast({
      title: "Link copied!",
      description: "Share your results with others."
    });
  };

  const handleShare = (platform: string) => {
    toast({
      title: "Sharing to " + platform,
      description: "Sharing functionality would open a share dialog for " + platform
    });
  };

  return (
    <div className="assessment-card max-w-md w-full animate-scale-in relative overflow-hidden">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <X className="h-4 w-4" />
      </button>
      
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Share Your Results</h3>
        <p className="text-gray-600">Let others know about your tech career match!</p>
      </div>
      
      <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">YOUR BADGE</span>
          <span className="text-sm font-medium text-accent">{percentage}% Match</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent text-lg font-bold">{result.badge.split(' ')[0][0]}</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-800">{result.badge}</h4>
            <p className="text-sm text-gray-600">Share and inspire others!</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3 mb-6">
        <Button 
          onClick={() => handleShare("Facebook")}
          variant="outline" 
          className="w-full justify-start"
        >
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Share on Facebook
        </Button>
        
        <Button 
          onClick={() => handleShare("Twitter")}
          variant="outline" 
          className="w-full justify-start"
        >
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Share on Twitter
        </Button>
        
        <Button 
          onClick={() => handleShare("LinkedIn")}
          variant="outline" 
          className="w-full justify-start"
        >
          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
          Share on LinkedIn
        </Button>
        
        <Button 
          onClick={handleCopyLink}
          variant="outline" 
          className="w-full justify-start"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Result Text
        </Button>
      </div>
      
      <p className="text-sm text-center text-gray-500">
        Thanks for taking the Niche Tech Interest Matcher!
      </p>
    </div>
  );
};

export default ShareCard;
