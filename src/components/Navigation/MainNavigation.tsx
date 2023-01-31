import SearchBar from './SearchBar';
import Logo from './../../assets/img/Logo.jpeg';
import Image from 'next/image';

const MainNavigation = () => {
  return (
    <div className='h-[88px] bg-white flex gap-10 flex-row w-full justify-between px-5 align-middle items-center'>
      <div className='flex'>
        <Image src={Logo} height={66} width={66} alt='Logo' />
      </div>
      <div className='flex flex-row gap-10'>
        <div className='flex'>Local Games</div>
        <div className='flex'>Website Games</div>
        <div className='flex'>Mobile Games</div>
        <div className='flex'>Perfect Time Space</div>
        <div className='flex'>Mobile Games Server</div>
      </div>
      <div className='flex'>
        <SearchBar />
      </div>
    </div>
  );
};

export default MainNavigation;
