import React,{useState, useEffect} from 'react'
import  * as Yup from 'yup'
import toast,{Toaster } from 'react-hot-toast';
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  useEffect( () => {
    const token = window.localStorage.getItem('token');
    // console.log(token)

  if (token) {
    navigate('/')
  }
  }, [])

   const schema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('Form Submitted')

     try {
      await schema.validate({ email, password }, { abortEarly: false });

      const res = await axios.post('http://localhost:6300/api/auth/login', {
                    email,
                    password
                  });
      
      if (res.data.user) {
         const data = res.data
        const token = data.token
        console.log(token)

        localStorage.setItem('token', `${token}`)

        navigate('/');
        
      }

     
        const errorMessage = `Invalid password`;
        console.log(errorMessage)
        toast.error(errorMessage);
     

      
      console.log('Form :', { email, password });
      setErrors({});
    } catch (error) {
      const validationErrors = {};
      
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
          toast.error(err.message);
        });
    }
      setErrors(validationErrors);

      console.log(errors)
    }
  }


  return (
    <div className='w-full h-[100vh] items-center justify-center flex flex-col'>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Email'
                    className='w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="text-red-500 text-xs">{errors.email}</div>}
                <input
                    type='password'
                    placeholder='Password'
                    className='w-full px-6 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:shadow-outline'
                    onChange={(e) => setPassword(e.target.value)}
                />
                 {errors.password && <div className="text-red-500"><p> {errors.password} </p></div>}
                <button type='submit' className='bg-yellow-500 hover:bg-yellow-500/90 text-black px-6 py-3 text-sm rounded-md'>Submit</button>
                
            </form>
            <div className='block text-sm mt-4'>
              <p>Don't have an account yet<Link href='/register' className='underline text-xs text-blue-500'> SignUp</Link></p>
            </div>
            <div><Toaster/></div>
    </div>
  )
}

export default Login