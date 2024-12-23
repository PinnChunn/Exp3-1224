/*
  # Create events and registrations tables

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `time` (time)
      - `max_seats` (integer)
      - `current_seats` (integer)
      - `price` (integer)
      - `created_at` (timestamptz)
    
    - `registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `event_id` (uuid, references events)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Add policies for event viewing and registration
*/

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  time time NOT NULL,
  max_seats integer NOT NULL DEFAULT 100,
  current_seats integer NOT NULL DEFAULT 0,
  price integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  event_id uuid REFERENCES events NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policies for events
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  TO public
  USING (true);

-- Policies for registrations
CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own registrations"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update event seats
CREATE OR REPLACE FUNCTION update_event_seats()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE events 
    SET current_seats = current_seats + 1
    WHERE id = NEW.event_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE events 
    SET current_seats = current_seats - 1
    WHERE id = OLD.event_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating seats
CREATE TRIGGER update_event_seats_trigger
AFTER INSERT OR DELETE ON registrations
FOR EACH ROW
EXECUTE FUNCTION update_event_seats();