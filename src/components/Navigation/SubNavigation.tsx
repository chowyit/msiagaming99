import CartButton from '../CartButton';

const SubNavigation = () => {
  return (
    <div className='flex flex-row px-5 bg-subNavbarBg justify-between h-[40px] items-center'>
      <div className='gap-5 flex flex-row'>{/* To do in future */}</div>
      <div className='gap-5 flex flex-row h-full items-center'>
        <div className='text-white'>Login</div>
        <div className='text-white'>Sign Up</div>
        <div className='text-grey69 h-full'>
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default SubNavigation;
