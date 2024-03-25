import React,{useState} from 'react'


const Hero = () => {
  const [loading,setLoading] = useState(false)


  return (
    <div className='flex items-center justify-center w-full my-6 '>
        {!loading ? 
        (
        <div className=' bg-blue-400 w-[80%] px-12 py-6 h-[400px] flex gap-8 justify-evenly items-center '>
            <img
            className='h-[400px] w-[400px] object-cover' 
            src='./hero.png' alt='Close'/>
            <p className='w-[50%] text-white  text-3xl font-bold  '>Get the latest items and improve your swag with our well curated items</p>
        </div>
        ) : 
        <p>
          </p>}
         
    </div>
   
  )
}

export default Hero