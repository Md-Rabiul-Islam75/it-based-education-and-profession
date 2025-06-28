import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TopicDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [contests, setContests] = useState([]);

  const fetchTopic = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/topic/gettopicbyid?TopicId=${id}`);
      const topicData = res.data.responseData?.Topic?.[0];
      setTopic(topicData);
      setProblems(topicData?.problems || []);
      setContests(topicData?.contests || []);
    } catch (err) {
      console.error('Error fetching topic:', err);
    }
  };

  useEffect(() => {
    fetchTopic();
  }, [id]);

 const handleAddProblem = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Add New Problem',
    html:
      '<input id="problemName" class="swal2-input" placeholder="Problem Name">' +
      '<input id="problemLink" class="swal2-input" placeholder="Problem Link">' +
      '<input id="difficultyLevel" class="swal2-input" placeholder="Difficulty Level">' +
      '<input id="platform" class="swal2-input" placeholder="Platform">',
    focusConfirm: false,
    preConfirm: () => {
      const problemName = document.getElementById('problemName').value.trim();
      const problemLink = document.getElementById('problemLink').value.trim();
      const difficultyLevel = document.getElementById('difficultyLevel').value.trim();
      const platform = document.getElementById('platform').value.trim();

      if (!problemName || !problemLink || !difficultyLevel || !platform) {
        Swal.showValidationMessage('All fields are required!');
        return false;
      }

      return { problemName, problemLink, difficultyLevel, platform };
    },
  });

  if (formValues) {
    try {
      await axios.post(
        `http://localhost:8082/api/topic/addnewproblem?TopicId=${id}`,
        formValues
      );
      Swal.fire('Success', 'Problem added successfully!', 'success');
      fetchTopic();
    } catch (err) {
      Swal.fire('Error', 'Failed to add problem.', 'error');
    }
  }
};

const handleAddContest = async () => {
  const { value: formValues } = await Swal.fire({
    title: 'Add New Contest',
    html:
      '<input id="contestName" class="swal2-input" placeholder="Contest Name">' +
      '<input id="contestLink" class="swal2-input" placeholder="Contest Link">' +
      '<input id="difficultyLevel" class="swal2-input" placeholder="Difficulty Level">' +
      '<input id="platform" class="swal2-input" placeholder="Platform">',
    focusConfirm: false,
    preConfirm: () => {
      const contestName = document.getElementById('contestName').value.trim();
      const contestLink = document.getElementById('contestLink').value.trim();
      const difficultyLevel = document.getElementById('difficultyLevel').value.trim();
      const platform = document.getElementById('platform').value.trim();

      if (!contestName || !contestLink || !difficultyLevel || !platform) {
        Swal.showValidationMessage('All fields are required!');
        return false;
      }

      return { contestName, contestLink, difficultyLevel, platform };
    },
  });

  if (formValues) {
    try {
      await axios.post(
        `http://localhost:8082/api/topic/addnewcontest?TopicId=${id}`,
        formValues
      );
      Swal.fire('Success', 'Contest added successfully!', 'success');
      fetchTopic();
    } catch (err) {
      Swal.fire('Error', 'Failed to add contest.', 'error');
    }
  }
};

  if (!topic) return <p>Loading topic...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{topic.topicName}</h2>
      <p className="mt-2 text-gray-700">{topic.topicDescribtion || 'No description provided.'}</p>

      <div className="space-x-2 space-y-2 mt-4">
        <button onClick={handleAddProblem} className="btn btn-primary">
          Add New Problem
        </button>
        <button onClick={handleAddContest} className="btn btn-success">
          Add New Contest
        </button>
      </div>

      {/* Problems */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Problems</h3>
        {problems.length === 0 ? (
          <p className="text-gray-500">No problems available.</p>
        ) : (
          <ul className="space-y-3">
            {problems.map((problem) => (
              <li key={problem.id} className="p-4 bg-black text-white border rounded-lg shadow-lg">
                <a
                  href={problem.problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 font-medium hover:underline"
                >
                  {problem.problemName}
                </a>
                <p className="text-sm">
                  Platform: {problem.platform} | Difficulty: {problem.difficultyLevel}
                </p>
                <p className="text-xs">{problem.remarks}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Contests */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Contests</h3>
        {contests.length === 0 ? (
          <p className="text-gray-500">No contests available.</p>
        ) : (
          <ul className="space-y-3">
            {contests.map((contest) => (
              <li key={contest.id} className="p-4 bg-blue-900 text-white border rounded-lg shadow-lg">
                <a
                  href={contest.contestLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-300 font-medium hover:underline"
                >
                  {contest.contestName}
                </a>
                <p className="text-sm">Platform: {contest.platform}</p>
                <p className="text-xs">{contest.remarks}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopicDetails;
