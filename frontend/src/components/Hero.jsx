import React,{useState} from 'react'


const Hero = () => {
  const [loading,setLoading] = useState(true)


  return (
    <div className='flex items-center justify-center w-full my-6 '>
        {loading ? 
        (<div className=' bg-slate-200 w-[80%] px-12 transition animate-pulse duration-300 py-6 h-[400px]'>

        </div>) : 
        <p></p>}
         
    </div>
   
  )
}

export default Hero