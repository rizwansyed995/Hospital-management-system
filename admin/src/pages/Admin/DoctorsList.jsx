import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeAvailability } = useContext(AdminContext)
  const [selectedSpeciality, setSelectedSpeciality] = useState('')

  useEffect(() => {
    if (atoken) {
      getAllDoctors()
    }
  }, [atoken])

  const specialities = [
    'All',
    'General Physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  const filteredDoctors = selectedSpeciality && selectedSpeciality !== 'All'
    ? doctors.filter(doc => doc.speciality === selectedSpeciality)
    : doctors

  return (
    <div className="m-6 max-h-[90vh] overflow-y-auto md:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#5f6FFF]">All Doctors</h1>

        {/* Speciality Filter */}
        <div className="w-64">
          <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by speciality" />
            </SelectTrigger>
            <SelectContent>
              {specialities.map(spec => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden rounded-t-lg relative group">
              <div className="absolute inset-0 bg-indigo-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
              <img
                src={doctor.image}
                alt={doctor.name}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 relative z-10"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-lg font-semibold text-neutral-900">{doctor.name}</p>
              <p className="text-sm text-indigo-600 mb-4">{doctor.speciality}</p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={doctor.available}
                    onCheckedChange={() => changeAvailability(doctor._id)}
                  />
                  <span className="text-sm text-gray-700 select-none">Available</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredDoctors.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No doctors found for selected speciality.
          </p>
        )}
      </div>
    </div>
  )
}

export default DoctorsList
