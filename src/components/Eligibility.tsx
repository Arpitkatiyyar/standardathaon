import { Users, GraduationCap, CheckCircle2, AlertTriangle } from 'lucide-react'

export default function Eligibility() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f9ff] via-white to-[#fff4ee]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Eligibility Criteria
          </h2>
          <div className="mx-auto w-32 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-full" />
          <p className="mt-6 text-xl text-gray-600">
            Who can participate in the BIS × NIT Hamirpur Hackathon
          </p>
        </div>

        {/* Eligibility Cards */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* General Eligibility */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#34a1eb] flex items-center justify-center text-white">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                General Eligibility
              </h3>
            </div>

            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <CheckCircle2 className="text-[#34a1eb]" size={20} />
                <span>
                  Open to <strong>undergraduate, postgraduate, and diploma</strong> students.
                </span>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="text-[#34a1eb]" size={20} />
                <span>
                  Students from <strong>all departments</strong> are eligible to participate.
                </span>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="text-[#34a1eb]" size={20} />
                <span>
                  Participants must be enrolled in a <strong>recognized institution</strong>.
                </span>
              </li>
            </ul>
          </div>

          {/* Team Formation Rules */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#9c371e] flex items-center justify-center text-white">
                <Users size={22} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Team Formation Rules
              </h3>
            </div>

            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">
                <CheckCircle2 className="text-[#9c371e]" size={20} />
                <span>
                  Teams must consist of <strong>2 to 4 members</strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="text-[#9c371e]" size={20} />
                <span>
                  Each team must include <strong>at least 2 members</strong> from
                  <strong> Mechanical, Civil, or Chemical Engineering</strong>.
                </span>
              </li>

              <li className="flex gap-3">
                <CheckCircle2 className="text-[#9c371e]" size={20} />
                <span>
                  Remaining team members can belong to <strong>any department</strong>.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Important Note */}
        <div className="mt-16 bg-gradient-to-r from-[#34a1eb]/10 to-[#9c371e]/10 border border-[#34a1eb]/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#9c371e] flex items-center justify-center text-white">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Important Note
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Team composition will be verified during registration.
                Teams not meeting the eligibility or composition criteria
                may be disqualified at any stage of the hackathon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

