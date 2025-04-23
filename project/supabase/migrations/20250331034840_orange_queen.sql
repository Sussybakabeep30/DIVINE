/*
  # Create profiles and trips tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `created_at` (timestamp)
    - `trips`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `destinations` (text[])
      - `travel_option` (text)
      - `stay_preference` (text)
      - `services` (text[])
      - `group_size` (int)
      - `start_date` (date)
      - `created_at` (timestamp)
    - `trip_members`
      - `id` (uuid, primary key)
      - `trip_id` (uuid, references trips)
      - `email` (text)
      - `name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles ON DELETE CASCADE NOT NULL,
  destinations text[] DEFAULT '{}',
  travel_option text,
  stay_preference text,
  services text[] DEFAULT '{}',
  group_size int DEFAULT 1,
  start_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own trips"
  ON trips
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trip members table
CREATE TABLE IF NOT EXISTS trip_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid REFERENCES trips ON DELETE CASCADE NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trip_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage members of their trips"
  ON trip_members
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM trips
      WHERE trips.id = trip_members.trip_id
      AND trips.user_id = auth.uid()
    )
  );