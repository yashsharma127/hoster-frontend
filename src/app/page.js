"use client"
import { useState } from 'react';

export default function Home() {
  const [githubUrl, setGithubUrl] = useState('');
  const [hostname, setHostname] = useState('');
  const [logs, setLogs] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateHostname = () => {
    if (!githubUrl) {
      alert('Please enter a GitHub URL');
      return;
    }

    setIsGenerating(true);
    const randomString = Math.random().toString(36).substring(2, 8);
    const generatedHostname = `hoster-${randomString}.com`;
    setHostname(generatedHostname);

    // Simulate log generation with delays
    const logMessages = [
      { message: "Initiated creating Docker image of project...", status: "in-progress" },
      { message: "Pushed to AWS ECR...", status: "in-progress" },
      { message: "Added to AWS ECS...", status: "in-progress" },
      { message: "Building the project in the container...", status: "in-progress" },
      { message: "Successfully built.", status: "success" },
      { message: "Storing the build artifacts in S3...", status: "in-progress" },
      { message: "Successfully stored the build artifacts.", status: "success" },
      { message: "Linking hostname to build artifacts...", status: "in-progress" },
      { message: "Successfully hosted.", status: "success" }
    ];

    let logIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < logMessages.length) {
        setLogs((prevLogs) => [...prevLogs, logMessages[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);  
      }
    }, 1500);  
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white py-8">
      <h1 className="text-6xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-purple-600 to-blue-600 mb-6">Hoster</h1>
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-lg shadow-xl glow-card">
        <p className="text-gray-400 text-center mb-4">
          Enter your GitHub URL to generate a random hosting URL.
        </p>
        <input
          type="text"
          placeholder="Enter GitHub URL"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 mb-4 bg-gray-700 text-white"
        />
        <button
          onClick={handleGenerateHostname}
          className={`w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate Hostname'}
        </button>
        {hostname && (
          <p className="mt-4 text-center text-green-400 font-semibold">
            Your hostname: <span className="text-gray-200">{hostname}</span>
          </p>
        )}
      </div>

      {/* Logs Section */}
      <div className="mt-6 max-w-lg w-full bg-gray-800 p-4 rounded-lg shadow-xl glow-card">
        <h2 className="text-xl font-semibold text-gray-300 mb-4">Logs</h2>
        <div className="space-y-2">
          {logs.length > 0 ? (
            logs.map((log, index) => (
              log && log.message ? (
                <div key={index} className={`text-sm ${log.status === 'success' ? 'text-green-400' : 'text-gray-400'} font-mono`}>
                  {log.status === 'success' ? (
                    <span className="mr-2 text-green-500">✔️</span>
                  ) : (
                    <span className="mr-2">...</span>
                  )}
                  {log.message}
                </div>
              ) : null
            ))
          ) : (
            <div className="text-gray-500 text-sm font-mono">No logs yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
