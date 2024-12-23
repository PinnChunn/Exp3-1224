import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import type { Database } from '../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('*');

      if (error) {
        console.error('Error fetching initial events:', error);
      } else {
        setEvents(data || []);
      }
    }

    fetchEvents();

    const channel = supabase.channel('public:events')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        (payload) => {
          console.log('Change received!', payload);
          switch (payload.eventType) {
            case 'INSERT':
              setEvents(prevEvents => [...prevEvents, payload.new as Event]);
              break;
            case 'UPDATE':
              setEvents(prevEvents =>
                prevEvents.map(event =>
                  event.id === payload.new.id ? payload.new as Event : event
                )
              );
              break;
            case 'DELETE':
              setEvents(prevEvents =>
                prevEvents.filter(event => event.id !== payload.old.id)
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      {events.map(event => (
        <div 
          key={event.id}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
          <p className="text-gray-600">{event.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>{new Date(event.date).toLocaleDateString()}</span>
            <span>{event.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}