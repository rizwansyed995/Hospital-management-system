import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';



const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const { backendUrl, atoken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }
      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

    
      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { atoken } })
      if (data.success) {
        toast.success(data.message, {
            onClose: () => window.location.reload() // Reload after the toast is closed
        });
    }else{
        console.log(data.message)
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  return (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-[#5f6FFF] text-center">Add Doctor</h1>

    <form onSubmit={onSubmitHandler} className="space-y-10 flex flex-col items-center justify-center border p-6 rounded bg-white">

      {/* 🖼️ Image Upload */}
      <div className="w-full flex flex-col items-center justify-center gap-3 border-b pb-6">
        <label htmlFor="doc-img" className="cursor-pointer">
          <img
            src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
            alt="Upload doctor"
            className="w-28 h-28 rounded-full border object-cover"
          />
        </label>
        <input
          id="doc-img"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => setDocImg(e.target.files[0])}
        />
        <p className="text-gray-500 text-sm">Click the image to upload doctor's photo</p>
      </div>

      {/* 👤 Personal Info */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6">
        <div>
          <Label>Name</Label>
          <Input className="mt-3" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input className="mt-3" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input className="mt-3" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
      </div>

      {/* 🏥 Professional Info */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6">
        <div>
          <Label className="mb-3">Experience</Label>
          <Select value={experience} onValueChange={setExperience}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={i} value={`${i + 1} Year`}>
                  {i + 1} Year{ i === 9 && '+'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Fees</Label>
          <Input className="mt-3" type="number" value={fees} onChange={(e) => setFees(e.target.value)} required />
        </div>
        <div>
          <Label className="mb-3">Speciality</Label>
          <Select value={speciality} onValueChange={setSpeciality}>
            <SelectTrigger>
              <SelectValue placeholder="Select speciality" />
            </SelectTrigger>
            <SelectContent>
              {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 🎓 Degree & Address */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 border-b pb-6">
        <div>
          <Label>Degree</Label>
          <Input className="mt-3" value={degree} onChange={(e) => setDegree(e.target.value)} required />
        </div>
        <div>
          <Label>Address Line 1</Label>
          <Input className="mt-3" value={address1} onChange={(e) => setAddress1(e.target.value)} required />
        </div>
        <div>
          <Label>Address Line 2</Label>
          <Input className="mt-3" value={address2} onChange={(e) => setAddress2(e.target.value)} required />
        </div>
      </div>

      {/* ✍️ About Doctor */}
      <div className='w-full'>
        <Label>About Doctor</Label>
        <Textarea className="mt-3"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Write about the doctor..."
          rows={10}
          required
        />
      </div>

      {/* 🚀 Submit Button */}
      <Button type="submit" className="bg-[#5f6FFF] p-8 hover:bg-[#4a53e6] w-fit text-white  py-6 text-md cursor-pointer rounded-full">
        Add Doctor
      </Button>
    </form>
  </div>
);
}

export default AddDoctor