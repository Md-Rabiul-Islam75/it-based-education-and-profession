import React, { useState } from "react";

const TopicDetailsComponent = ({ topicData }) => {
  const [showProblemModal, setShowProblemModal] = useState(false);
  const [showContestModal, setShowContestModal] = useState(false);

  const [newProblem, setNewProblem] = useState({
    problemName: "",
    problemLink: "",
    difficultyLevel: "",
    platform: "",
  });

  const [newContest, setNewContest] = useState({
    contestName: "",
    contestLink: "",
    platform: "",
  });

  const handleProblemSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/topic/addnewproblem?TopicId=${topicData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProblem),
      });

      if (res.ok) {
        alert("Problem added successfully!");
        setShowProblemModal(false);
        window.location.reload(); // or call a refresh function
      } else {
        alert("Failed to add problem.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleContestSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:8082/api/topic/addnewcontest?TopicId=${topicData.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContest),
      });

      if (res.ok) {
        alert("Contest added successfully!");
        setShowContestModal(false);
        window.location.reload();
      } else {
        alert("Failed to add contest.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{topicData.topicName}</h1>
      <p className="text-gray-600 mb-4">{topicData.topicDescribtion}</p>

      {/* Problems */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-blue-700">Problems</h2>
        <button
          onClick={() => setShowProblemModal(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Add New Problem
        </button>
      </div>
      <table className="min-w-full mb-6 border border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="px-4 py-2 border">S/N</th>
            <th className="px-4 py-2 border">Problem Name</th>
            <th className="px-4 py-2 border">Link</th>
            <th className="px-4 py-2 border">Difficulty</th>
            <th className="px-4 py-2 border">Platform</th>
          </tr>
        </thead>
        <tbody>
          {topicData.problems.map((problem, index) => (
            <tr key={problem.id}>
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{problem.problemName}</td>
              <td className="px-4 py-2 border text-blue-600 underline">
                <a href={problem.problemLink} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="px-4 py-2 border text-center">{problem.difficultyLevel}</td>
              <td className="px-4 py-2 border text-center">{problem.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Contests */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-green-700">Contests</h2>
        <button
          onClick={() => setShowContestModal(true)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add New Contest
        </button>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-green-100">
          <tr>
            <th className="px-4 py-2 border">S/N</th>
            <th className="px-4 py-2 border">Contest Name</th>
            <th className="px-4 py-2 border">Link</th>
            <th className="px-4 py-2 border">Platform</th>
          </tr>
        </thead>
        <tbody>
          {topicData.contests.map((contest, index) => (
            <tr key={contest.id}>
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{contest.contestName}</td>
              <td className="px-4 py-2 border text-blue-600 underline">
                <a href={contest.contestLink} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="px-4 py-2 border text-center">{contest.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Problem Modal */}
      {showProblemModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Problem</h3>
            <input
              type="text"
              placeholder="Problem Name"
              className="w-full border p-2 mb-2"
              value={newProblem.problemName}
              onChange={(e) => setNewProblem({ ...newProblem, problemName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Problem Link"
              className="w-full border p-2 mb-2"
              value={newProblem.problemLink}
              onChange={(e) => setNewProblem({ ...newProblem, problemLink: e.target.value })}
            />
            <input
              type="text"
              placeholder="Difficulty Level"
              className="w-full border p-2 mb-2"
              value={newProblem.difficultyLevel}
              onChange={(e) => setNewProblem({ ...newProblem, difficultyLevel: e.target.value })}
            />
            <input
              type="text"
              placeholder="Platform"
              className="w-full border p-2 mb-4"
              value={newProblem.platform}
              onChange={(e) => setNewProblem({ ...newProblem, platform: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowProblemModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={handleProblemSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Contest Modal */}
      {showContestModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New Contest</h3>
            <input
              type="text"
              placeholder="Contest Name"
              className="w-full border p-2 mb-2"
              value={newContest.contestName}
              onChange={(e) => setNewContest({ ...newContest, contestName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contest Link"
              className="w-full border p-2 mb-2"
              value={newContest.contestLink}
              onChange={(e) => setNewContest({ ...newContest, contestLink: e.target.value })}
            />
            <input
              type="text"
              placeholder="Platform"
              className="w-full border p-2 mb-4"
              value={newContest.platform}
              onChange={(e) => setNewContest({ ...newContest, platform: e.target.value })}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowContestModal(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              <button onClick={handleContestSubmit} className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicDetailsComponent;
