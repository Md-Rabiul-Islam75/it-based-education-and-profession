import React from "react";
import { Link, useLocation } from "react-router";
import lab_pic from "../../assets/pexels-lab-laptops.jpg";

const LabManualDayContainer = () => {
  const location = useLocation();
  const labName = location.state?.subjectName || "Unknown Subject";
  console.log(labName);

  // Sample data (12 cards)
  const cards = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Day ${index + 1}`,
    description: `Course Title: ${labName}`,
    image: `${lab_pic}`,
  }));

  //   const handleLabTask = (id) => {
  //     console.log(id);

  //     fetch("http://localhost:8080/api/ctSubject/post", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(newSub),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("user created to db", data);
  //       });
  //   };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cards.map((card) => (
        <div key={card.id} className="card bg-base-100 shadow-sm border">
          <figure className="px-10 pt-10">
            <img src={card.image} alt="Card" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{card.title}</h2>
            <p className="font-bold">{card.description}</p>
            <div className="card-actions">
              <Link
                to="/labOfToday"
                state={{ labName: labName, dayId: card.id }}
              >
                <button className="btn btn-primary">Start Now</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabManualDayContainer;
