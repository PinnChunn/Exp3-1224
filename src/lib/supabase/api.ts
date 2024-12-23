import { supabase } from './client';
import type { Database } from '../../types/supabase';

type Event = Database['public']['Tables']['events']['Row'];
type NewEvent = Database['public']['Tables']['events']['Insert'];

export async function getEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createEvent(event: NewEvent) {
  const { data, error } = await supabase
    .from('events')
    .insert(event)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEvent(id: string, updates: Partial<Event>) {
  const { data, error } = await supabase
    .from('events')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEvent(id: string) {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id);

  if (error) throw error;
}