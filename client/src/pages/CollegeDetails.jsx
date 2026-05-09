import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

const CollegeDetails = () => {
  const { id } = useParams();

  const [college, setCollege] =
    useState(null);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const { data } =
          await axios.get(
            `http://localhost:5000/api/colleges/${id}`
          );

        setCollege(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollege();
  }, [id]);

  if (!college) {
    return (
      <div className="text-center mt-20 text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold">
            {college.name}
          </h1>

          <p className="text-gray-600 text-lg mt-3">
            📍 {college.location}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold">
                Fees
              </h2>

              <p className="mt-2 text-2xl">
                ₹{college.fees}
              </p>
            </div>

            <div className="bg-yellow-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold">
                Rating
              </h2>

              <p className="mt-2 text-2xl">
                ⭐ {college.rating}
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-xl">
              <h2 className="text-xl font-bold">
                Placements
              </h2>

              <p className="mt-2 text-2xl">
                {college.placements}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">
              Courses Offered
            </h2>

            <div className="flex flex-wrap gap-4">
              {college.courses.map(
                (course, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-5 py-2 rounded-full"
                  >
                    {course}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-5">
              Student Reviews
            </h2>

            <div className="bg-gray-100 p-5 rounded-xl">
              Great campus life and placements.
            </div>

            <div className="bg-gray-100 p-5 rounded-xl mt-4">
              Faculty and infrastructure are very good.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDetails;