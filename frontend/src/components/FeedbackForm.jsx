import React,{useState} from 'react'
import axios from 'axios';
import * as Yup from 'yup';
import toast,{Toaster} from 'react-hot-toast'


const FeedbackForm = () => {
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
      await axios.post('http://localhost:6300/api/feedback', {name, email, message});

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
    <div className='bg-black flex justify-evenly px-12 py-6 items-center '>
        <div className='text-white flex flex-col gap-6'>
            <h2 className='text-3xl font-bold'>Give Us A Feedback !!!</h2>
            <p  className='font-light text-sm text-white/70'>Kindly fill the Form we will get in touch, Thank you !! </p>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                    <input
                    type='text'
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    className= 'w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
                />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                <input
                    type='text'
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
                />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                <textarea
                    type='text'
                    placeholder='Enter your Message Here'
                    onChange={(e) => setMessage(e.target.value)}
                     className="w-full px-6 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline"
                />
                 {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                <button type="submit" className='bg-yellow-500 hover:bg-yellow-500/90 text-black px-6 py-3 text-sm rounded-md'>Submit</button>
            </form>
            <Toaster/>
    </div>
  )
}

export default FeedbackForm