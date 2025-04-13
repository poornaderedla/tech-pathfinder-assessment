
import React from 'react';
import Assessment from '../components/Assessment';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/30 py-10">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Niche Tech Interest Matcher
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover which high-demand tech field aligns best with your interests, 
            work style, and values: AI, ServiceNow, or Salesforce.
          </p>
        </header>

        <main>
          <Assessment />
        </main>

        <footer className="mt-20 text-center text-sm text-gray-500">
          <p>© 2025 Niche Tech Interest Matcher. All rights reserved.</p>
          <p className="mt-1">
            Helping students and career switchers find their perfect tech path.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
