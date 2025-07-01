import React from "react";
import pic1 from "../../assets/ProblemSolving.webp";
import pic2 from "../../assets/CP.webp";
import pic3 from "../../assets/images/mock_interview.avif"
import { Link } from "react-router";

const ProgrammingStartingPage = () => {
  return (
    <div className="grid grid-cols-1 w-3/4 mx-auto md:grid-cols-5 gap-4 my-4">
      <div>
        <div className="card bg-base-100 image-full w-65  h-[580px] shadow-sm">
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
              <Link to={"/problemSolvingPage"} state={{category:"Problem_Solving"}} className="btn btn-primary">Explore Now</Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card bg-base-100 image-full w-78 h-[580px] shadow-sm">
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
              <Link to={"/competitiveProgrammingPage"} className="btn btn-primary">Explore Now</Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card bg-base-100 image-full w-78 h-[580px] shadow-sm">
          <figure>
            <img src={pic3} alt="Card" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Mock Interview</h2>
            <p className="text-xs font-bold">
              Mock Interview turns a normal person into a professional person.
            </p>
            <div className="card-actions justify-end">
              <Link to={"/mockInterviewForm"} className="btn btn-primary">Explore Now</Link>
            </div>
          </div>
        </div>
      </div>

       <div>
        <div className="card bg-base-100 image-full w-78 h-[580px] shadow-sm">
          <figure>
            <img src={pic1} alt="Card" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Job Site</h2>
            <p className="text-xs font-bold">
              Mock Interview turns a normal person into a professional person.
            </p>
            <div className="card-actions justify-end">
              <Link to={"/jobSite"} className="btn btn-primary">Explore Now</Link>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card bg-base-100 image-full w-78 h-[580px] shadow-sm">
          <figure>
            <img src={pic2} alt="Card" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Make Your Rusume</h2>
            <p className="text-xs font-bold">
              
            </p>
            <div className="card-actions justify-end">
              <Link to={"/resumeBuilder"} className="btn btn-primary">Explore Now</Link>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default ProgrammingStartingPage;
