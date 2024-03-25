import React, { useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import toast,{Toaster} from 'react-hot-toast'

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required'),
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, email, message }; // Constructing form data object

    try {
      // Validate form data
      await validationSchema.validate(formData, { abortEarly: false });

      // Send form data to the server
      console.log(formData)
      await axios.post('http://localhost:6300/api/contact', {name, email, message});

      // Clear form data on successful submission
      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
      toast.success('Form submitted successfully!');
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Handle validation errors
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        // Handle other errors
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className='bg-white px-12 py-6 flex flex-col my-12'>
      <h2 className='text-3xl text-center my-12  font-light'>CONTACT US</h2>
      <div className='flex gap-3 justify-evenly items-center'>
        <div className='flex flex-col gap-3 justify-center items-center'>
          <div className='flex flex-col gap-1 items-start justify-start w-80'>
                    <h3 className='text-xl'>DISCOVER US </h3>
                    <p className='text-sm'>Discover our latest news and events through our social media channels </p>  
                </div>
                <div className='flex flex-col gap-1 items-start justify-start w-80'>
                    <h3 className='text-xl'>CALL US </h3>
                    <p className='text-sm'>Our numbers are : 0000000000 and  0000555000</p>  
                </div>
                <div className='flex flex-col gap-1 items-start justify-start w-80'>
                    <h3 className='text-xl'>EMAIL US </h3>
                    <p className='text-sm'> Discover our latest news and events through our social media channels </p>  
                </div>
                <div className='flex flex-col gap-1 items-start justify-start w-80'>
                    <h3 className='text-xl'>VISIT US </h3>
                    <p className='text-sm'>Discover our latest news and events through our social media channels </p>  
                </div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          <textarea
            placeholder='Enter your Message Here'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-6 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
          />
          {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
          <button type="submit" className='bg-black hover:bg-black/90 text-white px-6 py-3 text-sm rounded-md'>Submit</button>
        </form>
      </div>
      <Toaster/>
    </div>
  );
};

export default ContactForm;
