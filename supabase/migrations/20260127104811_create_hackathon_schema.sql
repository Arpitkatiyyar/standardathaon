/*
  # BIS × NIT Hamirpur Hackathon Schema

  ## Overview
  This migration sets up the complete database schema for the hackathon website,
  including user profiles, teams, problem statements, and team membership tracking.

  ## New Tables

  ### 1. profiles
  Extends auth.users with hackathon-specific user information
  - `id` (uuid, primary key) - Links to auth.users
  - `full_name` (text) - User's full name
  - `email` (text) - User's email address
  - `team_id` (uuid, nullable) - Reference to user's team
  - `created_at` (timestamptz) - Account creation timestamp

  ### 2. teams
  Stores team information for the hackathon
  - `id` (uuid, primary key) - Unique team identifier
  - `name` (text, unique) - Team name
  - `team_code` (text, unique) - 8-character code for joining teams
  - `leader_id` (uuid) - Team leader's user ID
  - `problem_statement_id` (uuid, nullable) - Selected problem statement
  - `created_at` (timestamptz) - Team creation timestamp
  - `member_count` (integer) - Current number of team members

  ### 3. problem_statements
  Contains all hackathon problem statements
  - `id` (uuid, primary key) - Unique problem identifier
  - `title` (text) - Problem title
  - `domain` (text) - Problem domain/category
  - `description` (text) - Detailed problem description
  - `expected_outcomes` (text) - Expected deliverables
  - `created_at` (timestamptz) - Problem creation timestamp

  ### 4. team_members
  Junction table for team membership with additional details
  - `id` (uuid, primary key) - Unique membership identifier
  - `team_id` (uuid) - Reference to team
  - `user_id` (uuid) - Reference to user
  - `joined_at` (timestamptz) - Join timestamp
  - Unique constraint on (team_id, user_id)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies restrict data access based on authentication and ownership
  - Public read access for problem statements
  - Users can only modify their own data
  - Team leaders have additional permissions

  ## Functions
  - Automatic profile creation trigger when users sign up
  - Team code generation function for creating unique join codes
*/

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  team_id uuid,
  created_at timestamptz DEFAULT now()
);

-- Create teams table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  team_code text UNIQUE NOT NULL,
  leader_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  problem_statement_id uuid,
  created_at timestamptz DEFAULT now(),
  member_count integer DEFAULT 1
);

-- Create problem_statements table
CREATE TABLE IF NOT EXISTS problem_statements (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  domain text NOT NULL,
  description text NOT NULL,
  expected_outcomes text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create team_members junction table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id uuid REFERENCES teams(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Add foreign key for team_id in profiles
ALTER TABLE profiles 
  ADD CONSTRAINT fk_profiles_team 
  FOREIGN KEY (team_id) 
  REFERENCES teams(id) 
  ON DELETE SET NULL;

-- Add foreign key for problem_statement_id in teams
ALTER TABLE teams 
  ADD CONSTRAINT fk_teams_problem 
  FOREIGN KEY (problem_statement_id) 
  REFERENCES problem_statements(id) 
  ON DELETE SET NULL;

-- Function to generate random team code
CREATE OR REPLACE FUNCTION generate_team_code()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := '';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create profile automatically on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE problem_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for teams
CREATE POLICY "Anyone can view teams"
  ON teams FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create teams"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = leader_id);

CREATE POLICY "Team leaders can update their teams"
  ON teams FOR UPDATE
  TO authenticated
  USING (auth.uid() = leader_id)
  WITH CHECK (auth.uid() = leader_id);

CREATE POLICY "Team leaders can delete their teams"
  ON teams FOR DELETE
  TO authenticated
  USING (auth.uid() = leader_id);

-- RLS Policies for problem_statements
CREATE POLICY "Anyone can view problem statements"
  ON problem_statements FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join teams"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave teams"
  ON team_members FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert sample problem statements
INSERT INTO problem_statements (title, domain, description, expected_outcomes) VALUES
(
  'Smart Quality Control System',
  'AI & Manufacturing',
  'Develop an AI-powered quality control system that can automatically detect defects in manufactured products using computer vision and machine learning. The system should integrate with existing manufacturing workflows and provide real-time feedback.',
  'Working prototype with computer vision model, API integration, real-time defect detection dashboard, and comprehensive documentation.'
),
(
  'Blockchain-based Certificate Verification',
  'Blockchain & Security',
  'Create a decentralized system for issuing and verifying BIS certification using blockchain technology. The solution should prevent certificate forgery and provide instant verification capabilities.',
  'Smart contracts for certificate issuance, verification portal, mobile app for QR code scanning, and security audit report.'
),
(
  'IoT-enabled Standards Compliance Monitoring',
  'IoT & Automation',
  'Build an IoT-based monitoring system that continuously tracks compliance with BIS standards in real-time across manufacturing facilities. Include sensors, data collection, and alerting mechanisms.',
  'IoT hardware setup, cloud-based monitoring dashboard, alerting system, and data analytics platform.'
),
(
  'Consumer Awareness Mobile App',
  'Mobile Development',
  'Design and develop a mobile application that helps consumers verify BIS-certified products, learn about standards, and report non-compliant products. The app should work offline and be available in multiple Indian languages.',
  'Android/iOS app with product scanning, offline database, multilingual support, and reporting functionality.'
),
(
  'Predictive Maintenance for Testing Equipment',
  'Data Science & ML',
  'Develop a predictive maintenance system for BIS testing and calibration equipment using machine learning. Predict equipment failures before they occur and optimize maintenance schedules.',
  'ML model for failure prediction, maintenance scheduling algorithm, dashboard for equipment health monitoring, and historical data analysis.'
),
(
  'Digital Standards Repository',
  'Web Development & Database',
  'Create a comprehensive, searchable digital repository for all BIS standards with advanced search capabilities, version control, and cross-referencing between related standards.',
  'Web platform with advanced search, RESTful API, version control system, and user-friendly documentation viewer.'
);
