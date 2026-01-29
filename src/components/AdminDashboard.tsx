// import { useEffect, useState } from "react";
// import { supabase } from "../lib/supabase";

// /* ---------- TYPES ---------- */
// interface Team {
//   id: string;
//   name: string;
// }

// interface TeamMember {
//   user_id: string;
//   role: string;
//   profiles: {
//     full_name: string;
//     phone: string | null;
//   };
// }

// interface Submission {
//   problem_statement_id: string;
//   drive_link: string;
//   additional_link: string | null;
//   description: string;
// }

// /* ---------- HELPERS ---------- */
// const normalizeUrl = (url: string) =>
//   url.startsWith("http") ? url : `https://${url}`;

// /* ================= COMPONENT ================= */

// export default function AdminDashboard() {
//   const [teams, setTeams] = useState<Team[]>([]);
//   const [membersMap, setMembersMap] = useState<Record<string, TeamMember[]>>(
//     {}
//   );
//   const [submissionsMap, setSubmissionsMap] = useState<
//     Record<string, Submission | null>
//   >({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadAllData = async () => {
//       /* ---------- FETCH TEAMS ---------- */
//       const { data: teamsData } = await supabase
//         .from("teams")
//         .select("id, name")
//         .order("created_at", { ascending: true });

//       if (!teamsData) return;

//       setTeams(teamsData);

//       /* ---------- FETCH MEMBERS ---------- */
//       const { data: membersData } = await supabase
//         .from("team_members")
//         .select(
//           `
//           team_id,
//           role,
//           profiles (
//             full_name,
//             phone
//           )
//         `
//         );

//       const membersGrouped: Record<string, TeamMember[]> = {};
//       membersData?.forEach((m: any) => {
//         if (!membersGrouped[m.team_id]) {
//           membersGrouped[m.team_id] = [];
//         }
//         membersGrouped[m.team_id].push(m);
//       });

//       setMembersMap(membersGrouped);

//       /* ---------- FETCH SUBMISSIONS ---------- */
//       const { data: submissionsData } = await supabase
//         .from("submissions")
//         .select(
//           `
//           team_id,
//           problem_statement_id,
//           drive_link,
//           additional_link,
//           description
//         `
//         );

//       const submissionsGrouped: Record<string, Submission | null> = {};
//       submissionsData?.forEach((s: any) => {
//         submissionsGrouped[s.team_id] = s;
//       });

//       setSubmissionsMap(submissionsGrouped);
//       setLoading(false);
//     };

//     loadAllData();
//   }, []);

//   /* ---------- LOADING ---------- */
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading admin dashboard…
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10 py-20 px-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         <h1 className="text-4xl font-bold text-gray-900">
//           Admin – Team Submissions
//         </h1>

//         {teams.map((team) => {
//           const members = membersMap[team.id] || [];
//           const submission = submissionsMap[team.id];

//           return (
//             <div
//               key={team.id}
//               className="bg-white rounded-3xl shadow-xl p-8 space-y-6"
//             >
//               {/* ---------- TEAM HEADER ---------- */}
//               <div className="flex justify-between items-center">
//                 <h2 className="text-2xl font-bold text-[#34a1eb]">
//                   {team.name}
//                 </h2>

//                 <span
//                   className={`px-4 py-1 rounded-full text-sm font-semibold ${
//                     submission
//                       ? "bg-green-100 text-green-700"
//                       : "bg-yellow-100 text-yellow-700"
//                   }`}
//                 >
//                   {submission ? "Submitted" : "Not Submitted"}
//                 </span>
//               </div>

//               {/* ---------- MEMBERS ---------- */}
//               <div>
//                 <h3 className="font-semibold text-gray-800 mb-2">
//                   Team Members
//                 </h3>

//                 <div className="grid md:grid-cols-2 gap-4">
//                   {members.map((m, idx) => (
//                     <div
//                       key={idx}
//                       className="border rounded-xl p-4 bg-gray-50"
//                     >
//                       <p className="font-semibold text-gray-900">
//                         {m.profiles.full_name}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         📞 {m.profiles.phone ?? "Not provided"}
//                       </p>
//                       <p className="text-sm text-gray-500 capitalize">
//                         Role: {m.role}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* ---------- SUBMISSION ---------- */}
//               {submission ? (
//                 <div className="space-y-4">
//                   <div>
//                     <p className="text-sm text-gray-500">Problem Statement</p>
//                     <p className="font-medium">
//                       {submission.problem_statement_id}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-sm text-gray-500">Drive Link</p>
//                     <a
//                       href={normalizeUrl(submission.drive_link)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[#34a1eb] underline break-all"
//                     >
//                       {submission.drive_link}
//                     </a>
//                   </div>

//                   {submission.additional_link && (
//                     <div>
//                       <p className="text-sm text-gray-500">Additional Link</p>
//                       <a
//                         href={normalizeUrl(submission.additional_link)}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-[#9c371e] underline break-all"
//                       >
//                         {submission.additional_link}
//                       </a>
//                     </div>
//                   )}

//                   <div className="bg-gray-50 border rounded-xl p-6">
//                     <p className="text-sm text-gray-500 mb-2">Description</p>
//                     <p className="whitespace-pre-line text-gray-800">
//                       {submission.description}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-500 italic">
//                   No submission from this team yet.
//                 </p>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/* ---------- TYPES ---------- */
interface Submission {
  team_id: string;
  team_name: string;
  problem_statement_id: string;
  drive_link: string;
  additional_link: string | null;
  description: string;
}

interface TeamMember {
  team_id: string;
  user_id: string;
  role: string;
}

interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
}

/* ---------- HELPERS ---------- */
const normalizeUrl = (url: string) =>
  url.startsWith("http") ? url : `https://${url}`;

/* ================= COMPONENT ================= */

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: submissionsData } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: true });

      const { data: membersData } = await supabase
        .from("team_members")
        .select("team_id, user_id, role");

      const { data: profilesData } = await supabase
        .from("profiles")
        .select("id, full_name, phone");

      setSubmissions(submissionsData ?? []);
      setMembers(membersData ?? []);
      setProfiles(profilesData ?? []);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading submissions…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold">Admin – Team Submissions</h1>

        {submissions.map((sub) => {
          const teamMembers = members.filter(
            (m) => m.team_id === sub.team_id
          );

          return (
            <div
              key={sub.team_id}
              className="bg-white rounded-3xl shadow-2xl p-10 space-y-6"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#34a1eb]">
                  {sub.team_name}
                </h2>
                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                  Submitted
                </span>
              </div>

              {/* MEMBERS */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Team Members
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {teamMembers.map((m, idx) => {
                    const profile = profiles.find(
                      (p) => p.id === m.user_id
                    );

                    return (
                      <div
                        key={idx}
                        className="border rounded-xl p-4 bg-gray-50"
                      >
                        <p className="font-semibold text-gray-900">
                          {profile?.full_name ?? "Name not found"}
                        </p>

                        <p className="text-sm text-gray-600">
                          📞 {profile?.phone ?? "Not provided"}
                        </p>

                        <p className="text-sm text-gray-500 capitalize">
                          Role: {m.role}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PROBLEM */}
              <div>
                <p className="text-sm text-gray-500">Problem Statement</p>
                <p className="text-lg font-semibold">
                  {sub.problem_statement_id}
                </p>
              </div>

              {/* LINKS */}
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Drive Link</p>
                  <a
                    href={normalizeUrl(sub.drive_link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#34a1eb] underline break-all"
                  >
                    {sub.drive_link}
                  </a>
                </div>

                {sub.additional_link && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Additional Link
                    </p>
                    <a
                      href={normalizeUrl(sub.additional_link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9c371e] underline break-all"
                    >
                      {sub.additional_link}
                    </a>
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="bg-gray-50 border rounded-xl p-6">
                <p className="text-sm text-gray-500 mb-2">
                  Description
                </p>
                <p className="whitespace-pre-line text-gray-800">
                  {sub.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
