import React from "react";
import { Link } from "react-router-dom"; // ✅ Correct import
import pic1 from "../../assets/ProblemSolving.webp";
import pic2 from "../../assets/CP.webp";
import pic3 from "../../assets/images/mock_interview.avif";

const cardData = [
  {
    title: "Problem Solving",
    image: pic1,
    description:
      "Turn problems into puzzles and every bug into a clue. Embrace logic, patience, and persistence.",
    link: "/problemSolvingPage",
    state: { category: "Problem_Solving" },
  },
  {
    title: "Competitive Programming",
    image: pic2,
    description:
      "Challenge yourself with algorithms and data structures in a competitive playground of logic and speed.",
    link: "/competitiveProgrammingPage",
    state: {competitiveProgramming: "Competitive_Programming"}
  },
  {
    title: "Mock Interview",
    image: pic3,
    description:
      "Step into a real interview environment. Build confidence and polish your communication and problem-solving skills.",
    link: "/mockInterviewForm",
  },
  {
    title: "Job Site",
    image: pic1,
    description:
      "Find your dream job. Explore job opportunities tailored to tech professionals and fresh graduates.",
    link: "/jobSite",
  },
  {
    title: "Make Your Resume",
    image: pic2,
    description:
      "Craft a professional resume with ease. Highlight your skills, experience, and achievements.",
    link: "/resumeBuilder",
  },
];

const ProgrammingStartingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
         Elevate Your Professional Journey
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 group-hover:bg-opacity-70 transition duration-300"></div>
            <div className="absolute bottom-0 p-5 text-white">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-sm mb-4">{card.description}</p>
              <Link
                to={card.link}
                state={card.state}
                className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-md transition duration-300"
              >
                Explore Now →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgrammingStartingPage;
