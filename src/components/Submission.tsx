import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

const MAX_WORDS = 500;

export default function Submission() {
  const { user, profile, loading } = useAuth();

  const [submission, setSubmission] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);

  const [problemStatementId, setProblemStatementId] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [additionalLink, setAdditionalLink] = useState("");
  const [description, setDescription] = useState("");
  const [descError, setDescError] = useState("");

  const wordCount = description.trim().split(/\s+/).filter(Boolean).length;

  /* ---------------- FETCH SUBMISSION ---------------- */
  useEffect(() => {
    if (loading) return;

    if (!profile?.team_id) {
      setPageLoading(false);
      return;
    }

    const fetchSubmission = async () => {
      const { data } = await supabase
        .from("submissions")
        .select("*")
        .eq("team_id", profile.team_id as string)
        .maybeSingle();

      setSubmission(data ?? null);
      setPageLoading(false);
    };

    fetchSubmission();
  }, [loading, profile?.team_id]);

  /* ---------------- DELETE SUBMISSION ---------------- */
  const handleDeleteSubmission = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this submission? You can submit again after deleting.",
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("submissions")
      .delete()
      .eq("team_id", profile?.team_id as string);

    if (error) {
      alert(error.message);
    } else {
      alert("Submission deleted. You can submit again.");
      window.location.reload();
    }
  };

  /* ---------------- LOADING ---------------- */
  if (loading || pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading submission…</p>
      </div>
    );
  }

  /* ---------------- NO TEAM ---------------- */
  if (!profile?.team_id) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">No Team Found</h2>
          <p className="text-gray-600">
            You must join or create a team before submitting your project.
          </p>
        </div>
      </div>
    );
  }
  const normalizeUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  /* ================= ALREADY SUBMITTED ================= */
  if (submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#34a1eb]/10 via-white to-[#9c371e]/10 py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Team Submission
          </h2>

          {/* Problem Statement */}
          <div>
            <p className="text-sm text-gray-500 mb-1">Problem Statement</p>
            <p className="text-lg font-semibold text-gray-800">
              {submission.problem_statement_id}
            </p>
          </div>

          {/* TEXT LINKS — OPEN IN NEW TAB */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Drive Link</p>
              <a
                href={normalizeUrl(submission.drive_link)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#34a1eb] font-medium underline break-all hover:text-[#2891db]"
              >
                {submission.drive_link}
              </a>
            </div>

            {submission.additional_link && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Additional Link</p>
                <a
                  href={normalizeUrl(submission.additional_link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#9c371e] font-medium underline break-all hover:text-[#8a2f19]"
                >
                  {submission.additional_link}
                </a>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-gray-50 border rounded-xl p-6">
            <p className="text-sm text-gray-500 mb-2">Project Description</p>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed">
              {submission.description}
            </p>
          </div>

          {/* Status + Delete */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-700">
              ✅ Submission Completed
            </span>

            <button
              onClick={handleDeleteSubmission}
              className="text-sm font-medium text-red-600 underline hover:text-red-700"
            >
              Delete & Update Submission
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    if (!user || !profile?.team_id) return;

    if (wordCount > MAX_WORDS) {
      setDescError("Description must be within 500 words.");
      return;
    }

    const { error } = await supabase.from("submissions").insert({
      team_id: profile.team_id as string,
      team_name: "AUTO",
      problem_statement_id: problemStatementId,
      drive_link: driveLink,
      additional_link: additionalLink || null,
      description,
      uploaded_by: user.id,
    } as any);

    if (error) {
      alert(error.message);
    } else {
      alert("Submission successful!");
      window.location.reload();
    }
  };

  /* ---------------- FORM ---------------- */
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold">Project Submission</h2>

        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Problem Statement ID"
          value={problemStatementId}
          onChange={(e) => setProblemStatementId(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Google Drive Link"
          value={driveLink}
          onChange={(e) => setDriveLink(e.target.value)}
        />

        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Additional Link (optional)"
          value={additionalLink}
          onChange={(e) => setAdditionalLink(e.target.value)}
        />

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">
            Project Description (max 500 words)
          </label>
          <textarea
            rows={6}
            className={`w-full border rounded-lg px-4 py-2 ${
              wordCount > MAX_WORDS ? "border-red-500" : ""
            }`}
            value={description}
            onChange={(e) => {
              const text = e.target.value;
              const words = text.trim().split(/\s+/).filter(Boolean);
              if (words.length <= MAX_WORDS) {
                setDescription(text);
                setDescError("");
              }
            }}
          />
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-500">
              {wordCount}/{MAX_WORDS} words
            </span>
            {descError && <span className="text-red-600">{descError}</span>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] text-white font-semibold rounded-lg"
        >
          Submit Project
        </button>
      </div>
    </div>
  );
}
