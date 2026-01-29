import { useState, useEffect } from "react";
import {
  Code,
  Database,
  Cpu,
  Smartphone,
  Brain,
  Globe,
  Filter,
} from "lucide-react";

/* ---------- TYPES ---------- */
interface ProblemStatement {
  id: string;
  title: string;
  domain: string;
  description: string;
  expected_outcomes: string;
}

/* ---------- DOMAIN ICONS ---------- */
const domainIcons: { [key: string]: any } = {
  "AI & Manufacturing": Brain,
  "Blockchain & Security": Database,
  "IoT & Automation": Cpu,
  "Mobile Development": Smartphone,
  "Data Science & ML": Brain,
  "Web Development & Database": Globe,
};

/* ---------- SAMPLE DATA ---------- */
const SAMPLE_PROBLEMS: ProblemStatement[] = [
  {
    id: "PS-01",
    title: "AI-Based Defect Detection in Manufacturing",
    domain: "AI & Manufacturing",
    description:
      "Design an AI system that can automatically detect defects in manufactured components using image or sensor data to improve quality control.",
    expected_outcomes:
      "A trained ML model, dataset preprocessing pipeline, and a dashboard to visualize defect predictions.",
  },
  {
    id: "PS-02",
    title: "Secure Certificate Management Using Blockchain",
    domain: "Blockchain & Security",
    description:
      "Build a blockchain-based system to issue, verify, and revoke digital certificates securely and transparently.",
    expected_outcomes:
      "Smart contracts, verification workflow, and a simple UI for issuing and validating certificates.",
  },
  {
    id: "PS-03",
    title: "Smart Energy Monitoring with IoT",
    domain: "IoT & Automation",
    description:
      "Develop an IoT solution to monitor energy consumption in real time and provide optimization insights.",
    expected_outcomes:
      "IoT device simulation, backend data ingestion, and analytics dashboard.",
  },
  {
    id: "PS-04",
    title: "Campus Navigation Mobile App",
    domain: "Mobile Development",
    description:
      "Create a mobile application that helps new students navigate a large campus using indoor and outdoor maps.",
    expected_outcomes:
      "Android/iOS app with map integration, search functionality, and route guidance.",
  },
  {
    id: "PS-05",
    title: "Predictive Analytics for Student Performance",
    domain: "Data Science & ML",
    description:
      "Use historical academic data to predict student performance and identify at-risk students early.",
    expected_outcomes:
      "Data analysis report, ML model, and visualization of predictions.",
  },
  {
    id: "PS-06",
    title: "Hackathon Management Web Portal",
    domain: "Web Development & Database",
    description:
      "Build a full-stack web portal to manage hackathon registrations, teams, submissions, and judging.",
    expected_outcomes:
      "Responsive web app, database schema, and role-based access control.",
  },
];

/* ================= COMPONENT ================= */

export default function SampleProblemsSection() {
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [filteredProblems, setFilteredProblems] =
    useState<ProblemStatement[]>(SAMPLE_PROBLEMS);

  useEffect(() => {
    if (selectedDomain === "All") {
      setFilteredProblems(SAMPLE_PROBLEMS);
    } else {
      setFilteredProblems(
        SAMPLE_PROBLEMS.filter((p) => p.domain === selectedDomain)
      );
    }
  }, [selectedDomain]);

  const domains = ["All", ...new Set(SAMPLE_PROBLEMS.map((p) => p.domain))];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sample Problem Statements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Explore curated problem statements for the hackathon
            </p>
          </div>

          {/* FILTER */}
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
                    ? "bg-[#34a1eb] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          {/* CARDS */}
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
