import { useState, useEffect } from 'react';
import { Code, Database, Cpu, Smartphone, Brain, Globe, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ProblemStatement {
  id: string;
  title: string;
  domain: string;
  description: string;
  expected_outcomes: string;
  created_at: string;
}

const domainIcons: { [key: string]: typeof Code } = {
  'AI & Manufacturing': Brain,
  'Blockchain & Security': Database,
  'IoT & Automation': Cpu,
  'Mobile Development': Smartphone,
  'Data Science & ML': Brain,
  'Web Development & Database': Globe,
};

export default function ProblemsSection() {
  const [problems, setProblems] = useState<ProblemStatement[]>([]);
  const [filteredProblems, setFilteredProblems] = useState<ProblemStatement[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProblems();
  }, []);

  useEffect(() => {
    if (selectedDomain === 'All') {
      setFilteredProblems(problems);
    } else {
      setFilteredProblems(problems.filter((p) => p.domain === selectedDomain));
    }
  }, [selectedDomain, problems]);

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('problem_statements')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setProblems(data || []);
      setFilteredProblems(data || []);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const domains = ['All', ...new Set(problems.map((p) => p.domain))];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-[#34a1eb] border-t-transparent rounded-full mx-auto" />
            <p className="mt-4 text-gray-600">Loading problem statements...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Problem Statements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Choose a problem statement that inspires you
            </p>
          </div>

          <div className="flex items-center justify-center mb-12 flex-wrap gap-3">
            <div className="flex items-center space-x-2 text-gray-700 font-medium">
              <Filter size={20} />
              <span>Filter by domain:</span>
            </div>
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedDomain === domain
                    ? 'bg-[#34a1eb] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProblems.map((problem, index) => {
              const Icon = domainIcons[problem.domain] || Code;
              return (
                <div
                  key={problem.id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-t-[#34a1eb] group hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#34a1eb] to-[#9c371e] rounded-xl flex items-center justify-center text-white">
                      <Icon size={24} />
                    </div>
                    <span className="px-3 py-1 bg-[#34a1eb]/10 text-[#34a1eb] rounded-full text-sm font-semibold">
                      {problem.domain}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#34a1eb] transition-colors">
                    {problem.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {problem.description}
                  </p>

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Expected Outcomes:
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {problem.expected_outcomes}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No problem statements found for this domain.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
