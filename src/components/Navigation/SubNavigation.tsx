import CartButton from "../CartButton";

const SubNavigation = () => {
  return (
    <div className="flex flex-row px-5 bg-subNavbarBg justify-between h-[40px] items-center">
      <div className="gap-5 flex flex-row">
        {/* To be query fropm cms in future */}
        <div className="text-grey69">1</div>
        <div className="text-grey69">2</div>
        <div className="text-grey69">3</div>
        <div className="text-grey69">4</div>
      </div>
      <div className="gap-5 flex flex-row h-full items-center">
        <div className="text-white">Login</div>
        <div className="text-white">Sign Up</div>
        <div className="text-grey69 h-full">
          <CartButton />
        </div>
      </div>
    </div>
  );
};

export default SubNavigation;
