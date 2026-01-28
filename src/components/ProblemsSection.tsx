import { useState, useEffect } from 'react'
import {
  Code,
  Database,
  Cpu,
  Smartphone,
  Brain,
  Globe,
} from 'lucide-react'
import { supabase } from '../lib/supabase'

interface ProblemStatement {
  id: string
  title: string
  domain: string
  description: string
  expected_outcomes: string
  created_at: string
}

/* 🔹 Domain → Icon mapping */
const domainIcons: Record<string, any> = {
  'AI & Manufacturing': Brain,
  'Blockchain & Security': Database,
  'IoT & Automation': Cpu,
  'Mobile Development': Smartphone,
  'Data Science & ML': Brain,
  'Web Development & Database': Globe,
}

/* 🔹 DEMO DATA */
const DEMO_PROBLEMS: ProblemStatement[] = [
  {
    id: 'BIS-PS-001',
    title: 'AI-based Predictive Maintenance System',
    domain: 'AI & Manufacturing',
    description:
      'Develop an AI-powered system to predict machine failures in manufacturing plants using sensor data and historical maintenance records.',
    expected_outcomes:
      'Reduced downtime, improved maintenance planning, and increased equipment life.',
    created_at: new Date().toISOString(),
  },
  {
    id: 'BIS-PS-002',
    title: 'Smart Water Quality Monitoring Platform',
    domain: 'IoT & Automation',
    description:
      'Design an IoT-based solution to monitor water quality parameters in real-time and alert authorities when thresholds are crossed.',
    expected_outcomes:
      'Real-time monitoring, early contamination alerts, and better public health safety.',
    created_at: new Date().toISOString(),
  },
]

export default function ProblemsSection() {
  const [problems, setProblems] = useState<ProblemStatement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProblems()
  }, [])

  const fetchProblems = async () => {
    try {
      const { data, error } = await supabase
        .from('problem_statements')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setProblems(data && data.length > 0 ? data : DEMO_PROBLEMS)
    } catch {
      setProblems(DEMO_PROBLEMS)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#f4f9ff] to-white text-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#34a1eb] border-t-transparent rounded-full mx-auto" />
        <p className="mt-4 text-gray-600">Loading problem statements...</p>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f9ff] via-white to-[#fff4ee]">
      <div className="max-w-5xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Problem Statements
          </h2>
          <div className="w-28 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-600">
            Select one problem statement for your hackathon submission
          </p>
        </div>

        {/* PROBLEM STATEMENTS – FULL WIDTH */}
        <div className="space-y-20">
          {problems.map((problem, index) => {
            const Icon = domainIcons[problem.domain] || Code

            return (
              <div key={problem.id} className="relative">

                {/* PROBLEM HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <p className="text-sm font-semibold text-[#9c371e]">
                      Problem ID: {problem.id}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                      {problem.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#34a1eb] to-[#9c371e] flex items-center justify-center text-white">
                      <Icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-[#34a1eb] bg-[#34a1eb]/10 px-4 py-1 rounded-full">
                      {problem.domain}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="border-l-4 border-[#34a1eb] pl-6 space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Problem Description
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">
                      Expected Outcomes
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {problem.expected_outcomes}
                    </p>
                  </div>
                </div>

                {/* DIVIDER */}
                {index !== problems.length - 1 && (
                  <div className="mt-16 h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
