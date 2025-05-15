import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="my-20 px-4 md:px-16 text-gray-900">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Top Doctors to Book</h2>
        <p className="text-sm mt-2 text-gray-500">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {relDoc.length > 0 ? (
        <>
          <div className="w-full grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {relDoc.slice(0, 5).map((doc, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(`/appointment/${doc._id}`);
                  scrollTo(0, 0);
                }}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group"
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="bg-[#dad9de] group-hover:bg-[#3A2E72] transition-all duration-500"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-green-600 text-sm mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Available</span>
                  </div>
                  <h3 className="font-semibold text-md">{doc.name}</h3>
                  <p className="text-sm text-gray-600">{doc.speciality}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => {
                navigate('/doctors');
                scrollTo(0, 0);
              }}
              className="bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition"
            >
              View All Doctors
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No related doctors found for this speciality.
        </p>
      )}
    </section>
  );
};

export default RelatedDoctors;
