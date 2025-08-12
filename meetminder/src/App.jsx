import { useState } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  ClipboardList,
  LogOut,
  UserPlus,
  LogIn,
  Calendar,
  Loader2
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  const sampleMeetings = [
    {
      id: 1,
      title: "Project Kickoff",
      date: "Aug 1, 2025",
      keyPoints: [
        "Scope of work confirmed with all stakeholders",
        "Timeline approved for a 3-month rollout",
        "Roles and responsibilities assigned"
      ],
      actions: [
        "Prepare detailed project plan by Aug 5",
        "Set up Jira board and assign tasks"
      ]
    },
    {
      id: 2,
      title: "Client Review",
      date: "July 20, 2025",
      keyPoints: [
        "Client approved design mockups",
        "Minor UI changes requested for mobile layout",
        "Performance optimization suggested"
      ],
      actions: [
        "Update mockups by July 25",
        "Schedule next review for Aug 3"
      ]
    }
  ];

  const handleAuthSubmit = () => {
    setIsLoggedIn(true);
  };

  const handleMockProcess = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSelectedMeeting({
        title: "Uploaded Meeting",
        date: "Today",
        keyPoints: [
          "Budget discussion finalized",
          "New feature list approved",
          "Deadline extended by 2 weeks"
        ],
        actions: [
          "Prepare updated Gantt chart",
          "Share updated budget sheet with finance team"
        ]
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {!isLoggedIn ? (
        <div className="flex flex-1 justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-black p-8 rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-black p-2 rounded-full">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-wide">MeetMinder</h1>
            </div>
            <h2 className="text-xl font-semibold mb-4">
              {authMode === "login" ? "Login" : authMode === "signup" ? "Sign Up" : "Forgot Password"}
            </h2>
            {authMode !== "forgot" && (
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded mb-3 bg-gray-100"
              />
            )}
            {authMode !== "forgot" && (
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded mb-3 bg-gray-100"
              />
            )}
            {authMode === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded mb-3 bg-gray-100"
              />
            )}
            {authMode === "forgot" && (
              <input
                type="email"
                placeholder="Enter your registered email"
                className="w-full p-2 border rounded mb-3 bg-gray-100"
              />
            )}
            <button
              onClick={handleAuthSubmit}
              className="w-full bg-black text-white p-2 rounded hover:bg-black/80"
            >
              {authMode === "login" && "Login"}
              {authMode === "signup" && "Create Account"}
              {authMode === "forgot" && "Reset Password"}
            </button>
            <div className="text-sm text-center space-y-1 mt-4">
              {authMode !== "login" && (
                <p
                  onClick={() => setAuthMode("login")}
                  className="cursor-pointer hover:underline"
                >
                  Back to Login
                </p>
              )}
              {authMode === "login" && (
                <p
                  onClick={() => setAuthMode("signup")}
                  className="cursor-pointer hover:underline"
                >
                  Don't have an account? Sign Up
                </p>
              )}
              {authMode === "login" && (
                <p
                  onClick={() => setAuthMode("forgot")}
                  className="cursor-pointer hover:underline"
                >
                  Forgot Password?
                </p>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Sidebar */}
          <div className="w-64 bg-white text-black flex flex-col p-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-black p-2 rounded-full">
                <Calendar className="text-white w-6 h-6" />
              </div>
              <h1 className="text-lg font-bold">MeetMinder</h1>
            </div>
            <button
              onClick={() => {
                setFileName("");
                setSelectedMeeting(null);
              }}
              className="bg-black text-white p-2 rounded hover:bg-black/80 flex items-center gap-2 mb-4"
            >
              <Upload className="w-4 h-4" /> New Meeting
            </button>
            <h2 className="font-semibold mb-2">Past Meetings</h2>
            <div className="flex flex-col gap-2">
              {sampleMeetings.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMeeting(m)}
                  className="p-2 rounded hover:bg-gray-200 cursor-pointer"
                >
                  <p className="font-medium">{m.title}</p>
                  <p className="text-xs text-gray-600">{m.date}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-red-600 flex items-center gap-2 mt-6"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white text-black rounded-2xl shadow-xl p-6"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                <Upload className="text-black" /> Upload Audio/Video
              </h2>
              <input
                type="file"
                accept="audio/*,video/*"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
                className="cursor-pointer mb-3"
              />
              {fileName && <p className="text-sm mb-3">Selected: {fileName}</p>}
              <button
                className="bg-black text-white p-2 rounded hover:bg-black/80 w-full"
                onClick={handleMockProcess}
                disabled={loading}
              >
                {loading ? "Processing..." : "Process with AI"}
              </button>
              {loading && (
                <div className="flex justify-center mt-4">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              )}
            </motion.div>

            {selectedMeeting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-white text-black rounded-2xl shadow-xl p-6 flex-1"
              >
                <h2 className="flex items-center gap-2 text-lg font-bold mb-4">
                  <FileText className="text-black" /> {selectedMeeting.title} –{" "}
                  {selectedMeeting.date}
                </h2>
                <section className="mb-4">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <ClipboardList className="text-black" /> Key Points
                  </h3>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-1">
                    {selectedMeeting.keyPoints.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 font-semibold">
                    Action Items
                  </h3>
                  <ul className="list-decimal list-inside text-sm text-gray-800 space-y-1">
                    {selectedMeeting.actions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </section>
              </motion.div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

