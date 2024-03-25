import React, { useState } from 'react';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  
  useEffect( () => {
    const token = window.localStorage.getItem('token');
    // console.log(token)

    if (token) {
      navigate('/')
    }
  }, [])

  const schema = Yup.object().shape({
    name: Yup.string().notOneOf(['inc'], 'Name cannot contain "inc"').required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]+$/,
        'Password must contain at least one number, one special character, and one letter'
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Submitted');
    try {
      await schema.validate({ name, email, password, confirmPassword }, { abortEarly: false });
      console.log('Form :', {name, email, password });
      const res = await axios.post('http://localhost:6300/api/auth/register', {
                    name,
                    email,
                    password
                  });
        console.log(res)
      navigate('/login');
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      if (error) {
        Object.values(error.inner).forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        toast.error('An error occurred');
      }

      setErrors(validationErrors);
    }
  };

  // Function to clear errors on input change
  const clearErrors = () => {
    setErrors({});
  };

  return (
    <div className='w-full h-[100vh] items-center justify-center flex'>
      <p>Sign Up</p>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold'>Sign Up</h1>
        {errors.name && <div className='text-xs text-red-500'>{errors.name}</div>}
        <div>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Name'
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
            onChange={(e) => {
              setName(e.target.value);
              clearErrors(); // Clear errors on input change
            }}
          />
        </div>
        {errors.email && <div className='text-xs text-red-500'>{errors.email}</div>}
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Email'
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
            onChange={(e) => {
              setEmail(e.target.value);
              clearErrors(); // Clear errors on input change
            }}
          />
        </div>
        {errors.password && <div className='text-xs text-red-500'>{errors.password}</div>}
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
            className='w-full px-6 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
            onChange={(e) => {
              setPassword(e.target.value);
              clearErrors(); // Clear errors on input change
            }}
          />
        </div>
        {errors.confirmPassword && <div className='text-xs text-red-500'>{errors.confirmPassword}</div>}
        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm Password'
            className='w-full px-6 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearErrors(); // Clear errors on input change
            }}
          />
        </div>
        <button type='submit' className='bg-yellow-500 hover:bg-yellow-500/90 text-black px-6 py-3 text-sm rounded-md'>
          Submit
        </button>
      </form>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default SignUp;
