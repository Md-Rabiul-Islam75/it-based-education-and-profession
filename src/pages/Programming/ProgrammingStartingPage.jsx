import React from "react";
import pic1 from "../../assets/ProblemSolving.webp";
import pic2 from "../../assets/CP.webp";
import pic3 from "../../assets/images/mock_interview.avif";
import { Link } from "react-router-dom";

const cardData = [
  {
    title: "Problem Solving",
    img: pic1,
    text: `"Competitive programming turns problems into puzzles, where every bug is a clue, every constraint a challenge, and every solution a triumph of logic, patience, and persistence."`,
    link: "/problemSolvingPage",
    state: { category: "Problem_Solving" },
  },
  {
    title: "Competitive Programming",
    img: pic2,
    text: `"Master the art of code battles. Build logic, speed, and accuracy through challenges that push your limits."`,
    link: "/competitiveProgrammingPage",
    state: { competitiveProgramming: "Competitive_Programming" },
  },
  {
    title: "Mock Interview",
    img: pic3,
    text: `"Mock Interviews turn a normal person into a confident professional. Practice makes perfect."`,
    link: "/mockInterviewForm",
  },
  {
    title: "Job Site",
    img: pic1,
    text: `"Find the right opportunity. Track jobs, prepare smart, and land your dream role."`,
    link: "/jobSite",
  },
  {
    title: "Make Your Resume",
    img: pic2,
    text: `"Build a resume that gets noticed. Showcase your strengths with clean, impactful design."`,
    link: "/resumeBuilder",
  },
];

const ProgrammingStartingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white shadow-xl rounded-lg overflow-hidden 
                     hover:shadow-2xl transition duration-300 group
                     transform hover:-translate-y-2"
        >
          <div className="h-56 overflow-hidden">
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover 
                         group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4 flex flex-col justify-between h-60">
            <h2 className="text-xl font-bold text-indigo-700 mb-2">{card.title}</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">{card.text}</p>
            <div className="mt-auto">
              <Link
                to={card.link}
                state={card.state}
                className="inline-block bg-indigo-600 text-white px-4 py-2 rounded 
                           hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgrammingStartingPage;
