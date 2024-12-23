import { supabase } from './client';
import type { Database } from '../../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];
type Registration = Database['public']['Tables']['registrations']['Row'];

export async function registerForEvent(eventId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be logged in to register');
  }

  // Check if user is already registered
  const { data: existingReg } = await supabase
    .from('registrations')
    .select()
    .eq('user_id', user.id)
    .eq('event_id', eventId)
    .single();

  if (existingReg) {
    throw new Error('Already registered for this event');
  }

  // Check if event has available seats
  const { data: event } = await supabase
    .from('events')
    .select('current_seats, max_seats')
    .eq('id', eventId)
    .single();

  if (!event) {
    throw new Error('Event not found');
  }

  if (event.current_seats >= event.max_seats) {
    throw new Error('Event is full');
  }

  // Register for event
  const { data, error } = await supabase
    .from('registrations')
    .insert({
      user_id: user.id,
      event_id: eventId,
      status: 'confirmed'
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getEventRegistration(eventId: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from('registrations')
    .select()
    .eq('user_id', user.id)
    .eq('event_id', eventId)
    .single();

  return data;
}