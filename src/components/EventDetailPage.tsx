import { useState, useEffect } from 'react';
import { ArrowLeft, Share2, Calendar, MapPin, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/supabase/hooks';
import { registerForEvent, getEventRegistration } from '../lib/supabase/events';
import EventHost from './EventHost';
import EventRequirements from './EventRequirements';
import EventLearningOutcomes from './EventLearningOutcomes';
import AuthButton from './AuthButton';

interface EventDetailPageProps {
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    isVirtual: boolean;
    maxSeats: number;
    currentSeats: number;
    description: string;
    price: number;
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
  };
}

export default function EventDetailPage({ event }: EventDetailPageProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    async function checkRegistration() {
      if (user) {
        const registration = await getEventRegistration(event.id);
        setIsRegistered(!!registration);
      }
    }
    checkRegistration();
  }, [user, event.id]);

  const handleRegistration = async () => {
    if (!user) return;
    
    try {
      setIsRegistering(true);
      await registerForEvent(event.id);
      setIsRegistered(true);
      alert('Successfully registered for event!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to register for event');
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xl font-bold text-purple-600">EXP3</span>
          </div>
          {!user && <AuthButton />}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Event Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
              alt="AI/UX Lecture"
              className="w-full h-80 object-cover rounded-2xl"
            />
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Event Title & Info */}
          <div>
            <h1 className="text-3xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date} {event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.isVirtual ? 'Virtual' : 'In Person'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{event.currentSeats}/{event.maxSeats} seats</span>
              </div>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <h2 className="text-xl font-semibold mb-4">About this event</h2>
            <p className="text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          <EventLearningOutcomes />
          <EventRequirements />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Registration Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-semibold">
                {event.price > 0 ? `${event.price} XP` : 'Free Event'}
              </span>
              {event.price > 0 && (
                <span className="text-gray-600">{event.price} XP</span>
              )}
            </div>
            
            {!user && (
              <AuthButton 
                className="w-full mb-4"
                onSuccess={() => {
                  if (!isRegistered) {
                    handleRegistration();
                  }
                }}
              />
            )}

            {user && !isRegistered && (
              <button
                onClick={handleRegistration}
                disabled={isRegistering}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {isRegistering ? 'Registering...' : 'Register Now'}
              </button>
            )}

            {user && isRegistered && (
              <button
                disabled
                className="w-full py-3 bg-green-600 text-white rounded-lg"
              >
                Registered
              </button>
            )}

            <p className="text-center text-gray-600 text-sm mt-4">
              {event.maxSeats - event.currentSeats} spots remaining
            </p>
          </div>

          <EventHost host={event.host} />
        </div>
      </main>
    </div>
  );
}