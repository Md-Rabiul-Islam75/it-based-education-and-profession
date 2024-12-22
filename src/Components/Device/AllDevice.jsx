import React from "react";
import { Link } from "react-router";

const AllDevice = () => {
  return (
    <div className="py-3 w-11/12 mx-auto">
      {/* <h2 className='text-center font-semibold'>Choose Your Best Gadget Here. We Are Here For You.</h2>
            <div className='flex justify-evenly py-5'>
           
            <Link className='bg-green-500 w-1/4 p-5 text-center rounded-sm'>Desctop</Link>
            <Link className='bg-green-500 w-1/4 p-5 text-center rounded-sm'>Laptop</Link>
            </div> */}
      <h1 className="font-bold my-3 text-center">Laptop Vs Desctop</h1>
      

      <div className="collapse collapse-arrow bg-lime-400 my-3">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium">
        Why We Choose Laptop over Desctop?
        </div>
        <div className="collapse-content">
          <p>Student do a lot of lab work. It is easy to carry a laptop than
          desctop.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-lime-400 my-3">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
         Minimum requirement of choosing a Laptop.
        </div>
        <div className="collapse-content">
          <p>SSD: </p><br />
          <p>RAM: </p><br />
          <p>BATTERY: </p><br />
          <p>PROCESSORS: </p><br />
          <p>Core: </p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-lime-400">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">
         Money Problem!! Cannot buy new Laptop? Way of improving your Laptop?
        </div>
        <div className="collapse-content">
          <p>Add SSD etc....</p>
        </div>
      </div>
    </div>
  );
};

export default AllDevice;
