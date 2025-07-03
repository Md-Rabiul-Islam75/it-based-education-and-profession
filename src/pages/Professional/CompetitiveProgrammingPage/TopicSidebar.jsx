import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const TopicSidebar = () => {
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const navigate = useNavigate();
 

  const location = useLocation();
  const competitiveProgramming = location.state?.competitiveProgramming;

  // console.log("competitiveProgramming",competitiveProgramming);

  // useEffect(() => {
    
  //   fetchTopics();

    
  // }, []);

  useEffect(() => {
  if (competitiveProgramming) {
    fetchTopics();
  }
}, [competitiveProgramming]);

  //  useEffect(() => {
  //   if (competitiveProgramming) {
  //     fetchTopics();
  //   }
  // }, [competitiveProgramming]);

  const fetchTopics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8082/api/topic/getalltopic?FeatureName=${competitiveProgramming}`
      );
      //const data = res.data.responseData;
      const data = res.data.responseData?.TopicList;
      
      setTopics(Array.isArray(data) ? data : []);
      console.log("Fetched topics:", data);
      //setTopics(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      await axios.post("http://localhost:8082/api/topic/addnewtopic", {
        topicName: newTopic,
        topicDescribtion: newDescription,
        featureName:competitiveProgramming
      });
      setNewTopic("");
      setNewDescription("");
      fetchTopics();
    } catch (err) {
      console.error("Error adding topic:", err);
    }
  };

  return (
    <div className="w-64 p-4 bg-gray-100 shadow rounded h-fit">
      <h2 className="text-xl font-bold mb-4">Topics</h2>
      <div className="space-y-2">
        <input
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Add topic"
        /> <br />
        <input
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="input input-bordered w-full"
          placeholder="Description"
        />

        <button onClick={handleAddTopic} className="btn btn-primary">
          Add
        </button>
      </div>

     <div className="font-bold text-xl my-1">Set of Topics</div>

      <ul className="space-y-2 mt-2">
        {topics.map((topic) => (
          <li key={topic.id}>
            <NavLink
               to={`topic/${topic.id}`}
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              {topic.topicName}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicSidebar;
