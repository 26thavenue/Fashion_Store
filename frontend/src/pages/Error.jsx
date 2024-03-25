import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom';



export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='flex flex-col items-center justify-center w-[100vw] h-[100vh] gap-6 '>
      <h1 className='font-bold text-2xl '>Oops!</h1>
      <p className='text-[#b6b6b6] '>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link className='underline' href='/'>
          Go Home
      </Link>
    </div>
  );
}