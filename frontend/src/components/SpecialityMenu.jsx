import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800'>
        <h1 className='text-3xl font-medium'>Find by Speciality </h1>
        <p className='sm:w-1/3 text-center text-sm '>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p> 
        <div className='flex sm:justify-center gap-4 md:gap-5 pt-5 w-full overflow-scroll '>
            {specialityData.map((eachItem,index)=>(
                    <Link className='flex flex-col sm:px-2.5 items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-15px]  transition-all duration-400' onClick={()=>scrollTo(0,0)}  key={index} to={`/doctors/${eachItem.speciality}`}   > 
                        <img className='w-16 sm:w-24 mb-2' src={ eachItem.image} alt="" />
                        <p>{eachItem.speciality}</p>
                    </Link>
            ))
            }
        </div>
    </div>
  )
}

export default SpecialityMenu