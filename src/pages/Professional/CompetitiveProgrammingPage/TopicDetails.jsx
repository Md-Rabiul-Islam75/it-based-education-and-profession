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
      const res = await axios.get(
        `http://localhost:8082/api/topic/gettopicbyid?TopicId=${id}`
      );
      const topicData = res.data.responseData?.Topic?.[0];
      setSelectedTopicDetails(res);
      console.log("topck",topicData)
      setTopic(topicData);
    } catch (err) {
      console.error("Error fetching topic:", err);
    }
  };

  useEffect(() => {
    fetchTopic();
    
  }, [id]);

  if (!topic) return <p>Loading topic...</p>;

  return (

    

    <TopicDetailsComponent topicData={topic} />
  );
};

export default TopicDetails;
