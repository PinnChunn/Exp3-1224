import React from 'react';
import { Info } from 'lucide-react';

const requirements = [
  "Basic understanding of UX design principles",
  "Familiarity with design tools (Figma, Sketch)",
  "No coding experience required"
];

export default function EventRequirements() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Requirements</h2>
      <div className="space-y-3">
        {requirements.map((requirement, index) => (
          <div key={index} className="flex items-center gap-3">
            <Info className="w-5 h-5 text-purple-600" />
            <span className="text-gray-600">{requirement}</span>
          </div>
        ))}
      </div>
    </div>
  );
}