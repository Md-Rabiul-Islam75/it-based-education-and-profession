import React from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ProblemListAndContestListComponent = ({ topic, refreshTopic }) => {
  const {
    topicId,
    topicName,
    topicDescribtion,
    problems = [],
    contests = [],
  } = topic;

  const handleAddProblem = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Problem",
      html:
        '<input id="problemName" class="swal2-input" placeholder="Problem Name">' +
        '<input id="problemLink" class="swal2-input" placeholder="Problem Link">' +
        '<input id="difficultyLevel" class="swal2-input" placeholder="Difficulty Level">' +
        '<input id="platform" class="swal2-input" placeholder="Platform">',
      focusConfirm: false,
      preConfirm: () => {
        const problemName = document.getElementById("problemName").value.trim();
        const problemLink = document.getElementById("problemLink").value.trim();
        const difficultyLevel = document.getElementById("difficultyLevel").value.trim();
        const platform = document.getElementById("platform").value.trim();

        if (!problemName || !problemLink || !difficultyLevel || !platform) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }

        return { problemName, problemLink, difficultyLevel, platform };
      },
    });

    if (formValues) {
      try {
        await axios.post(
          `http://localhost:8082/api/topic/addnewproblem?TopicId=${topicId}`,
          formValues
        );
        Swal.fire("Success", "Problem added successfully!", "success");
        refreshTopic();
      } catch (err) {
        Swal.fire("Error", "Failed to add problem.", "error");
      }
    }
  };

  const handleAddContest = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add New Contest",
      html:
        '<input id="contestName" class="swal2-input" placeholder="Contest Name">' +
        '<input id="contestLink" class="swal2-input" placeholder="Contest Link">' +
        '<input id="difficultyLevel" class="swal2-input" placeholder="Difficulty Level">' +
        '<input id="platform" class="swal2-input" placeholder="Platform">',
      focusConfirm: false,
      preConfirm: () => {
        const contestName = document.getElementById("contestName").value.trim();
        const contestLink = document.getElementById("contestLink").value.trim();
        const difficultyLevel = document.getElementById("difficultyLevel").value.trim();
        const platform = document.getElementById("platform").value.trim();

        if (!contestName || !contestLink || !difficultyLevel || !platform) {
          Swal.showValidationMessage("All fields are required!");
          return false;
        }

        return { contestName, contestLink, difficultyLevel, platform };
      },
    });

    if (formValues) {
      try {
        await axios.post(
          `http://localhost:8082/api/topic/addnewcontest?TopicId=${topicId}`,
          formValues
        );
        Swal.fire("Success", "Contest added successfully!", "success");
        refreshTopic();
      } catch (err) {
        Swal.fire("Error", "Failed to add contest.", "error");
      }
    }
  };

  return (
    <div className="p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">{topicName}</h1>
      <p className="text-gray-600 mb-4">{topicDescribtion}</p>

      {/* Problems */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-blue-700">Problems</h2>
        <button
          onClick={handleAddProblem}
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
          {problems.map((problem, index) => (
            <tr key={problem.id}>
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{problem.problemName}</td>
              <td className="px-4 py-2 border text-blue-600 underline text-center">
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
          onClick={handleAddContest}
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
            <th className="px-4 py-2 border">Difficulty</th>
            <th className="px-4 py-2 border">Platform</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={contest.id}>
              <td className="px-4 py-2 border text-center">{index + 1}</td>
              <td className="px-4 py-2 border">{contest.contestName}</td>
              <td className="px-4 py-2 border text-blue-600 underline text-center">
                <a href={contest.contestLink} target="_blank" rel="noopener noreferrer">View</a>
              </td>
              <td className="px-4 py-2 border text-center">{contest.difficultyLevel}</td>
              <td className="px-4 py-2 border text-center">{contest.platform}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemListAndContestListComponent;
