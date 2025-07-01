import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopicService } from "../../service/topicService";

const ProblemSolvingPage = () => {
  const [activeSection, setActiveSection] = useState("firstYear");
  const [topicsByYear, setTopicsByYear] = useState({});
  const [expandedYear, setExpandedYear] = useState(null);
  const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const category = location.state?.category;

  const [formData, setFormData] = useState({
    topicName: "",
    topicDescribtion: "",
    semester: "firstYear",
    featureName: category,
  });

  const fetchTopics = async (year) => {
    try {
      const res = await TopicService.getTopicsByYear(year, category);
      setTopicsByYear((prev) => ({
        ...prev,
        [year]: res,
      }));
    } catch (err) {
      console.error("Error fetching topics:", err);
    }
  };

  const handleYearClick = async (year) => {
    setActiveSection(year);
    setSelectedTopicDetails(null);
    if (!topicsByYear[year]) {
      await fetchTopics(year);
    }
    setExpandedYear((prev) => (prev === year ? null : year));
  };

  const handleTopicClick = async (topicId) => {
    try {
      const res = await TopicService.getTopicById(topicId);
      
      setSelectedTopicDetails(res);
     
      console.log("Get By topic Id res =",res);
    } catch (err) {
      console.error("Error fetching topic details:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      topicName: "",
      topicDescribtion: "",
      semester: "firstYear",
      featureName: category,
    });
    setShowModal(false);
  };

  const handleSubmit = async () => {
    try {
      await TopicService.addTopic(formData);
      setShowModal(false);
      await fetchTopics(formData.semester); // refresh after add
    } catch (error) {
      console.error("Failed to add topic:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      {/* Sidebar */}
      <div className="lg:w-1/4 border-r pr-4">
        <h2 className="text-xl font-semibold mb-4">Select Year Section</h2>

        <button
          className="btn btn-accent w-full mb-4"
          onClick={() => setShowModal(true)}
        >
          ➕ Add New Topic
        </button>

        {["firstYear", "secondYear", "thirdYear", "fourthYear"].map((year) => (
          <div key={year}>
            <button
              className={`btn w-full mb-1 ${
                activeSection === year ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => handleYearClick(year)}
            >
              {year.replace("Year", " Year")}
            </button>

            {expandedYear === year && (
              <ul className="ml-4 mb-4 space-y-1">
                {topicsByYear[year]?.length > 0 ? (
                  topicsByYear[year].map((topic) => (
                    <li
                      key={topic.id}
                      // className=" cursor-pointer "
                      className="bg-white rounded-xl shadow-md p-4 mb-3 hover:bg-blue-100 transition-all duration-300 ease-in-out cursor-pointer text-gray-800 font-medium border border-gray-200 hover:scale-105 active:bg-blue-200"
                      onClick={() => handleTopicClick(topic.id)}
                    >
                      {topic.topicName}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">No topics available</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Right Side */}
<div className="lg:w-3/4 mt-4 lg:mt-0 lg:pl-4">

  {selectedTopicDetails ? (
   
    <div className="p-6 border rounded-lg shadow-lg bg-white space-y-6">
      {/* Topic Header */}
      <div>
       
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">
          {selectedTopicDetails.topicName}
        </h2>
        <p className="text-gray-600 text-lg">{selectedTopicDetails.topicDescribtion}</p>
      </div>

      {/* Problem List */}
      <div>
        <h3 className="text-2xl font-semibold text-blue-600 mb-3">Problem List</h3>
        {selectedTopicDetails.problems.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {selectedTopicDetails.problems.map((problem) => (
              <div key={problem.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
                <a
                  href={problem.problemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-700 hover:underline"
                >
                  {problem.problemName}
                </a>
                <p className="text-sm text-gray-600">
                  Difficulty: <span className="font-medium">{problem.difficultyLevel}</span>
                </p>
                <p className="text-sm text-gray-500">Platform: {problem.platform}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No problems available.</p>
        )}
      </div>

      {/* Contest List */}
      <div>
        <h3 className="text-2xl font-semibold text-green-600 mb-3">Contest List</h3>
        {selectedTopicDetails.contests.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {selectedTopicDetails.contests.map((contest) => (
              <div key={contest.id} className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
                <a
                  href={contest.contestLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-green-700 hover:underline"
                >
                  {contest.contestName}
                </a>
                <p className="text-sm text-gray-500">Platform: {contest.platform}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No contests available.</p>
        )}
      </div>
    </div>
  ) : (
    <p className="text-gray-500">Select a topic to view details.</p>
  )}
</div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-bold mb-4">Add New Topic</h2>

            <label className="block mb-2">
              Topic Name:
              <input
                type="text"
                name="topicName"
                value={formData.topicName}
                onChange={handleInputChange}
                className="input input-bordered w-full mt-1"
                required
              />
            </label>

            <label className="block mb-2">
              Topic Description:
              <textarea
                name="topicDescribtion"
                value={formData.topicDescribtion}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full mt-1"
                required
              ></textarea>
            </label>

            <label className="block mb-4">
              Year:
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                className="select select-bordered w-full mt-1"
              >
                <option value="firstYear">First Year</option>
                <option value="secondYear">Second Year</option>
                <option value="thirdYear">Third Year</option>
                <option value="fourthYear">Fourth Year</option>
              </select>
            </label>

            <div className="flex justify-between">
              <button className="btn btn-outline" onClick={handleClear}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Add Topic
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemSolvingPage;
