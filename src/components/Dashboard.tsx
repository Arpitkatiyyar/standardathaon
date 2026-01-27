import { useState, useEffect } from 'react';
import { User, Users, Copy, Check, Plus, LogIn, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Team {
  id: string;
  name: string;
  team_code: string;
  leader_id: string;
  problem_statement_id: string | null;
  member_count: number;
  problem_statement?: {
    title: string;
    domain: string;
  };
}

interface TeamMember {
  id: string;
  user_id: string;
  profiles: {
    full_name: string;
    email: string;
  };
}

export default function Dashboard() {
  const { user, profile, refreshProfile } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [showJoinTeam, setShowJoinTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    if (profile?.team_id) {
      fetchTeamData();
    } else {
      setLoading(false);
    }
  }, [profile]);

  const fetchTeamData = async () => {
    if (!isSupabaseConfigured) return;
    if (!profile?.team_id) return;

    try {
      const { data: teamData, error: teamError } = await supabase
        .from('teams')
        .select(`
          *,
          problem_statement:problem_statements(title, domain)
        `)
        .eq('id', profile.team_id)
        .maybeSingle();

      if (teamError) throw teamError;
      setTeam(teamData);

      const { data: membersData, error: membersError } = await supabase
        .from('team_members')
        .select(`
          id,
          user_id,
          profiles(full_name, email)
        `)
        .eq('team_id', profile.team_id);

      if (membersError) throw membersError;
      setTeamMembers(membersData || []);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured');
      return;
    }
    if (!teamName.trim()) {
      setError('Please enter a team name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const teamCode = await generateTeamCode();

      const { data: newTeam, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: teamName,
          team_code: teamCode,
          leader_id: user!.id,
        })
        .select()
        .single();

      if (teamError) throw teamError;

      await supabase
        .from('team_members')
        .insert({
          team_id: newTeam.id,
          user_id: user!.id,
        });

      await supabase
        .from('profiles')
        .update({ team_id: newTeam.id })
        .eq('id', user!.id);

      await refreshProfile();
      setSuccess('Team created successfully!');
      setShowCreateTeam(false);
      setTeamName('');
      fetchTeamData();
    } catch (error: unknown) {
      console.error('Error creating team:', error);
      setError(error instanceof Error ? error.message : 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  const generateTeamCode = async (): Promise<string> => {
    if (!isSupabaseConfigured) throw new Error('Supabase is not configured');
    const { data, error } = await supabase.rpc('generate_team_code');
    if (error) throw error;
    return data;
  };

  const joinTeam = async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured');
      return;
    }
    if (!joinCode.trim()) {
      setError('Please enter a team code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data: existingTeam, error: findError } = await supabase
        .from('teams')
        .select('id, member_count')
        .eq('team_code', joinCode.toUpperCase())
        .maybeSingle();

      if (findError) throw findError;
      if (!existingTeam) {
        setError('Invalid team code');
        setLoading(false);
        return;
      }

      if (existingTeam.member_count >= 4) {
        setError('This team is already full (max 4 members)');
        setLoading(false);
        return;
      }

      await supabase
        .from('team_members')
        .insert({
          team_id: existingTeam.id,
          user_id: user!.id,
        });

      await supabase
        .from('teams')
        .update({ member_count: existingTeam.member_count + 1 })
        .eq('id', existingTeam.id);

      await supabase
        .from('profiles')
        .update({ team_id: existingTeam.id })
        .eq('id', user!.id);

      await refreshProfile();
      setSuccess('Successfully joined the team!');
      setShowJoinTeam(false);
      setJoinCode('');
      fetchTeamData();
    } catch (error: unknown) {
      console.error('Error joining team:', error);
      setError(error instanceof Error ? error.message : 'Failed to join team');
    } finally {
      setLoading(false);
    }
  };

  const leaveTeam = async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured');
      return;
    }
    if (!profile?.team_id || !team) return;

    if (team.leader_id === user!.id) {
      setError('Team leaders must delete the team instead of leaving it');
      return;
    }

    if (!confirm('Are you sure you want to leave this team?')) return;

    setLoading(true);
    try {
      await supabase
        .from('team_members')
        .delete()
        .eq('team_id', profile.team_id)
        .eq('user_id', user!.id);

      await supabase
        .from('teams')
        .update({ member_count: team.member_count - 1 })
        .eq('id', profile.team_id);

      await supabase
        .from('profiles')
        .update({ team_id: null })
        .eq('id', user!.id);

      await refreshProfile();
      setTeam(null);
      setTeamMembers([]);
      setSuccess('Left team successfully');
    } catch (error) {
      console.error('Error leaving team:', error);
      setError('Failed to leave team');
    } finally {
      setLoading(false);
    }
  };

  const deleteTeam = async () => {
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured');
      return;
    }
    if (!team || team.leader_id !== user!.id) return;

    if (!confirm('Are you sure you want to delete this team? This action cannot be undone.')) return;

    setLoading(true);
    try {
      await supabase
        .from('profiles')
        .update({ team_id: null })
        .eq('team_id', team.id);

      await supabase
        .from('team_members')
        .delete()
        .eq('team_id', team.id);

      await supabase
        .from('teams')
        .delete()
        .eq('id', team.id);

      await refreshProfile();
      setTeam(null);
      setTeamMembers([]);
      setSuccess('Team deleted successfully');
    } catch (error) {
      console.error('Error deleting team:', error);
      setError('Failed to delete team');
    } finally {
      setLoading(false);
    }
  };

  const copyTeamCode = () => {
    if (team?.team_code) {
      navigator.clipboard.writeText(team.team_code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin w-12 h-12 border-4 border-[#34a1eb] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage your profile and team</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#34a1eb]/10 rounded-xl flex items-center justify-center">
                  <User className="text-[#34a1eb]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Full Name</label>
                  <p className="text-lg text-gray-900">{profile?.full_name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-900">{profile?.email}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Team Status</label>
                  <p className="text-lg text-gray-900">
                    {team ? (
                      <span className="text-green-600 font-semibold">In a team</span>
                    ) : (
                      <span className="text-orange-600 font-semibold">No team yet</span>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-[#9c371e]/10 rounded-xl flex items-center justify-center">
                  <Users className="text-[#9c371e]" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
              </div>

              {!team ? (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">
                    You're not part of any team yet. Create a new team or join an existing one.
                  </p>

                  {!showCreateTeam && !showJoinTeam && (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowCreateTeam(true)}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#34a1eb] text-white rounded-lg font-semibold hover:bg-[#2891db] transition-all"
                      >
                        <Plus size={20} />
                        <span>Create New Team</span>
                      </button>

                      <button
                        onClick={() => setShowJoinTeam(true)}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-[#9c371e] text-white rounded-lg font-semibold hover:bg-[#8a2f19] transition-all"
                      >
                        <LogIn size={20} />
                        <span>Join Existing Team</span>
                      </button>
                    </div>
                  )}

                  {showCreateTeam && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter team name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#34a1eb] focus:border-transparent outline-none"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={createTeam}
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-[#34a1eb] text-white rounded-lg font-semibold hover:bg-[#2891db] transition-all disabled:opacity-50"
                        >
                          Create
                        </button>
                        <button
                          onClick={() => setShowCreateTeam(false)}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {showJoinTeam && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        placeholder="Enter team code"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#9c371e] focus:border-transparent outline-none uppercase"
                        maxLength={8}
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={joinTeam}
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-[#9c371e] text-white rounded-lg font-semibold hover:bg-[#8a2f19] transition-all disabled:opacity-50"
                        >
                          Join
                        </button>
                        <button
                          onClick={() => setShowJoinTeam(false)}
                          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Team Name</label>
                    <p className="text-xl font-bold text-gray-900">{team.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">
                      Team Code
                    </label>
                    <div className="flex items-center space-x-2">
                      <code className="flex-1 px-4 py-3 bg-gray-100 rounded-lg font-mono text-lg font-bold text-gray-900">
                        {team.team_code}
                      </code>
                      <button
                        onClick={copyTeamCode}
                        className="px-4 py-3 bg-[#34a1eb] text-white rounded-lg hover:bg-[#2891db] transition-all"
                        title="Copy team code"
                      >
                        {copiedCode ? <Check size={20} /> : <Copy size={20} />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Share this code with your teammates to let them join
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">
                      Team Members ({teamMembers.length}/4)
                    </label>
                    <div className="space-y-2">
                      {teamMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-900">
                              {member.profiles.full_name}
                              {member.user_id === team.leader_id && (
                                <span className="ml-2 px-2 py-1 bg-[#34a1eb] text-white text-xs rounded-full">
                                  Leader
                                </span>
                              )}
                            </p>
                            <p className="text-sm text-gray-600">{member.profiles.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    {team.leader_id === user!.id ? (
                      <button
                        onClick={deleteTeam}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
                      >
                        <Trash2 size={20} />
                        <span>Delete Team</span>
                      </button>
                    ) : (
                      <button
                        onClick={leaveTeam}
                        className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-all"
                      >
                        <LogIn size={20} className="rotate-180" />
                        <span>Leave Team</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
