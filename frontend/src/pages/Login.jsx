import React, { useState } from 'react'

const Login = () => {
  const [state,setState]=useState('Sign Up')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [username, setName]=useState('')
  const onSubmitHandler=async(event)=>{
    event.preventDefault()

  }
  return (
    <form className='min-h-[80vh] flex flex-col items-center   ' action="">
      <div className='flex flex-col gap-3m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-2xl space-y-2'>
      <p className='text-2xl font-semibold '>  {state==='Sign Up' ? "Create Account": "Login" } </p>
   
      <p>Please {state==='Sign Up' ? "Sign Up": "Login"} to book appointment</p>
      {
        state==='Sign Up' && <div className= 'w-full' >
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2' type="text" onChange={(e)=> setName(e.target.username)} value={username} required />
      </div>
      }
      
      <div className='w-full '>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2' type="email" onChange={(e)=> setEmail(e.target.email)} value={email} required />
      </div>
      <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2' type="password" onChange={(e)=> setPassword(e.target.password)} value={password} required/>
      </div>
      <button className='cursor-pointer bg-[#5f6FFF] text-white py-2 w-full rounded-md text-base' type='submit'>{state==='Sign Up' ? "Create Account": "Login" }</button>
    {
      state==='Sign Up'
      ? <p>Already have an account ?<span onClick={()=>setState('Login')} className='text-[#5f6FFF] underline cursor-pointer '>Login here</span> </p> 
      : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-[#5f6FFF] underline cursor-pointer '>click here</span> </p>
    }
      </div>
      </form>
  )
}

export default Login