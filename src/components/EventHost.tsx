import React from 'react';

interface EventHostProps {
  host: {
    name: string;
    title: string;
    avatar: string;
    stats: {
      courses: number;
      articles: number;
      students: number;
    };
    expertise: string[];
    background: string;
  };
}

export default function EventHost({ host }: EventHostProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={host.avatar}
          alt={host.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg">{host.name}</h3>
          <p className="text-gray-600">{host.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="font-semibold">{host.stats.courses}</div>
          <div className="text-sm text-gray-600">Courses</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{host.stats.articles}</div>
          <div className="text-sm text-gray-600">Articles</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">{host.stats.students}</div>
          <div className="text-sm text-gray-600">Students</div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-2">Expertise</h4>
        <div className="space-y-2">
          {host.expertise.map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-600">
              <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-600" />
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-600 text-sm">{host.background}</p>
    </div>
  );
}