export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          team_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name: string;
          email: string;
          team_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          team_id?: string | null;
          created_at?: string;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          team_code: string;
          leader_id: string;
          problem_statement_id: string | null;
          created_at: string;
          member_count: number;
        };
        Insert: {
          id?: string;
          name: string;
          team_code: string;
          leader_id: string;
          problem_statement_id?: string | null;
          created_at?: string;
          member_count?: number;
        };
        Update: {
          id?: string;
          name?: string;
          team_code?: string;
          leader_id?: string;
          problem_statement_id?: string | null;
          created_at?: string;
          member_count?: number;
        };
      };
      problem_statements: {
        Row: {
          id: string;
          title: string;
          domain: string;
          description: string;
          expected_outcomes: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          domain: string;
          description: string;
          expected_outcomes: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          domain?: string;
          description?: string;
          expected_outcomes?: string;
          created_at?: string;
        };
      };
      team_members: {
        Row: {
          id: string;
          team_id: string;
          user_id: string;
          joined_at: string;
        };
        Insert: {
          id?: string;
          team_id: string;
          user_id: string;
          joined_at?: string;
        };
        Update: {
          id?: string;
          team_id?: string;
          user_id?: string;
          joined_at?: string;
        };
      };
    };
  };
}
