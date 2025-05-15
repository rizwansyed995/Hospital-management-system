import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

import {
  FaUserMd,
  FaCalendarCheck,
  FaClock,
  FaUser,
  FaBed,
  FaHospitalAlt,
  FaMoneyBillWave
} from 'react-icons/fa';

const analytics = [
  {
    title: 'Total Doctors',
    count: '15',
    icon: <FaUserMd className="text-indigo-500" size={30} />,
    button: 'Manage Doctors',
    route: '/doctor-list',
  },
  {
    title: 'Appointments Booked',
    count: '72',
    icon: <FaCalendarCheck className="text-green-500" size={30} />,
    button: 'View Appointments',
    route: '/appointments',
  },
  {
    title: 'Pending Appointments',
    count: '18',
    icon: <FaClock className="text-yellow-500" size={30} />,
    button: 'Pending List',
    route: '/appointments/pending',
  },
  {
    title: 'Total Patients',
    count: '1,240',
    icon: <FaUser className="text-pink-500" size={30} />,
    button: 'Manage Patients',
    route: '/patients',
  },
  {
    title: 'Beds Available',
    count: '36',
    icon: <FaBed className="text-purple-500" size={30} />,
    button: 'View Beds',
    route: '/beds',
  },
  {
    title: 'Departments Active',
    count: '12',
    icon: <FaHospitalAlt className="text-sky-500" size={30} />,
    button: 'View Departments',
    route: '/departments',
  },
  {
    title: 'Revenue This Month',
    count: '$10,500',
    icon: <FaMoneyBillWave className="text-teal-500" size={30} />,
    button: 'View Revenue',
    route: '/revenue',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/50 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {analytics.map((item, index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{item.count}</div>
              <p className="text-xs text-muted-foreground mt-1">as of today</p>
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                className="w-full cursor-pointer hover:bg-[#9a86f0] hover:text-white transition-all duration-300"
                onClick={() => navigate(item.route)}
              >
                {item.button}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
