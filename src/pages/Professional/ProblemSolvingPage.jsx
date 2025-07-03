import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopicService } from "../../service/topicService";
import TopicDetailsComponent from "../../Components/TopicDetails/TopicDetailsComponent";

const ProblemSolvingPage = () => {
  const [activeSection, setActiveSection] = useState("firstYear");
  const [topicsByYear, setTopicsByYear] = useState({});
  const [expandedYear, setExpandedYear] = useState(null);
  const [selectedTopicDetails, setSelectedTopicDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const category = location.state?.category;


  useEffect(() =>{
    

  }, []);

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

      console.log("Get By topic Id res =", res);
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

  useEffect(() => {
  const init = async () => {
    const defaultYear = "firstYear";
    setActiveSection(defaultYear);
    setExpandedYear(defaultYear);

    try {
      const res = await TopicService.getTopicsByYear(defaultYear, category);
      setTopicsByYear((prev) => ({
        ...prev,
        [defaultYear]: res,
      }));

      if (res.length > 0) {
        const firstTopic = res[0];
        const topicDetails = await TopicService.getTopicById(firstTopic.id);
        setSelectedTopicDetails(topicDetails);
      }
    } catch (err) {
      console.error("Error during initial topic fetch:", err);
    }
  };

  if (category) {
    init();
  }
}, [category]);


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
        {selectedTopicDetails && (
          <TopicDetailsComponent topicData={selectedTopicDetails} />
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
