import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {AppContext} from '../context/AppContext'
import { useEffect } from 'react'

const Doctors = () => {
  const { speciality } = useParams()
  const {doctors}= useContext(AppContext)
  const [filterDoc,setFilterDoc]=useState([])
  const navigate = useNavigate()
  const [showFilter , setShowFilter]= useState(false)
  const applyFilter = ()=>{
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])

  return (
    <div className='pb-32'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5' >
        <button className={`py-cd1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-[#5f6FFF] text-white':''}`} onClick={()=> setShowFilter(prev => !prev)}>Filters</button>
        <div className={`${showFilter? 'flex': 'hidden sm:flex'}  flex-col gap-4 text-sm text-gray-600`}>
          <p onClick={()=>speciality==='General physician'? navigate("/doctors"): navigate("/doctors/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""} `}>General physician</p>
          <p onClick={()=>speciality==='Gynecologist'? navigate("/doctors"): navigate("/doctors/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""} `}>Gynecologist</p>
          <p onClick={()=>speciality==='Dermatologist'? navigate("/doctors"): navigate("/doctors/Dermatologist ")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""} `}>Dermatologist</p>
          <p onClick={()=>speciality==='Pediatricians'? navigate("/doctors"): navigate("/doctors/Pediatricians")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""} `}>Pediatricians</p>
          <p onClick={()=>speciality==='Gastroenterologist'? navigate("/doctors"): navigate("/doctors/Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""} `}>Gastroenterologist</p>
        </div>
      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-4 gap-y-6'>
        {
          filterDoc.map((docType,index)=>( 
            <div onClick={()=>(navigate(`/appointment/${docType._id}`))} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 group ' key={index}  >
                <img className='bg-blue-50 group-hover:bg-[#5f6FFF] transition-all duration-900' src={docType.image} alt="" />
                <div className='p-4 ' >
                    <div className='flex items-center gap-2 text-sm text-center text-green-500 '>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p> <p>Available</p>
                    </div>
                <p className='font-medium'>{docType.name}</p>
                <p>{docType.speciality}</p>
                </div>
            </div>
        ))
        }
      </div>


      </div>
    </div>
  )
}

export default Doctors