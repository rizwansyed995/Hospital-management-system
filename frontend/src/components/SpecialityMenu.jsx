import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="flex flex-col items-center gap-6 py-16 bg-[#2f2753] text-white"
    >
      <h1 className="text-3xl font-semibold">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-300">
        Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 md:gap-8 pt-6 w-full overflow-x-auto px-4 sm:px-8">
        {specialityData.map((eachItem, index) => (
          <Link
            to={`/doctors/${eachItem.speciality}`}
            key={index}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center flex-shrink-0 cursor-pointer px-3 sm:px-4 py-2 rounded-lg
                       bg-[#3A2E72] hover:bg-[#5f6FFF] transition-all duration-300 hover:-translate-y-3
                       shadow-lg"
          >
            <img
              className="w-16 sm:w-24 mb-2 rounded-md"
              src={eachItem.image}
              alt={eachItem.speciality}
              loading="lazy"
            />
            <p className="text-xs sm:text-sm font-medium">{eachItem.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default SpecialityMenu
