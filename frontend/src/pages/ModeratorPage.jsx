import { useEffect, useState } from "react";
import { deletePostAsModerator, getReportedPosts } from "../api/moderator";

const ModeratorPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

    const handleDelete = async (postId) => {
        if (!window.confirm("Delete this post? All conversations and reports will also be removed.")) return;

        try {
            await deletePostAsModerator(postId);
            loadReports(); // refresh moderator page
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete post.");
        }
    };

  useEffect(() => {
    getReportedPosts()
      .then(res => {
        setReports(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load reports:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-10 text-center text-xl">Loading reports...</div>;
  }

  if (reports.length === 0) {
    return (
      <div className="p-10 text-center text-lg text-gray-600">
        No reported posts found.
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Reported Posts</h1>

      <div className="space-y-6">
        {reports.map((report) => (
          <div
            key={report.reportId}
            className="bg-white shadow-md border rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold">{report.title}</h2>

            <p className="text-gray-600 text-sm mb-2">
              Post ID: {report.postId}
            </p>

            <p className="text-gray-700">
              <strong>Owner:</strong> {report.ownerUsername}
            </p>

            <p className="mt-3">
              <strong className="text-red-600">Reason:</strong>{" "}
              {report.reason}
            </p>

            {report.details && (
              <p className="mt-1 text-gray-700">
                <strong>Details:</strong> {report.details}
              </p>
            )}

            <p className="text-gray-500 text-sm mt-2">
              Reported at: {report.reportedAt}
            </p>

            <button
                onClick={() => handleDelete(report.postId)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                Delete Post
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorPage;