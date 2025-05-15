import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  const { atoken } = useContext(AdminContext)

  return (
    <aside className="min-h-screen w-64 bg-white border-r border-gray-300 shadow-sm">
      {atoken && (
        <ul className="mt-6 flex flex-col text-gray-700">
          {[
            { to: '/', label: 'Dashboard', icon: assets.home_icon },
            { to: '/all-appointments', label: 'Appointments', icon: assets.appointment_icon },
            { to: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
            { to: '/doctor-list', label: 'Doctor List', icon: assets.people_icon },
          ].map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-6 py-3 rounded-r-lg transition-colors cursor-pointer
                   ${
                     isActive
                       ? 'bg-[#E6EBFF] border-r-4 border-[#5f6FFF] text-[#5f6FFF] font-semibold'
                       : 'hover:bg-gray-100 text-gray-700'
                   }`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={icon}
                      alt={`${label} icon`}
                      className={`h-6 w-6 transition-all duration-300 ${
                        isActive ? 'filter-none' : 'filter grayscale brightness-75'
                      }`}
                    />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default Sidebar
