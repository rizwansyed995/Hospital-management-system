import React, { useContext, useEffect } from 'react'
import { AdminContext, } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors, atoken, getAllDoctors,changeAvailability}= useContext(AdminContext)

  useEffect(()=>{
    if(atoken){
      getAllDoctors()
    }
  },[atoken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>
      <div className='flex flex-wrap gap-4 pt-5 gap-y-6 '>
        {
          doctors.map((eachItem,index)=>(
            <div className='border border-indigo-200 rounded-lg max-w-40 xl:max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500' src={eachItem.image} alt="" />
              <div className='p-4'>
                <p className='text-neutral-800 text-md xl:text-lg font-medium '>{eachItem.name}</p>
                <p className='text-zinc-600 text-sm '>{eachItem.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailability(eachItem._id)} type="checkbox" checked={eachItem.available}/> 
                  <p >Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList