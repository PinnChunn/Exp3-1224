import React from 'react';
import { CheckCircle } from 'lucide-react';

const outcomes = [
  "Understand AI's role in modern UX design",
  "Learn to integrate AI tools into design workflows",
  "Create AI-enhanced user interfaces",
  "Implement ethical AI design principles"
];

export default function EventLearningOutcomes() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Learning Outcomes</h2>
      <div className="space-y-3">
        {outcomes.map((outcome, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600">{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}