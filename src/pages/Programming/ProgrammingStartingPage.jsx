import React from "react";
import pic1 from "../../assets/ProblemSolving.webp";
import pic2 from "../../assets/CP.webp";

const ProgrammingStartingPage = () => {
  return (
    <div className="flex gap-4 my-4 w-1/2 mx-auto">
      <div>
        <div className="card bg-base-100 image-full w-96  h-[580px] shadow-sm">
          <figure>
            <img src={pic1} alt="Card" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Problem Solving</h2>
            <p className="text-xs font-bold">
              Competitive programming turns problems into puzzles, where every
              bug is a clue, every constraint a challenge, and every solution a
              triumph of logic, patience, and persistence." Would you like it to
              be more motivational, poetic, or technical in tone?
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Explore Now</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card bg-base-100 image-full w-96 h-[580px] shadow-sm">
          <figure>
            <img src={pic2} alt="Card" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Competitive Programming</h2>
            <p className="text-xs font-bold">
              Competitive programming turns problems into puzzles, where every
              bug is a clue, every constraint a challenge, and every solution a
              triumph of logic, patience, and persistence." Would you like it to
              be more motivational, poetic, or technical in tone?
            </p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Explore Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingStartingPage;
