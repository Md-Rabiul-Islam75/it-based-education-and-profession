// src/services/topicService.js
import axios from "axios";

const API_BASE = "http://localhost:8082/api/topic"; // Adjust base path as needed

export const TopicService = {
  addTopic: (topicData) => axios.post(`${API_BASE}/addnewtopic`, topicData),

  getTopicsByYear: (year,category) =>
    axios.get(`${API_BASE}/getalltopic?FeatureName=${category}&Semester=${year}`).then((res) => {
    
      return res.data.responseData.TopicList; // ✅ Adjusted to extract only the topic list
    }),


    getTopicById :(topicId)=>
      axios.get(`${API_BASE}/gettopicbyid?TopicId=${topicId}`).then((res) => {
        return res.data.responseData.Topic;
      }),
};
