import React from "react";
import { Link } from "react-router";
import device_one from "../assets/Laptop-vs-desktop.png";
import device_two from "../assets/choosing_laptop.avif";
import device_three from "../assets/overcome.avif";

const AllDevice = () => {
  return (
    <div className="my-5 space-y-5">
      {/* first cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col shadow-2xl gap-5 lg:flex-row space-x-20">
          <div>
            <h1 className="text-5xl font-bold">Laptop VS Desktop</h1>
            <p className="py-6 text-xl">
              We are a passionate team committed to bridging the gap between
              academia and the professional world for Computer Science and
              Engineering (CSE) students. Our platform offers personalized
              resources, expert guidance, and interactive tools to help students
              navigate their academic journey, enhance their technical skills,
              and prepare for successful careers in technology. By combining
              insights from industry professionals and senior students, we aim
              to create a trusted space for learning and growth.
            </p>
          </div>

          <img src={device_one} className="max-w-md rounded-lg" />
        </div>
      </div>

      {/* second cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col-reverse shadow-2xl gap-5 lg:flex-row space-x-20">
          <img src={device_two} className="max-w-md w-full rounded-lg" />

          <div className="space-y-4">
            <h1 className="text-5xl font-bold">Minimum Requirement</h1>
            <div className="overflow-x-auto">
              <table className="table border border-gray-500 border-collapse w-full">
                <thead>
                  <tr className="bg-gray-200 border-b text-xl">
                    <th className="border-r p-2">S. No</th>
                    <th className="border-r p-2">Specification</th>
                    <th className="p-2">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr className="border-b text-xl">
                    <th className="border-r p-2">1</th>
                    <td className="border-r p-2">RAM</td>
                    <td className="p-2">8 GB</td>
                  </tr>
                  {/* row 2 */}
                  <tr className="border-b text-xl">
                    <th className="border-r p-2">2</th>
                    <td className="border-r p-2">ROM</td>
                    <td className="p-2">512 GB</td>
                  </tr>
                  {/* row 3 */}
                  <tr className="border-b text-xl">
                    <th className="border-r p-2">3</th>
                    <td className="border-r p-2">Generation</td>
                    <td className="p-2">10th</td>
                  </tr>
                 {/* row 4 */}
                  <tr className="border-b text-xl">
                    <th className="border-r p-2">4</th>
                    <td className="border-r p-2">Battery Backup</td>
                    <td className="p-2">Min 4h</td>
                  </tr>

                  {/* row 4 */}
                  <tr className="border-b text-xl">
                    <th className="border-r p-2">5</th>
                    <td className="border-r p-2">Graphics Card(Op)</td>
                    <td className="p-2">2GB</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* third cart */}
      <div className="hero bg-base-200 min-h-80">
        <div className="hero-content flex-col shadow-2xl gap-5 lg:flex-row space-x-20">
          <div>
            <h1 className="text-5xl font-bold">Overcome Money Problem</h1>
            <p className="py-6 text-xl">
              To be recognized globally as the leading platform for CSE
              students, setting a benchmark for innovation and practicality in
              academic and career preparation. Our vision is to create a
              community-driven ecosystem where students, professionals, and
              educators collaborate to inspire growth, share knowledge, and
              drive technological excellence.
            </p>
          </div>

          <img src={device_three} className="max-w-md w-full rounded-lg" />
        </div>
      </div>

      <h2 className="font-bold text-center">
        Back to{" "}
        <Link className="text-blue-500" to={"/"}>
          Home
        </Link>
      </h2>
    </div>
  );
};

export default AllDevice;
