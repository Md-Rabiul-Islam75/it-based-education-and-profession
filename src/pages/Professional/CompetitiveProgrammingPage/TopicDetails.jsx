import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import TopicDetailsComponent from '../../../Components/TopicDetails/TopicDetailsComponent';

const TopicDetails = () => {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [problems, setProblems] = useState([]);
  const [contests, setContests] = useState([]);
   const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);

  

  const fetchTopic = async () => {
    try {
      const res = await axios.get(`http://localhost:8082/api/topic/gettopicbyid?TopicId=${id}`);
      const topicData = res.data.responseData?.Topic?.[0];
      setSelectedTopicDetails(res);
      console.log("topck",topicData)
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

    

    <TopicDetailsComponent topicData={topic} />
  );
};

export default TopicDetails;
