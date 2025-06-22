import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import interview from "../../../src/assets/images/mock_interview.avif"

const StartInterviewForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level: "",
    topicName: "",
    userName: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8082/api/interview/startinterview",
        formData
      );
      const interviewData = res.data.responseData.Interview[0];

      // Navigate to interview page with state
      navigate("/mockInterview", { state: { interviewData, meta: formData } });
    } catch (error) {
      console.error("Start Interview Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex gap-5 p-10 bg-pink-200">
        <img src={interview} className="w-1/2" alt="" />
      <form onSubmit={handleStart} className="p-4 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Start Mock Interview</h2>

        <input
          name="userName"
          placeholder="Your Name"
          value={formData.userName}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
          required
        />

        <input
          name="topicName"
          placeholder="Topic (e.g., Database)"
          value={formData.topicName}
          onChange={handleChange}
          className="input input-bordered w-full mb-2"
          required
        />

        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="select select-bordered w-full mb-4"
          required
        >
          <option value="" disabled>
            Select Level
          </option>
          <option value="Basic">Basic</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <button type="submit" className="btn btn-primary w-full">
          {loading ? "Starting..." : "Start Interview"}
        </button>
      </form>
    </div>
  );
};

export default StartInterviewForm;
