import React from "react";
import { Link, useLocation } from "react-router-dom";

const LabManualDayContainer = () => {
  const location = useLocation();
  const labName = location.state?.subjectName || "Unknown Subject";
  console.log(labName);

  const cards = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Day ${index + 1}`,
    description: `${labName}`,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-green-50 to-cyan-100 p-10">
      <h2 className="text-4xl font-extrabold text-center text-cyan-800 mb-12">
        Lab Manual – {labName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white bg-opacity-70 backdrop-blur-md border border-gray-200 
                       rounded-2xl shadow-lg p-6 transform hover:-translate-y-1 hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-xl font-bold text-cyan-700 mb-3 text-center">
              {card.title}
            </h3>
            <p className="text-center text-gray-600 font-medium mb-6">
              {card.description}
            </p>
            <div className="flex justify-center">
              <Link
                to="/labOfToday"
                state={{ labName: labName, dayId: card.id }}
                className="bg-cyan-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-cyan-700 transition"
              >
                Start Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabManualDayContainer;
