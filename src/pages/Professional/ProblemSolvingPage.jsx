import React, { useState } from "react";

const ProblemSolvingPage = () => {
  

  const [activeSection, setActiveSection] = useState("firstYear");

  const renderSection = () => {
    switch (activeSection) {
      case "firstYear":
        return (
          <div>
            <h2 className="font-bold text-lg mb-4">First Year Problem Section</h2>
          </div>
        );
      case "secondYear":
        return (
          <div>
            <h2 className="font-bold text-lg mb-4">Second Year Problem Section</h2>
          </div>
        );
      case "thirdYear":
        return (
          <div>
            <h2 className="font-bold text-lg mb-4">Third Year Problem Section</h2>
          </div>
        );
      case "fourthYear":
        return (
          <div>
            <h2 className="font-bold text-lg mb-4">Fourth Year Problem Section</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row p-4">
      {/* Sidebar */}
      <div className="lg:w-1/4 border-r pr-4">
        <h2 className="text-xl font-semibold mb-4">Select Year Section</h2>
        <button
          className={`btn w-full mb-2 ${activeSection === "firstYear" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSection("firstYear")}
        >
          First Year
        </button>
        <button
          className={`btn w-full mb-2 ${activeSection === "secondYear" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSection("secondYear")}
        >
          Second Year
        </button>
        <button
          className={`btn w-full mb-2 ${activeSection === "thirdYear" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSection("thirdYear")}
        >
          Third Year
        </button>
        <button
          className={`btn w-full mb-2 ${activeSection === "fourthYear" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setActiveSection("fourthYear")}
        >
          Fourth Year
        </button>
      </div>

      {/* Main Content */}
      <div className="lg:w-3/4 mt-4 lg:mt-0 lg:pl-4">
        
        {renderSection()}
      </div>
    </div>
  );
};

export default ProblemSolvingPage;
