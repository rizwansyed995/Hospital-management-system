import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Gastroenterologist',
  ];

  return (
    <div className='min-h-screen px-4 sm:px-8 md:px-16 py-10 bg-[#f8f9fc]'>
      <h2 className='text-2xl sm:text-3xl font-semibold text-[#333] mb-2'>Browse Doctors</h2>
      <p className='text-gray-600 text-sm sm:text-base mb-6'>
        Browse through our list of doctors by their speciality and book your appointment.
      </p>

      <div className='flex flex-col md:flex-row gap-8'>
        {/* Filter Section */}
        <div className='w-full md:w-64'>
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className={`md:hidden mb-4 px-4 py-2 rounded border text-sm transition-colors ${
              showFilter ? 'bg-[#5f6FFF] text-white' : 'bg-white text-gray-700'
            }`}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div className={`${showFilter ? 'flex' : 'hidden'} md:flex flex-col gap-3`}>
            {specialities.map((spec) => (
              <p
                key={spec}
                onClick={() =>
                  speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
                }
                className={`pl-4 py-2 pr-4 border rounded-md cursor-pointer transition-all text-sm ${
                  speciality === spec
                    ? 'bg-[#e0e7ff] text-[#1d2a63] border-[#5f6FFF] font-medium'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))]  gap-4 pt-5 gap-y-6 px-3 sm:px-0 '>
          {filterDoc.map((docType, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${docType._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group '
            >
              <img
                className='bg-[#dad9de] group-hover:bg-[#3A2E72] transition-all duration-500'
                src={docType.image}
                alt={docType.name}
              />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  <span>Available</span>
                </div>
                <p className='font-medium text-gray-800'>{docType.name}</p>
                <p className='text-sm text-gray-500'>{docType.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
