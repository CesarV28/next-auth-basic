import LoginForm from '@/components/auth/login-form';
import { FC } from 'react';

interface pageProps {
  
}

const page: FC<pageProps> = ({  }) => {
  return (
    <div className='h-[90vh] flex justify-center items-center'>
      <LoginForm className='w-1/3 mx-auto border border-gray-600 px-6 py-8 rounded'/>
    </div>
  )
}
export default page;