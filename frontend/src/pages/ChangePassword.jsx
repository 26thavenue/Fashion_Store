import React,{useState, useEffect} from 'react'
import toast,{Toaster} from 'react-hot-toast'
import axios from 'axios'
import * as Yup from 'yup'


const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem('token');

   const config = {
            headers: {
              Authorization: `Bearer ${token}`,
        },
    };

const passwordSchema = Yup.object().shape({
  password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
     .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .required('Password is required')
   
});

  const handleSubmit = async (e) => {
    e.preventDefault();

    


    try {
      console.log(password);
      await passwordSchema.validate(password, { abortEarly: false });
      console.log(password)

      // console.log(formData)
      // await axios.put('http://localhost:6300/api/user',config, {password});

      setPassword('')
      setErrors({});
      toast.success('Form submitted successfully!');
    } catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
      // Handle validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        toast.error('Password must contain at least one number, one special character, and one letter and a minimum of 8 characters');
        setErrors(validationErrors);
    }  else {
        // Handle other errors
        console.error('Error:', error.message);
      }
    }

    console.log(errors)
  };


  return (
   <div className='container mx-auto py-8'>
      <h1 className='text-2xl text-center font-bold my-12'>Change your pssword </h1>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
      <div className='mb-4'>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
          Set New Password
        </label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mt-1 p-2  block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500'
          placeholder='Enter your new password'
          required
        />
      </div>
      <div className='mt-4'>
        <button
          type='submit'
          className='w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Change Your Password
        </button>
      </div>
    </form>
      <Toaster/>
    </div>
  )
}

export default ChangePassword