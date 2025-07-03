import React from "react";
import { Link } from "react-router";

const cardData = [
  { title: "Courses", link: "/academic" },
  { title: "Ct Questions", link: "/allCtQuestionPage" },
  { title: "Previous Year Questions", link: "#" }, // Add actual route if available
  { title: "Lab Manual", link: "/allLabSubject" },
];

const EntireAcademicTopicListPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out p-6 flex flex-col justify-between"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">
                {card.title}
              </h2>
            </div>
            <div className="flex justify-center">
              <Link
                to={card.link}
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                See Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntireAcademicTopicListPage;
