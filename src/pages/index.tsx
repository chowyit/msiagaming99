import { ReactElement } from 'react';
import Layout from '../module/Layout';
import { NextPageWithLayout } from '../shared/types';

const Home: NextPageWithLayout = () => {
  return (
    <div className='bg-slate-900 flex justify-center w-full h-full'>
      <div className='flex justify-center w-full'>
        <p className='text-cyan-50 text-xl'>GAMING 99</p>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
