import { useRef } from 'react';
import { Calendar, Clock, Tag, Users, Check, Video, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  title: string;
  date: string;
  time: string;
  tags?: string[];
  description: string;
  imageUrl: string;
  onRegister: () => void;
  requiresAuth?: boolean;
  isAuthenticated?: boolean;
  isRegistered?: boolean;
  price?: number;
  skills?: string[];
}

export default function EventCard({
  title,
  date,
  time,
  tags = [],
  description,
  imageUrl,
  onRegister,
  requiresAuth = false,
  isAuthenticated = false,
  isRegistered = false,
  price,
  skills = []
}: EventCardProps) {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the register button
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate('/events/2025-ux-trends');
  };

  const getButtonConfig = () => {
    if (isRegistered) {
      return {
        text: 'Registered',
        icon: Check,
        className: 'bg-green-600 hover:bg-green-700 text-white',
        disabled: true
      };
    }

    if (requiresAuth && !isAuthenticated) {
      return {
        text: 'Connect to Register',
        icon: Users,
        className: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        disabled: false
      };
    }

    return {
      text: 'Register Now',
      icon: Calendar,
      className: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      disabled: false
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div 
      ref={cardRef} 
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 hover:shadow-2xl"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm flex items-center gap-1"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-gray-900">
          {title}
        </h3>

        {/* Event Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5 text-indigo-600" />
            <span>{time}</span>
          </div>
          {price && (
            <div className="flex items-center gap-2 text-gray-600">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>{price} XP</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          {description}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills you'll gain:</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Register Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRegister();
          }}
          disabled={buttonConfig.disabled}
          className={`w-full px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${buttonConfig.className}`}
        >
          <buttonConfig.icon className="w-5 h-5" />
          {buttonConfig.text}
        </button>
      </div>
    </div>
  );
}