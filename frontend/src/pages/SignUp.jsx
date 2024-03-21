import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import { signupValidation } from '../components/signupValidation';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Signup() {
 const handleSubmit = (values) => {
  axios.post('http://localhost:5300/api/auth/register',values )
  .then(res => {
    console.log(res);
    // Navigate to the login page upon successful registration
    navigation.navigate('/Login');
  })
  .catch(err => console.log(err));
  console.log(values);
 
}




  return (
    <div className='flex items-center justify-center h-screen '>
      <div className='flex flex-row w-[723px] h-[510px] border-[#000000] border-[0.2px] rounded-lg gap-7     shadow-xl items-center justify-center'>
        <Formik
          initialValues={{
            email: '',
            name: '',    
            password: '',
          }}
          validationSchema={signupValidation}
          onSubmit={handleSubmit}
        >
              {({ errors, touched }) => (
          <Form className='flex flex-col p-5 gap-3'>
            <h1 className='text-lg text-[#A088C6] raleway text-[25px] italic text-center font-extrabold'>
              Bukati.
            </h1>
            <div className='flex flex-col pl-3'>
              <label htmlFor='name' className='raleway text-sm'>Full Name</label>
              <Field
                type='text'
                name='name'
               className='border-[0.5px] border-[#D9D9D9] pl-2 h-[35px] w-[290px] rounded-md' 
              />
             {errors.name && touched.name ? (<div className='w-[250px] raleway text-[13px]'>{errors.name}</div>) : null}
            </div>
            
            <div className='flex flex-col pl-3'>
              <label htmlFor='email' className='raleway text-sm'>Email Address</label>
              <Field type='email' name='email' className='border-[0.5px] border-[#D9D9D9] pl-2 h-[35px] w-[290px] rounded-md' />
           {errors.email && touched.email ? (<div className='w-[250px]  raleway text-[13px]'>{errors.email}</div>) : null}
            </div>
             
             <div className='flex flex-col pl-3'>
              <label htmlFor='password' className='raleway text-sm'>Password</label>
              <Field type='password' name='password' className='border-[0.5px] border-[#D9D9D9] pl-2  h-[35px] w-[290px] rounded-md' />
            {errors.password && touched.password ? (<div className='w-[250px] raleway text-[13px]'>{errors.password}</div>) : null}
            </div>
            <button type='submit'  className='bg-[#A088C6] text-white raleway px-10 rounded-lg py-3'>
              Submit
            </button>
            <p className='text-center raleway'>
              Already have an account?{' '}
            <Link to='/Login'>  <span className='text-[#1976d2] raleway'>Sign In</span></Link>
            </p>
          </Form>)}
        </Formik>
        <div className='items-center flex justify-center'>
          <img
            src='waffles.jpg'
            className='w-[350px] h-[510px] rounded-l-lg rounded-r-lg'
            alt='Signup Image'
          />
        </div>
      </div>
    </div>
  );
}
